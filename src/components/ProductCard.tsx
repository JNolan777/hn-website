"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--c-border)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        transition: "transform 0.3s, box-shadow 0.3s, opacity 0.6s, translate 0.6s",
        display: "flex",
        flexDirection: "column",
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 20px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(45,74,45,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
      }}
    >
      <a href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ position: "relative" }}>
          <img src={product.img} alt={product.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block", background: "var(--c-bg2)" }} />
          {product.badge && (
            <span style={{
              position: "absolute", top: 10, left: 10,
              background: product.badge === "Bestseller" ? "var(--c-green)" : "var(--c-gold)",
              color: "white", padding: "4px 10px", borderRadius: 6,
              fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
            }}>
              {product.badge}
            </span>
          )}
        </div>
        <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 6 }}>
            {product.tag}
          </span>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "var(--c-green)", lineHeight: 1.3, marginBottom: 6 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--c-muted)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
            {product.desc}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--c-green)" }}>
              &#8377;{product.price}
            </span>
            <button
              onClick={handleAdd}
              style={{
                background: added ? "var(--c-green-light)" : "var(--c-green)",
                color: "white", border: "none", padding: "8px 18px", borderRadius: 8,
                fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "background 0.2s",
              }}
            >
              {added ? "Added!" : "+ Add"}
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}
