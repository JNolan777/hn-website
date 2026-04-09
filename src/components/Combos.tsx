import { COMBOS } from "@/lib/products";

export default function Combos() {
  return (
    <section style={{ background: "var(--c-bg)", padding: "4rem 8vw" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>Save More</span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, color: "var(--c-green)" }}>Bundle & Save</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--c-muted)", marginTop: 8 }}>Discounts apply automatically in your cart</p>
      </div>
      <div className="grid-combos" style={{ maxWidth: 900, margin: "0 auto" }}>
        {COMBOS.map((combo) => (
          <div key={combo.id} style={{ background: "white", borderRadius: 12, padding: "2rem", border: "1px solid var(--c-border)", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
            <span style={{ display: "inline-block", background: "var(--c-green)", color: "white", padding: "4px 12px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", marginBottom: 12 }}>
              {combo.discount}% OFF
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--c-green)", marginBottom: 6 }}>{combo.name}</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--c-muted)", marginBottom: 12 }}>{combo.desc}</p>
            <span style={{ fontSize: "0.72rem", color: "var(--c-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Min. {combo.minItems} items
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
