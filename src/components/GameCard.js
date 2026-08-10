"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PLATFORM_COLORS = {
  Epic:           { bg: "#2563eb", color: "#fff" },
  Steam:          { bg: "#1b2838", color: "#c7d5e0" },
  GOG:            { bg: "#8b5cf6", color: "#fff" },
  PlayStation:    { bg: "#003791", color: "#fff" },
  Xbox:           { bg: "#107c10", color: "#fff" },
  "Prime Gaming": { bg: "#00a8e0", color: "#fff" },
  "itch.io":      { bg: "#fa5c5c", color: "#fff" },
  IndieGala:      { bg: "#e11d48", color: "#fff" },
  Móvil:          { bg: "#3ddc84", color: "#000" },
  Otros:          { bg: "#374151", color: "#fff" },
};

function calcCountdown(endDateStr) {
  if (!endDateStr) return null;
  const end = new Date(endDateStr);
  const diff = end - Date.now();
  if (diff <= 0) return "Expirado";
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);
  return `${days}d ${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function GameCard({
  title = "Juego",
  platform = "Epic",
  originalPrice = "$0.00",
  image = "",
  upcoming = false,
  timeLabel = "Termina en:",
  endDate = null,
  actionLabel = "Obtener",
  actionHref = "#",
}) {
  const plt = PLATFORM_COLORS[platform] || { bg: "#374151", color: "#fff" };

  const [countdown, setCountdown] = useState(() => calcCountdown(endDate));

  useEffect(() => {
    if (!endDate) return;
    const id = setInterval(() => setCountdown(calcCountdown(endDate)), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const showTimer = countdown && countdown !== "Expirado";

  return (
    <article
      style={{
        background: "#1a1a1a",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}>

      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#111", overflow: "hidden" }}>
        {image
          ? <Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" style={{ objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1f2937 0%,#111827 100%)" }} />
        }

        <span style={{
          position: "absolute", top: 10, left: 10,
          padding: "3px 10px", borderRadius: 9999,
          fontSize: "0.7rem", fontWeight: 700,
          background: plt.bg, color: plt.color,
        }}>
          {platform}
        </span>

        {upcoming && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            padding: "3px 9px", borderRadius: 9999,
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em",
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#d1d5db",
          }}>
            PRÓXIMAMENTE
          </span>
        )}

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "8px 12px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}>
          <span style={{ fontSize: "0.75rem" }}>
            <span style={{color: "#9ca3af", textDecoration: "line-through" }}>{originalPrice}</span> 0.00€
          </span>
        </div>
      </div>

      <div style={{ padding: "0.875rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>

        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f3f4f6", margin: 0, lineHeight: 1.35 }}>
          {title}
        </h3>


        <div className="flex flex-row items-center justify-between" style={{ marginTop: "auto", paddingTop: "0.6rem", gap: "0.5rem" }}>
          {showTimer ? (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.7rem", color: "#9ca3af" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ color: "#6b7280" }}>{timeLabel}</span>
              <span style={{ color: "#f3f4f6", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{countdown}</span>
            </div>
          ) : (
            <span />
          )}

          <a
            href={actionHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: "0.78rem", fontWeight: 700, color: "#fff",
              background: "#f97316", textDecoration: "none",
              padding: "0.35rem 0.9rem", borderRadius: 9999,
              transition: "background 0.18s",
              flexShrink: 0,
              alignSelf: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#ea6a0a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#f97316"; }}
          >
            {actionLabel}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
