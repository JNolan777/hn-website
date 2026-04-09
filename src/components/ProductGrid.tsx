"use client";

import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

type SortOption = "default" | "price-low" | "price-high" | "bestseller";

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem 2.5rem" }}>
      <span style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>{label}</span>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem,5vw,3.2rem)", fontWeight: 300, color: "var(--c-green)" }}>{title}</h2>
      <div style={{ width: 60, height: 1, background: "var(--c-gold)", margin: "1.5rem auto 0", opacity: 0.5 }} />
    </div>
  );
}

function CatHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "2.5rem 0 1.5rem" }}>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
    </div>
  );
}

function SortBar({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <label htmlFor="sort-select" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-muted)" }}>Sort by</label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        style={{ background: "white", border: "1px solid var(--c-border)", borderRadius: 6, padding: "6px 10px", fontSize: "0.82rem", color: "var(--c-text)", fontFamily: "var(--font-sans)", outline: "none", cursor: "pointer" }}
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="bestseller">Bestsellers First</option>
      </select>
    </div>
  );
}

function ProductGridLayout({ children, cols = 4 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${cols === 3 ? "280px" : "240px"}, 1fr))`, gap: "1.5rem" }}>
      {children}
    </div>
  );
}

function sortProducts(products: typeof PRODUCTS, sort: SortOption) {
  const sorted = [...products];
  switch (sort) {
    case "price-low": return sorted.sort((a, b) => a.price - b.price);
    case "price-high": return sorted.sort((a, b) => b.price - a.price);
    case "bestseller": return sorted.sort((a, b) => (b.badge === "Bestseller" ? 1 : 0) - (a.badge === "Bestseller" ? 1 : 0));
    default: return sorted;
  }
}

export default function ProductGrid() {
  const [sort, setSort] = useState<SortOption>("default");

  const soaps = useMemo(() => sortProducts(PRODUCTS.filter((p) => p.cat === "Soaps"), sort), [sort]);
  const body = useMemo(() => sortProducts(PRODUCTS.filter((p) => p.cat === "Body"), sort), [sort]);
  const hair = useMemo(() => sortProducts(PRODUCTS.filter((p) => p.cat === "Hair"), sort), [sort]);

  return (
    <>
      {/* Soaps */}
      <section id="soaps" style={{ padding: "0 8vw 5rem", background: "var(--c-bg)" }}>
        <SectionHeader label="Artisan" title="Soaps" />
        <CatHeader label="Handcrafted Natural Soaps" />
        <SortBar value={sort} onChange={setSort} />
        <ProductGridLayout>
          {soaps.map((p) => <ProductCard key={p.id} product={p} />)}
        </ProductGridLayout>
      </section>

      {/* Body Care */}
      <section id="body" style={{ padding: "0 8vw 5rem", background: "var(--c-bg2)" }}>
        <SectionHeader label="Wellness" title="Body Care" />
        <CatHeader label="Lotions, Gels & Remedies" />
        <ProductGridLayout cols={3}>
          {body.map((p) => <ProductCard key={p.id} product={p} />)}
        </ProductGridLayout>
      </section>

      {/* Hair Care */}
      <section id="hair" style={{ padding: "0 8vw 5rem", background: "var(--c-bg)" }}>
        <SectionHeader label="Tresses" title="Hair Care" />
        <CatHeader label="Shampoos, Conditioners & Oils" />
        <ProductGridLayout>
          {hair.map((p) => <ProductCard key={p.id} product={p} />)}
        </ProductGridLayout>
      </section>

      {/* Our Story */}
      <section id="about" style={{ background: "var(--c-green)", padding: "5rem 8vw" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold-light)", marginBottom: 12, display: "block" }}>Behind the Brand</span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--c-cream)", lineHeight: 1.2, marginBottom: 16 }}>Handcrafted with Care</h2>
          <p style={{ color: "rgba(255,249,242,0.55)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 560, margin: "0 auto" }}>
            Every H&N product is lovingly handcrafted using ancient botanical wisdom and natural ingredients. No harsh chemicals. No compromise.
          </p>
        </div>
        <div className="grid-story" style={{ maxWidth: 1000, margin: "0 auto 48px", borderRadius: 16, overflow: "hidden" }}>
          {[
            { src: "/images/story/craft-7.jpg", alt: "Crafting herbal soap by hand with natural ingredients" },
            { src: "/images/story/craft-6.jpg", alt: "Bamboo and charcoal soap production process" },
            { src: "/images/story/craft-9.jpg", alt: "Red wine soap making with pomegranate extracts" },
            { src: "/images/story/craft-1.jpg", alt: "Artisan soap workshop with natural botanicals" },
            { src: "/images/story/craft-8.jpg", alt: "Handmade papaya soap with fresh ingredients" },
            { src: "/images/story/craft-2.jpg", alt: "Traditional handcrafting process for natural soaps" },
          ].map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} loading="lazy" width={333} height={240} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {["100% Natural", "Paraben Free", "Sensitive Skin Safe", "Cruelty Free", "By Synergy\u2122"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-gold-light)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.85rem", color: "rgba(255,249,242,0.7)", letterSpacing: "0.05em" }}>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
