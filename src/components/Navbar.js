"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const navStyle = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "#f97316",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  width: "100%",
};

const innerStyle = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 1rem",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
};

const logoCircle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "#1c1c1c",
};

const inputStyle = {
  width: "100%",
  height: 36,
  padding: "0 1rem 0 2.5rem",
  background: "#1c1c1c",
  border: "none",
  borderRadius: 9999,
  color: "#e5e7eb",
  fontSize: "0.875rem",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const iconStyle = {
  position: "absolute",
  left: "0.875rem",
  top: "50%",
  transform: "translateY(-50%)",
  width: 16,
  height: 16,
  color: "#6b7280",
  pointerEvents: "none",
};

function SearchIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function Navbar({ search = "", onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  function handleToggleSearch() {
    if (searchOpen && onSearch) onSearch("");
    setSearchOpen((v) => !v);
  }

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>

        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
          <span style={logoCircle}>
            <Image src="/logo-white.svg" alt="Logo" width={30} height={30} style={{ display: "block" }} />
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.3px" }}>
            <span style={{ color: "#1c1c1c" }}>Free</span>Play
          </span>
        </Link>

        <div className="hidden sm:block" style={{ position: "relative", flex: 1, maxWidth: 340 }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            style={inputStyle}
          />
        </div>

        {searchOpen && (
          <div className="flex sm:hidden" style={{ position: "relative", flex: 1 }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar juegos..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              style={{ ...inputStyle, padding: "0 1rem" }}
            />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <button
            className="flex sm:hidden"
            onClick={handleToggleSearch}
            aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            style={{
              background: "#1c1c1c",
              border: "none",
              borderRadius: 9999,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#9ca3af",
              flexShrink: 0,
            }}
          >
            {searchOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </button>

          <a
            href="/sobre-el-proyecto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 36,
              padding: "0 0.875rem",
              borderRadius: 9999,
              backgroundColor: "#1c1c1c",
              color: "#ffffff",
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span className="hidden sm:inline" style={{ fontSize: "0.875rem" }}>Sobre el proyecto</span>
            <span className="sm:hidden" style={{ fontSize: "0.75rem" }}>Info</span>
          </a>
        </div>

      </div>
    </nav>
  );
}
