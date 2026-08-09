export default function Footer() {
  return (
    <footer style={{
      marginTop: "auto",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "1.25rem 2rem",
      background: "#0d0d0d",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        fontSize: "0.8rem"
      }}>
        <span style={{ color: "#6b7280" }}>FreePlay</span>
        <span style={{ color: "#374151" }}>·</span>
        <span style={{ color: "#6b7280" }}>Sergio López Gil</span>
        <span style={{ color: "#374151" }}>·</span>
        <span style={{ color: "#6b7280" }}>2026</span>
      </div>
    </footer>
  );
}
