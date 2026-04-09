"use client";

import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem 2.5rem" }}>
      <span style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>
        {label}
      </span>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem,5vw,3.2rem)", fontWeight: 300, color: "var(--c-green)" }}>
        {title}
      </h2>
      <div style={{ width: 60, height: 1, background: "var(--c-gold)", margin: "1.5rem auto 0", opacity: 0.5 }} />
    </div>
  );
}

function CatHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "2.5rem 0 1.5rem" }}>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
    </div>
  );
}

function ProductGridLayout({ children, cols = 4 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${cols === 3 ? "280px" : "240px"}, 1fr))`,
      gap: "1.5rem",
    }}>
      {children}
    </div>
  );
}

export default function ProductGrid() {
  const soaps = PRODUCTS.filter((p) => p.cat === "Soaps");
  const body = PRODUCTS.filter((p) => p.cat === "Body");
  const hair = PRODUCTS.filter((p) => p.cat === "Hair");

  return (
    <>
      {/* Soaps */}
      <section id="soaps" style={{ padding: "0 4vw 5rem", background: "var(--c-bg)" }}>
        <SectionHeader label="Artisan" title="Soaps" />
        <CatHeader label="Handcrafted Natural Soaps" />
        <ProductGridLayout>
          {soaps.map((p) => <ProductCard key={p.id} product={p} />)}
        </ProductGridLayout>
      </section>

      {/* Body Care */}
      <section id="body" style={{ padding: "0 4vw 5rem", background: "var(--c-bg2)" }}>
        <SectionHeader label="Wellness" title="Body Care" />
        <CatHeader label="Lotions, Gels & Remedies" />
        <ProductGridLayout cols={3}>
          {body.map((p) => <ProductCard key={p.id} product={p} />)}
        </ProductGridLayout>
      </section>

      {/* Hair Care */}
      <section id="hair" style={{ padding: "0 4vw 5rem", background: "var(--c-bg)" }}>
        <SectionHeader label="Tresses" title="Hair Care" />
        <CatHeader label="Shampoos, Conditioners & Oils" />
        <ProductGridLayout>
          {hair.map((p) => <ProductCard key={p.id} product={p} />)}
        </ProductGridLayout>
      </section>

      {/* Brand Story Banner */}
      <section style={{ background: "var(--c-green)", padding: "5rem 8vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--c-cream)", lineHeight: 1.2, marginBottom: 20 }}>
            Nature&apos;s Finest, Bottled for You
          </h2>
          <p style={{ color: "rgba(255,249,242,0.65)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 32 }}>
            Every H&N product is formulated with purpose &mdash; combining ancient botanical wisdom with modern skincare science. No harsh chemicals. No compromise.
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "100% natural key ingredients",
              "Free from parabens & harsh sulfates",
              "Suitable for sensitive skin",
              "Cruelty-free formulations",
              "Crafted by Synergy\u2122",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", color: "rgba(255,249,242,0.75)" }}>
                <span style={{ width: 18, height: 1, background: "var(--c-gold-light)", flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { title: "Rosemary Lavender Hair Oil", desc: "Stimulates scalp \u00b7 Reduces hair fall \u00b7 Adds natural shine \u00b7 100ml" },
            { title: "Herbal VapoRub", desc: "Eucalyptus \u00b7 Cajeput \u00b7 Peppermint \u00b7 Shea Butter \u00b7 Net Wt. 17g" },
            { title: "Goat Milk & Honey Almond Lotion", desc: "Deeply nourishes \u00b7 Hydrates \u00b7 Softens skin naturally \u00b7 120ml" },
            { title: "Red Wine Hydrating Shower Gel", desc: "Powerful antioxidants \u00b7 Rejuvenates \u00b7 Youthful glow \u00b7 200ml" },
          ].map((card) => (
            <div key={card.title} style={{ background: "rgba(255,249,242,0.06)", border: "1px solid rgba(212,169,106,0.25)", borderRadius: 8, padding: "1.2rem 1.4rem" }}>
              <div style={{ fontFamily: "var(--font-serif)", color: "var(--c-gold-light)", fontSize: "1.05rem", marginBottom: 4 }}>{card.title}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,249,242,0.45)" }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
