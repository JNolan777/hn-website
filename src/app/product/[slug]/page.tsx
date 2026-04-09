"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ProductPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug as string);
  const { addItem } = useCart();
  const toast = useToast();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) document.title = `${product.name} | H&N Hair & Skin`;
  }, [product]);

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
    toast.show(`Added ${product.name} to cart`);
    setTimeout(() => setAdded(false), 1200);
  };

  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDesc,
    image: `https://hn-website-seven.vercel.app${product.img}`,
    brand: { "@type": "Brand", name: "H&N Hair & Skin" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "6rem 8vw 4rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <a href="/" style={{ color: "var(--c-muted)", fontSize: "0.85rem", textDecoration: "none" }}>Home</a>
            <span style={{ color: "var(--c-muted)", margin: "0 8px", fontSize: "0.85rem" }}>/</span>
            <a href={`/#${product.cat.toLowerCase()}`} style={{ color: "var(--c-muted)", fontSize: "0.85rem", textDecoration: "none" }}>{product.cat === "Soaps" ? "Soaps" : product.cat === "Body" ? "Body Care" : "Hair Care"}</a>
            <span style={{ color: "var(--c-muted)", margin: "0 8px", fontSize: "0.85rem" }}>/</span>
            <span style={{ color: "var(--c-green)", fontSize: "0.85rem" }}>{product.name}</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div style={{ position: "relative", height: 450, borderRadius: 16, overflow: "hidden", border: "1px solid var(--c-border)" }}>
              <Image src={product.img} alt={`${product.name} - ${product.longDesc.slice(0, 80)}`} fill style={{ objectFit: "cover" }} sizes="50vw" priority />
              {product.badge && (
                <span style={{ position: "absolute", top: 16, left: 16, background: product.badge === "Bestseller" ? "var(--c-green)" : "var(--c-gold)", color: "white", padding: "6px 14px", borderRadius: 6, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, zIndex: 1 }}>
                  {product.badge}
                </span>
              )}
            </div>

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
                aria-label={`Add ${product.name} to cart`}
                style={{ background: added ? "var(--c-green-light)" : "var(--c-green)", color: "white", border: "none", padding: "16px 40px", borderRadius: 10, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", minHeight: 48 }}
              >
                {added ? "\u2713 Added to Cart" : "+ Add to Cart"}
              </button>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 300, color: "var(--c-green)", marginBottom: 24 }}>You may also like</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
                {related.map((p) => (
                  <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: "none", background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid var(--c-border)" }}>
                    <div style={{ position: "relative", height: 160 }}>
                      <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover" }} sizes="33vw" />
                    </div>
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
