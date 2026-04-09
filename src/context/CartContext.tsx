"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = Product & { qty: number };

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
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
  try {
    localStorage.setItem("hn-cart", JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (loaded) saveCart(items);
  }, [items, loaded]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("hn-cart");
  }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, changeQty, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}
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
