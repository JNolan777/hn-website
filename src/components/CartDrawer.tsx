"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, setIsOpen, changeQty, removeItem } = useCart();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)",
          transition: "all 0.3s",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" as const : "hidden" as const,
        }}
      />

      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 420, maxWidth: "95vw",
        background: "var(--c-cream)", borderLeft: "1px solid var(--c-border)",
        zIndex: 301, display: "flex", flexDirection: "column" as const,
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)", fontSize: "1.4rem", fontWeight: 400 }}>
            Your Cart <span style={{ fontSize: "0.8rem", color: "var(--c-muted)", marginLeft: 8 }}>({totalItems})</span>
          </h3>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" style={{ background: "none", border: "none", color: "var(--c-muted)", fontSize: "1.4rem", cursor: "pointer" }}>&#10005;</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "1rem 1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center" as const, padding: "4rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>&#128722;</div>
              <p style={{ color: "var(--c-muted)", fontSize: "0.95rem" }}>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid var(--c-border)" }}>
                <img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: "cover" as const, borderRadius: 8, background: "var(--c-bg2)" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--c-green)", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--c-gold)", marginTop: 4 }}>&#8377;{item.price} &times; {item.qty}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                    <button onClick={() => changeQty(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 4, background: "var(--c-bg2)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&minus;</button>
                    <span style={{ fontSize: "0.95rem", color: "var(--c-green)", width: 16, textAlign: "center" as const }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 4, background: "var(--c-bg2)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => removeItem(item.id)} style={{ marginLeft: "auto", fontSize: "0.65rem", color: "var(--c-muted)", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--c-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--c-muted)" }}>Total</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--c-green)" }}>&#8377;{totalPrice}</span>
            </div>
            <button
              onClick={() => { setIsOpen(false); window.location.href = "/checkout"; }}
              style={{ width: "100%", background: "var(--c-green)", color: "var(--c-cream)", border: "none", padding: "14px 0", borderRadius: 8, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, fontWeight: 500, cursor: "pointer" }}
            >
              Proceed to Payment &#8594;
            </button>
          </div>
        )}
      </div>
    </>
  );
}
