"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, setIsOpen, changeQty, removeItem } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[300] backdrop-blur-[4px] transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        style={{ background: "rgba(0,0,0,0.3)" }}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-[95vw] z-[301] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "var(--c-cream)", borderLeft: "1px solid var(--c-border)" }}
      >
        <div className="px-6 pt-6 pb-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <h3 className="text-[1.3rem] font-normal" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>
            Your Cart <span className="text-[0.7rem] ml-2" style={{ color: "var(--c-muted)" }}>({totalItems})</span>
          </h3>
          <button onClick={() => setIsOpen(false)} className="bg-transparent border-none text-xl cursor-pointer transition-colors" style={{ color: "var(--c-muted)" }}>&#10005;</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4 opacity-30">&#128722;</div>
              <p className="text-sm" style={{ color: "var(--c-muted)" }}>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 py-4" style={{ borderBottom: "1px solid var(--c-border)" }}>
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" style={{ background: "var(--c-bg2)" }} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm truncate" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>{item.name}</h4>
                  <p className="text-[0.7rem] mt-1" style={{ color: "var(--c-gold)" }}>&#8377;{item.price} &times; {item.qty}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 rounded text-xs cursor-pointer flex items-center justify-center transition-colors" style={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", color: "var(--c-muted)" }}>&minus;</button>
                    <span className="text-sm w-4 text-center" style={{ color: "var(--c-green)" }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 rounded text-xs cursor-pointer flex items-center justify-center transition-colors" style={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", color: "var(--c-muted)" }}>+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-[0.6rem] bg-transparent border-none cursor-pointer uppercase tracking-wider transition-colors hover:text-red-500" style={{ color: "var(--c-muted)" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: "1px solid var(--c-border)" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: "var(--c-muted)" }}>Total</span>
              <span className="text-xl font-medium" style={{ color: "var(--c-green)" }}>&#8377;{totalPrice}</span>
            </div>
            <button
              onClick={() => { setIsOpen(false); window.location.href = "/checkout"; }}
              className="w-full border-none py-3.5 rounded-lg text-[0.72rem] tracking-[0.18em] uppercase font-medium cursor-pointer transition-colors"
              style={{ background: "var(--c-green)", color: "var(--c-cream)" }}
            >
              Proceed to Payment &#8594;
            </button>
          </div>
        )}
      </div>
    </>
  );
}
