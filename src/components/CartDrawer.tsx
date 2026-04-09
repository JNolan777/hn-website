"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, totalItems, subtotal, totalPrice, appliedCombo, isOpen, setIsOpen, changeQty, removeItem } = useCart();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) { document.addEventListener("keydown", handleEsc); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", handleEsc); document.body.style.overflow = ""; };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", transition: "all 0.3s", opacity: isOpen ? 1 : 0, visibility: isOpen ? "visible" : "hidden" }}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label="Shopping cart"
        style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "95vw", background: "var(--c-cream)", borderLeft: "1px solid var(--c-border)", zIndex: 301, display: "flex", flexDirection: "column", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)", fontSize: "1.4rem", fontWeight: 400 }}>
            Your Cart <span style={{ fontSize: "0.8rem", color: "var(--c-muted)", marginLeft: 8 }}>({totalItems})</span>
          </h3>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" style={{ background: "none", border: "none", color: "var(--c-muted)", fontSize: "1.4rem", cursor: "pointer", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>&#10005;</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>&#128722;</div>
              <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", marginBottom: 24 }}>Your cart is empty</p>
              <button onClick={() => setIsOpen(false)} style={{ background: "var(--c-green)", color: "white", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid var(--c-border)" }}>
                <img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, background: "var(--c-bg2)" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--c-green)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--c-gold)", marginTop: 4 }}>&#8377;{item.price} &times; {item.qty}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity" style={{ width: 36, height: 36, borderRadius: 6, background: "var(--c-bg2)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&minus;</button>
                    <span style={{ fontSize: "0.95rem", color: "var(--c-green)", width: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity" style={{ width: 36, height: 36, borderRadius: 6, background: "var(--c-bg2)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`} style={{ marginLeft: "auto", fontSize: "0.7rem", color: "var(--c-muted)", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", minHeight: 36, padding: "0 8px" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--c-border)" }}>
            {appliedCombo && (
              <div style={{ background: "rgba(45,74,45,0.08)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--c-green)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{appliedCombo.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--c-muted)", marginLeft: 8 }}>{appliedCombo.discount}% off</span>
                </div>
                <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--c-green)" }}>&minus;&#8377;{appliedCombo.saving}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-muted)" }}>Subtotal</span>
              <span style={{ fontSize: "1rem", color: "var(--c-muted)", textDecoration: appliedCombo ? "line-through" : "none" }}>&#8377;{subtotal}</span>
            </div>
            {appliedCombo && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-green)", fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--c-green)" }}>&#8377;{totalPrice}</span>
              </div>
            )}
            {!appliedCombo && <div style={{ height: 8 }} />}
            <button
              onClick={() => { setIsOpen(false); window.location.href = "/checkout"; }}
              style={{ width: "100%", background: "var(--c-green)", color: "var(--c-cream)", border: "none", padding: "14px 0", borderRadius: 8, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", marginBottom: 8 }}
            >
              Proceed to Payment &#8594;
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{ width: "100%", background: "transparent", color: "var(--c-muted)", border: "1px solid var(--c-border)", padding: "12px 0", borderRadius: 8, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--font-sans)" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
