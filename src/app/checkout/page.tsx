"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handlePayment = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to create order");
        setLoading(false);
        return;
      }
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "H&N Hair & Skin",
        description: `Order - ${items.length} item(s)`,
        order_id: data.orderId,
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
          const verifyRes = await fetch("/api/razorpay", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.verified) {
            setOrderId("HN" + Date.now().toString().slice(-8));
            setSuccess(true);
            clearCart();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#2d4a2d" },
        modal: { ondismiss: () => setLoading(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-[var(--c-border)] text-[var(--c-text)] px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--c-gold)] transition-colors";

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--c-bg)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6 text-[var(--c-green)]">&#10003;</div>
          <h2 className="text-2xl text-[var(--c-green)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>Order Confirmed!</h2>
          <p className="text-[var(--c-muted)] text-sm mb-2">Order ID: <span className="text-[var(--c-gold)]">{orderId}</span></p>
          <p className="text-[var(--c-muted)] text-sm mb-8">Thank you for shopping with H&N. We&apos;ll reach out to confirm delivery details.</p>
          <a href="/" className="inline-block bg-[var(--c-green)] text-[var(--c-cream)] px-8 py-3 rounded-lg text-[0.72rem] tracking-[0.18em] uppercase font-medium no-underline hover:bg-[var(--c-green-light)] transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="min-h-screen bg-[var(--c-bg)] pt-24 pb-16 px-[4vw]">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-[var(--c-muted)] text-sm hover:text-[var(--c-green)] transition-colors no-underline">&larr; Back to shop</a>
          <h1 className="text-3xl text-[var(--c-green)] font-light mt-6 mb-10" style={{ fontFamily: "var(--font-serif)" }}>Checkout</h1>
          <div className="grid md:grid-cols-[1fr_380px] gap-10">
            <div>
              <h3 className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--c-gold)] mb-6">Delivery Details</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-[var(--c-muted)] mb-2">Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" style={{ fontFamily: "var(--font-sans)" }} />
                </div>
                <div>
                  <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-[var(--c-muted)] mb-2">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="your@email.com" style={{ fontFamily: "var(--font-sans)" }} />
                </div>
                <div>
                  <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-[var(--c-muted)] mb-2">Phone *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="Your phone number" style={{ fontFamily: "var(--font-sans)" }} />
                </div>
                <div>
                  <label className="block text-[0.68rem] tracking-[0.15em] uppercase text-[var(--c-muted)] mb-2">Delivery Address *</label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Full delivery address" style={{ fontFamily: "var(--font-sans)" }} />
                </div>
              </div>
            </div>
            <div className="bg-white border border-[var(--c-border)] rounded-xl p-6 h-fit shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              <h3 className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--c-gold)] mb-5">Order Summary</h3>
              {items.length === 0 ? (
                <p className="text-[var(--c-muted)] text-sm py-8 text-center">Cart is empty</p>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 py-3 border-b border-[var(--c-border)]">
                      <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-[var(--c-bg2)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--c-green)] truncate">{item.name}</p>
                        <p className="text-[0.7rem] text-[var(--c-muted)]">&#8377;{item.price} &times; {item.qty}</p>
                      </div>
                      <span className="text-sm text-[var(--c-gold)]">&#8377;{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-4 mt-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-[var(--c-muted)]">Total</span>
                    <span className="text-xl font-medium text-[var(--c-green)]">&#8377;{totalPrice}</span>
                  </div>
                  <button onClick={handlePayment} disabled={loading} className="w-full bg-[var(--c-green)] text-[var(--c-cream)] border-none py-3.5 rounded-lg text-[0.72rem] tracking-[0.18em] uppercase font-medium cursor-pointer hover:bg-[var(--c-green-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                    {loading ? "Processing..." : `Pay \u20B9${totalPrice}`}
                  </button>
                  <p className="text-[0.6rem] text-[var(--c-muted)] text-center mt-3 opacity-60">Secured by Razorpay</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
