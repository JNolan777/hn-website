"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import type { Product } from "@/lib/products";
import { COMBOS } from "@/lib/products";

export type CartItem = Product & { qty: number };
export type AppliedCombo = { name: string; discount: number; saving: number };

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  appliedCombo: AppliedCombo | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("hn-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try { localStorage.setItem("hn-cart", JSON.stringify(items)); } catch { /* ignore */ }
}

function calculateCombo(items: CartItem[]): AppliedCombo | null {
  if (items.length === 0) return null;

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  // Check combos from highest discount to lowest
  const sorted = [...COMBOS].sort((a, b) => b.discount - a.discount);

  for (const combo of sorted) {
    if (combo.cat === "All" && totalQty >= combo.minItems) {
      const saving = Math.round(subtotal * combo.discount / 100);
      return { name: combo.name, discount: combo.discount, saving };
    }
    if (combo.cat !== "All") {
      const catQty = items.filter((i) => i.cat === combo.cat).reduce((s, i) => s + i.qty, 0);
      if (catQty >= combo.minItems) {
        const catTotal = items.filter((i) => i.cat === combo.cat).reduce((s, i) => s + i.price * i.qty, 0);
        const saving = Math.round(catTotal * combo.discount / 100);
        return { name: combo.name, discount: combo.discount, saving };
      }
    }
  }
  return null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setItems(loadCart()); setLoaded(true); }, []);
  useEffect(() => { if (loaded) saveCart(items); }, [items, loaded]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0));
  }, []);

  const clearCart = useCallback(() => { setItems([]); localStorage.removeItem("hn-cart"); }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const appliedCombo = useMemo(() => calculateCombo(items), [items]);
  const totalPrice = subtotal - (appliedCombo?.saving || 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, changeQty, clearCart, totalItems, subtotal, totalPrice, appliedCombo, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
