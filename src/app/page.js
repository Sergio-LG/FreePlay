"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";

const PLATFORMS = ["Todos", "Epic", "Steam", "GOG", "itch.io", "IndieGala", "Móvil", "Otros"];

function LoadingSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-[220px] rounded-xl overflow-hidden bg-[#1a1a1a]"
          style={{ animation: "pulse 1.6s ease-in-out infinite" }}
        >
          <div className="bg-[#252525]" style={{ aspectRatio: "3/4" }} />
          <div className="p-3 flex flex-col gap-2">
            <div className="h-[14px] rounded-md bg-[#252525] w-[80%]" />
            <div className="h-[11px] rounded-md bg-[#252525] w-[55%]" />
            <div className="h-[11px] rounded-md bg-[#252525] w-[70%]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorBanner({ onRetry }) {
  return (
    <div className="p-8 text-center bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
      <p className="text-[#ef4444] font-semibold mb-3">No se pudieron cargar los juegos.</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 rounded-full bg-[#f97316] text-white font-bold border-none cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Gratis Ahora");
  const [activePlatform, setActivePlatform] = useState("Todos");
  const [search, setSearch] = useState("");
  const [freeNow, setFreeNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/juegos");
      if (!res.ok) throw new Error("Response error");
      const data = await res.json();
      setFreeNow(data.active || []);
      setUpcoming(data.upcoming || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function load() {
      await fetchGames();
    }
    load();
  }, [fetchGames]);

  function applyFilters(list) {
    return list
      .filter((g) => activePlatform === "Todos" || g.platform === activePlatform)
      .filter((g) => !search.trim() || g.title.toLowerCase().includes(search.trim().toLowerCase()));
  }

  const filteredFreeNow = applyFilters(freeNow);
  const filteredUpcoming = applyFilters(upcoming);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f3f4f6]">
      <Navbar search={search} onSearch={setSearch} />

      <section
        className="w-full px-4 py-10 md:px-8 md:py-16 relative"
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.72)]" />
        <div className="relative z-10 flex flex-col gap-3 max-w-[1280px] mx-auto">
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-black text-white m-0 text-center">
            JUEGOS <span className="text-[#f97316]">GRATIS</span> DEL MOMENTO
          </h1>
          <p className="text-lg text-white mx-auto max-w-[480px] text-center m-0">
            Consigue juegos gratis en tus plataformas favoritas.<br />Actualizado en tiempo real.
          </p>

          <div className="flex gap-[0.625rem] mt-3 justify-center">
            {["Gratis Ahora", "Próximos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors border-[1.5px] ${
                  activeTab === tab
                    ? "bg-[#f97316] text-white border-[#f97316]"
                    : "bg-[#0d0d0d] text-[#9ca3af] border-transparent"
                }`}
              >
                {tab === "Próximos" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap mt-5 justify-center">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className={`px-4 py-2 rounded-[10px] text-[0.8rem] font-semibold cursor-pointer bg-[#0d0d0d] border-[1.5px] transition-colors ${
                  activePlatform === p
                    ? "border-[rgba(249,115,22,0.45)] text-[#f97316]"
                    : "border-transparent text-[#9ca3af]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 pb-16 md:px-8">

        {activeTab === "Gratis Ahora" && (
          <section className="mt-8">
            <div className="flex items-end justify-between mb-4 gap-4">
              <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-black tracking-[-0.02em] text-white m-0 mb-1">
                {loading ? "Cargando" : filteredFreeNow.length} JUEGOS&nbsp;<span className="text-[#f97316]">GRATIS</span> AHORA
              </h2>
              {!loading && !error && (
                <button
                  onClick={fetchGames}
                  title="Actualizar"
                  className="bg-transparent border-none cursor-pointer text-[#6b7280] p-1 flex items-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                </button>
              )}
            </div>

            {loading && <LoadingSkeleton />}
            {!loading && error && <ErrorBanner onRetry={fetchGames} />}
            {!loading && !error && filteredFreeNow.length === 0 && (
              <p className="text-[#6b7280] text-center py-8">No hay juegos gratis para esta plataforma ahora mismo.</p>
            )}
            {!loading && !error && filteredFreeNow.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredFreeNow.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "Próximos" && (
          <section className="mt-8">
            <div className="flex items-end justify-between mb-4 gap-4">
              <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-black tracking-[-0.02em] text-white m-0 mb-1">
                PRÓXIMAMENTE <span className="text-[#f97316]">GRATIS</span>
              </h2>
            </div>

            {loading && <LoadingSkeleton />}
            {!loading && error && <ErrorBanner onRetry={fetchGames} />}
            {!loading && !error && filteredUpcoming.length === 0 && (
              <p className="text-[#6b7280] text-center py-8">No hay juegos próximos para esta plataforma.</p>
            )}
            {!loading && !error && filteredUpcoming.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredUpcoming.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
