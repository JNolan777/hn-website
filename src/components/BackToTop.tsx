"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: 90, left: 24, zIndex: 200,
        width: 44, height: 44, borderRadius: "50%",
        background: "var(--c-bg3)", border: "1px solid var(--c-border)",
        color: "var(--c-green)", fontSize: "1.2rem", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        transition: "opacity 0.3s",
      }}
    >
      &#8593;
    </button>
  );
}
