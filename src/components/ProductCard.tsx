"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  const catLabel = product.cat === "Soaps" ? "Soap" : product.cat === "Body" ? "Body Care" : "Hair Care";

  return (
    <div
      className="bg-white rounded-xl overflow-hidden transition-all duration-300 min-w-0 hover:-translate-y-1 flex flex-col"
      style={{ border: "1px solid var(--c-border)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-[240px] object-cover block"
        style={{ background: "var(--c-bg2)" }}
      />
      <div className="flex flex-col flex-1" style={{ padding: "1.6rem 1.6rem 1.8rem" }}>
        <span className="text-[0.7rem] tracking-[0.2em] uppercase mb-2 block" style={{ color: "var(--c-gold)" }}>
          {product.id} &middot; {product.tag}
        </span>
        <h3 className="text-[1.25rem] font-normal leading-tight mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>
          {product.name}
        </h3>
        <p className="text-[0.88rem] leading-relaxed mb-5 flex-1" style={{ color: "var(--c-muted)" }}>
          {product.desc}
        </p>
        {/* Price row with tag and button inline */}
        <div className="flex items-center justify-between">
          <span className="text-[1.35rem] font-medium" style={{ color: "var(--c-green)" }}>
            &#8377;{product.price}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="text-[0.65rem] tracking-[0.12em] uppercase px-3 py-1 rounded-full"
              style={{ background: "var(--c-bg2)", color: "var(--c-gold)", border: "1px solid var(--c-border)" }}
            >
              {catLabel}
            </span>
            <button
              onClick={handleAdd}
              className="border-none cursor-pointer text-[0.7rem] tracking-[0.1em] uppercase px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
              style={{ fontFamily: "var(--font-sans)", background: added ? "var(--c-green-light)" : "var(--c-green)" }}
            >
              {added ? "Added!" : "+ Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
