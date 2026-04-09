import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductGrid />
      <CartDrawer />

      {/* Footer */}
      <footer id="contact" style={{ background: "var(--c-bg3)", borderTop: "1px solid var(--c-border)", padding: "4rem 8vw", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "3rem" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--c-green)", marginBottom: 4 }}>
            H<span style={{ color: "var(--c-gold)" }}>&</span>N
          </h3>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-muted)", display: "block", marginBottom: 20 }}>
            Hair & Skin &middot; Purely Gentle, Naturally Effective
          </span>
          <a href="tel:8867863739" style={{ fontSize: "1rem", color: "var(--c-gold)", textDecoration: "none" }}>
            &#128222; 8867863739
          </a>
        </div>
        <div>
          <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 20 }}>Products</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Artisan Soaps", href: "#soaps" },
              { label: "Body Lotions", href: "#body" },
              { label: "Hair Shampoos", href: "#hair" },
              { label: "Hair Oils", href: "#hair" },
              { label: "Herbal Remedies", href: "#body" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} style={{ fontSize: "0.92rem", color: "var(--c-muted)", textDecoration: "none", transition: "color 0.2s" }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 20 }}>About</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Our Philosophy", href: "#soaps" },
              { label: "Natural Ingredients", href: "#soaps" },
              { label: "Produced by Synergy\u2122", href: "#contact" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} style={{ fontSize: "0.92rem", color: "var(--c-muted)", textDecoration: "none", transition: "color 0.2s" }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div style={{ background: "var(--c-bg3)", padding: "1.4rem 8vw", textAlign: "center", fontSize: "0.78rem", color: "rgba(122,112,96,0.5)", borderTop: "1px solid var(--c-border)" }}>
        &copy; 2026 H&N Hair & Skin &middot; Purely Gentle, Naturally Effective &middot; Produced by Synergy&trade;
      </div>
    </>
  );
}
