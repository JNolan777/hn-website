export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #e8f0e0 0%, #f3ede3 45%, #fdf6ee 100%)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "7rem 6vw 4rem",
        gap: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 80% 20%, rgba(74,103,65,0.07) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(181,136,74,0.05) 0%, transparent 50%)" }} />

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 20, display: "block" }}>
          A Product of Synergy&trade;
        </span>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(5rem,11vw,10rem)", fontWeight: 300, lineHeight: 0.85, color: "var(--c-green)" }}>
          H<span style={{ color: "var(--c-gold)" }}>&</span>N
        </div>
        <div style={{ width: 60, height: 1, background: "var(--c-gold)", margin: "1.8rem 0" }} />
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--c-muted)", display: "block", marginBottom: 8 }}>
          Hair & Skin
        </span>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1rem,2vw,1.35rem)", color: "var(--c-green-light)", marginBottom: 32 }}>
          Purely Gentle, Naturally Effective.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["100% Natural", "Cruelty Free", "Botanically Crafted"].map((pill) => (
            <span
              key={pill}
              style={{
                background: "white",
                border: "1px solid var(--c-border)",
                padding: "8px 18px",
                borderRadius: 99,
                fontSize: "0.78rem",
                color: "var(--c-muted)",
                letterSpacing: "0.06em",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Product images */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 32, height: 480 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transform: "translateY(30px)" }}>
          <img src="/images/hibiscus_shampoo.jpg" alt="Hibiscus Shampoo" style={{ width: 180, height: 300, objectFit: "cover", borderRadius: 120, boxShadow: "0 20px 60px rgba(45,74,45,0.15)", border: "3px solid rgba(255,255,255,0.8)" }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-muted)" }}>Shampoo</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <img src="/images/hair_oil.jpg" alt="Hair Oil" style={{ width: 180, height: 300, objectFit: "cover", borderRadius: 120, boxShadow: "0 20px 60px rgba(45,74,45,0.15)", border: "3px solid rgba(255,255,255,0.8)" }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-muted)" }}>Hair Oil</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transform: "translateY(20px)" }}>
          <img src="/images/red_wine_soap.jpg" alt="Soap" style={{ width: 190, height: 190, objectFit: "cover", borderRadius: 24, boxShadow: "0 16px 50px rgba(45,74,45,0.12)", border: "3px solid rgba(255,255,255,0.8)" }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-muted)" }}>Soap</span>
        </div>
      </div>
    </section>
  );
}
