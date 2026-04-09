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
      <footer id="contact" className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12" style={{ background: "var(--c-bg3)", borderTop: "1px solid var(--c-border)", padding: "4rem 8vw" }}>
        <div>
          <h3 className="text-[2.5rem] font-light mb-1" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>
            H<span style={{ color: "var(--c-gold)" }}>&</span>N
          </h3>
          <span className="text-[0.75rem] tracking-[0.2em] uppercase block mb-5" style={{ color: "var(--c-muted)" }}>
            Hair & Skin &middot; Purely Gentle, Naturally Effective
          </span>
          <a href="tel:8867863739" className="text-[1rem] font-normal no-underline hover:underline" style={{ color: "var(--c-gold)" }}>
            &#128222; 8867863739
          </a>
        </div>
        <div>
          <h4 className="text-[0.7rem] tracking-[0.25em] uppercase mb-5" style={{ color: "var(--c-gold)" }}>Products</h4>
          <ul className="list-none flex flex-col gap-3">
            {["Artisan Soaps", "Body Lotions", "Hair Shampoos", "Hair Oils", "Herbal Remedies"].map((item) => (
              <li key={item} className="text-[0.92rem] cursor-default transition-colors" style={{ color: "var(--c-muted)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[0.7rem] tracking-[0.25em] uppercase mb-5" style={{ color: "var(--c-gold)" }}>About</h4>
          <ul className="list-none flex flex-col gap-3">
            {["Our Philosophy", "Natural Ingredients", "Produced by Synergy\u2122"].map((item) => (
              <li key={item} className="text-[0.92rem] cursor-default transition-colors" style={{ color: "var(--c-muted)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div className="text-center text-[0.78rem]" style={{ background: "var(--c-bg3)", padding: "1.4rem 8vw", color: "rgba(122,112,96,0.5)", borderTop: "1px solid var(--c-border)" }}>
        &copy; 2026 H&N Hair & Skin &middot; Purely Gentle, Naturally Effective &middot; Produced by Synergy&trade;
      </div>
    </>
  );
}
