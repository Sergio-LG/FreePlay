"use client";

import Image from "next/image";

export default function Navbar({ search = "", onSearch }) {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#f97316",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      width: "100%",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 2rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
      }}>

        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
          <span style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#1c1c1c",
            fontSize: "0.75rem"
          }}>
            <Image src="/logo-white.svg" alt="Logo" width={30} height={30} style={{ display: "block" }} />
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.3px" }}>
            <span style={{ color: "#1c1c1c" }}>Free</span>Play
          </span>
        </a>

        <div style={{ position: "relative", flex: 1, maxWidth: 340 }}>
          <svg style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#6b7280", pointerEvents: "none" }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.5rem",
              background: "#1c1c1c",
              border: "none",
              borderRadius: 9999,
              color: "#e5e7eb",
              fontSize: "0.875rem",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        <a href="/sobre-el-proyecto" style={{
          padding: "0.5rem 1.25rem",
          borderRadius: 9999,
          backgroundColor: "#1c1c1c",
          color: "#ffffff",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}>
          Sobre el proyecto
        </a>
      </div>
    </nav>
  );
}
