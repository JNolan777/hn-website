"use client";

import { useParams } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ProductPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug as string);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--c-green)", marginBottom: 16 }}>Product not found</h1>
            <a href="/" style={{ color: "var(--c-gold)", textDecoration: "none" }}>&larr; Back to shop</a>
          </div>
        </div>
      </>
    );
  }

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "6rem 8vw 4rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <a href="/" style={{ color: "var(--c-muted)", fontSize: "0.9rem", textDecoration: "none" }}>&larr; Back to shop</a>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 32 }}>
            {/* Image */}
            <div style={{ position: "relative" }}>
              <img src={product.img} alt={`${product.name} - ${product.desc}`} style={{ width: "100%", height: 450, objectFit: "cover", borderRadius: 16, border: "1px solid var(--c-border)" }} />
              {product.badge && (
                <span style={{ position: "absolute", top: 16, left: 16, background: product.badge === "Bestseller" ? "var(--c-green)" : "var(--c-gold)", color: "white", padding: "6px 14px", borderRadius: 6, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 8, display: "block" }}>{product.tag}</span>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: 300, color: "var(--c-green)", lineHeight: 1.2, marginBottom: 16 }}>{product.name}</h1>
              <p style={{ fontSize: "1.6rem", fontWeight: 500, color: "var(--c-green)", marginBottom: 24 }}>&#8377;{product.price}</p>
              <p style={{ fontSize: "1rem", color: "var(--c-muted)", lineHeight: 1.8, marginBottom: 32 }}>{product.longDesc}</p>

              {product.ingredients && (
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>Key Ingredients</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {product.ingredients.map((ing) => (
                      <span key={ing} style={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", padding: "6px 14px", borderRadius: 99, fontSize: "0.82rem", color: "var(--c-muted)" }}>{ing}</span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAdd}
                style={{ background: added ? "var(--c-green-light)" : "var(--c-green)", color: "white", border: "none", padding: "16px 40px", borderRadius: 10, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)" }}
              >
                {added ? "Added to Cart!" : "+ Add to Cart"}
              </button>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300, color: "var(--c-green)", marginBottom: 24 }}>You may also like</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
                {related.map((p) => (
                  <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: "none", background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid var(--c-border)" }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--c-green)", marginBottom: 4 }}>{p.name}</h3>
                      <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--c-green)" }}>&#8377;{p.price}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
