"use client";

import { useState, useRef, useEffect } from "react";
import { PRODUCTS } from "@/lib/products";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.length >= 2
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase()) ||
        p.tag.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search products..."
        style={{
          background: "rgba(181,136,74,0.08)",
          border: "1px solid var(--c-border)",
          color: "var(--c-text)",
          padding: "8px 14px",
          borderRadius: 8,
          fontSize: "0.8rem",
          width: 180,
          outline: "none",
          fontFamily: "var(--font-sans)",
        }}
      />
      {open && results.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, minWidth: 280,
          background: "white", borderRadius: 10, border: "1px solid var(--c-border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 500,
        }}>
          {results.map((p) => (
            <a
              key={p.id}
              href={`/product/${p.slug}`}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                textDecoration: "none", borderBottom: "1px solid var(--c-border)", transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--c-bg2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              <img src={p.img} alt={p.name} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
              <div>
                <div style={{ fontSize: "0.88rem", color: "var(--c-green)" }}>{p.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--c-muted)" }}>&#8377;{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
