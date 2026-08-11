import { NextResponse } from "next/server";

const GAMERPOWER_BASE = "https://www.gamerpower.com/api";
const EPIC_URL = "https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=es-ES&country=ES&allowCountries=ES";
const EUR_RATE_URL = "https://open.er-api.com/v6/latest/USD";
const EUR_FALLBACK = 0.92;

const PLATFORM_MAP = [
  ["epic games", "Epic Games"],
  ["steam", "Steam"],
  ["gog", "GOG"],
  ["playstation", "PlayStation"],
  ["ps4", "PlayStation"],
  ["ps5", "PlayStation"],
  ["xbox", "Xbox"],
  ["prime", "Prime Gaming"],
  ["itch.io", "itch.io"],
  ["itchio", "itch.io"],
  ["indiegala", "IndieGala"],
  ["android", "Móvil"],
  ["ios", "Móvil"],
];

async function getEurRate() {
  try {
    const res = await fetch(EUR_RATE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return EUR_FALLBACK;
    const data = await res.json();
    return data.rates?.EUR ?? EUR_FALLBACK;
  } catch {
    return EUR_FALLBACK;
  }
}

function normalizePlatform(str) {
  if (!str) return "Otros";
  const lower = str.toLowerCase();
  for (const [key, value] of PLATFORM_MAP) {
    if (lower.includes(key)) return value;
  }
  return "Otros";
}

function cleanTitle(title) {
  if (!title) return title;
  return title
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*\bGiveaway\b/gi, "")
    .trim();
}

function normalizeGame(g, eurRate, upcoming = false) {
  const worthStr = g.worth && g.worth !== "N/A" ? g.worth : null;
  const worthUsd = worthStr ? parseFloat(worthStr.replace(/[^0-9.]/g, "")) : NaN;
  const worthEur = isFinite(worthUsd) && worthUsd > 0 ? worthUsd * eurRate : NaN;
  const originalPrice = isFinite(worthEur) && worthEur > 0 ? `${worthEur.toFixed(2)}€` : "0.00€";
  const apiPlatform = normalizePlatform(g.platforms);
  const platform = apiPlatform === "Otros" ? normalizePlatform(g.title || "") : apiPlatform;
  return {
    id: g.id,
    title: cleanTitle(g.title),
    platform,
    originalPrice,
    image: g.image || g.thumbnail || "",
    upcoming,
    timeLabel: upcoming ? "Inicia en:" : "Termina en:",
    endDate: g.end_date && g.end_date !== "N/A" ? g.end_date : null,
    actionLabel: upcoming ? "Tienda" : "Obtener",
    actionHref: g.open_giveaway_url || g.open_giveaway || "#",
  };
}

function getEpicImage(keyImages) {
  const priority = ["OfferImageWide", "DieselStoreFrontWide", "featuredMedia", "Thumbnail"];
  for (const type of priority) {
    const found = keyImages?.find((img) => img.type === type);
    if (found) return found.url;
  }
  return keyImages?.[0]?.url || "";
}

function normalizeEpicGame(el, upcoming = false) {
  const promoArray = upcoming
    ? el.promotions?.upcomingPromotionalOffers
    : el.promotions?.promotionalOffers;

  const offer = promoArray?.[0]?.promotionalOffers?.[0];
  const startDate = offer?.startDate || null;
  const endDate = offer?.endDate || null;

  const originalPriceCents = el.price?.totalPrice?.originalPrice;
  const originalPrice = originalPriceCents
    ? `${(originalPriceCents / 100).toFixed(2)}€`
    : "0.00€";

  const pageSlug =
    el.catalogNs?.mappings?.[0]?.pageSlug ||
    el.offerMappings?.[0]?.pageSlug ||
    el.urlSlug ||
    el.productSlug;

  return {
    id: el.id,
    title: el.title,
    platform: "Epic",
    originalPrice,
    image: getEpicImage(el.keyImages),
    upcoming,
    timeLabel: upcoming ? "Inicia en:" : "Termina en:",
    endDate: upcoming ? startDate : endDate,
    actionLabel: upcoming ? "Tienda" : "Obtener",
    actionHref: pageSlug
      ? `https://store.epicgames.com/en-US/p/${pageSlug}`
      : "https://store.epicgames.com/en-US/free-games",
  };
}

export async function GET() {
  try {
    const [activeRes, epicRes, eurRate] = await Promise.all([
      fetch(`${GAMERPOWER_BASE}/giveaways?type=game`, {
        next: { revalidate: 300 },
        headers: { "User-Agent": "FreePlay/1.0" },
      }),
      fetch(EPIC_URL, {
        next: { revalidate: 300 },
        headers: { "User-Agent": "FreePlay/1.0" },
      }),
      getEurRate(),
    ]);

    const activeData = activeRes.ok ? await activeRes.json() : [];
    const epicData = epicRes.ok ? await epicRes.json() : null;

    const active = Array.isArray(activeData)
      ? activeData.slice(0, 12).map((g) => normalizeGame(g, eurRate, false))
      : [];

    const epicElements = epicData?.data?.Catalog?.searchStore?.elements || [];

    const upcoming = epicElements
      .filter((el) => {
        const offers = el.promotions?.upcomingPromotionalOffers;
        if (!offers?.length) return false;
        const offer = offers[0]?.promotionalOffers?.[0];
        if (!offer) return false;
        if (offer.discountSetting?.discountPercentage !== 0) return false;
        const start = offer.startDate ? new Date(offer.startDate) : null;
        return start && start > new Date();
      })
      .map((el) => normalizeEpicGame(el, true));

    return NextResponse.json({ active, upcoming });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
