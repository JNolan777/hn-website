"use client";

import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center" style={{ padding: "5rem 2rem 2.5rem" }}>
      <span className="block text-[0.72rem] tracking-[0.4em] uppercase mb-3" style={{ color: "var(--c-gold)" }}>
        {label}
      </span>
      <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>
        {title}
      </h2>
      <div className="w-[60px] h-px mx-auto mt-6 opacity-50" style={{ background: "var(--c-gold)" }} />
    </div>
  );
}

function CatHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4" style={{ padding: "3rem 0 1.5rem", marginTop: "1rem" }}>
      <span className="text-[0.72rem] tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: "var(--c-gold)" }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--c-border)" }} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {soaps.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ background: "var(--c-green)", padding: "5rem 8vw" }}>
        <div>
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--c-cream)" }}>
            Nature&apos;s Finest, Bottled for You
          </h2>
          <p className="leading-relaxed text-[1rem] mb-8" style={{ color: "rgba(255,249,242,0.65)" }}>
            Every H&N product is formulated with purpose &mdash; combining ancient botanical wisdom with modern skincare science. No harsh chemicals. No compromise.
          </p>
          <ul className="list-none flex flex-col gap-4">
            {[
              "100% natural key ingredients",
              "Free from parabens & harsh sulfates",
              "Suitable for sensitive skin",
              "Cruelty-free formulations",
              "Crafted by Synergy\u2122",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[0.95rem]" style={{ color: "rgba(255,249,242,0.75)" }}>
                <span className="w-5 h-px shrink-0" style={{ background: "var(--c-gold-light)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { title: "Rosemary Lavender Hair Oil", desc: "Stimulates scalp \u00b7 Reduces hair fall \u00b7 Adds natural shine \u00b7 100ml" },
            { title: "Herbal VapoRub", desc: "Eucalyptus \u00b7 Cajeput \u00b7 Peppermint \u00b7 Shea Butter \u00b7 Net Wt. 17g" },
            { title: "Goat Milk & Honey Almond Lotion", desc: "Deeply nourishes \u00b7 Hydrates \u00b7 Softens skin naturally \u00b7 120ml" },
            { title: "Red Wine Hydrating Shower Gel", desc: "Powerful antioxidants \u00b7 Rejuvenates \u00b7 Youthful glow \u00b7 200ml" },
          ].map((card) => (
            <div key={card.title} className="rounded-lg transition-all" style={{ background: "rgba(255,249,242,0.06)", border: "1px solid rgba(212,169,106,0.25)", padding: "1.4rem 1.6rem" }}>
              <div className="text-[1.1rem] mb-1" style={{ fontFamily: "var(--font-serif)", color: "var(--c-gold-light)" }}>{card.title}</div>
              <div className="text-[0.85rem]" style={{ color: "rgba(255,249,242,0.45)" }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body Care */}
      <section id="body" style={{ padding: "0 4vw 5rem", background: "var(--c-bg2)" }}>
        <SectionHeader label="Wellness" title="Body Care" />
        <CatHeader label="Lotions, Gels & Remedies" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {body.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Hair Care */}
      <section id="hair" style={{ padding: "0 4vw 5rem", background: "var(--c-bg)" }}>
        <SectionHeader label="Tresses" title="Hair Care" />
        <CatHeader label="Shampoos, Conditioners & Oils" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hair.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
