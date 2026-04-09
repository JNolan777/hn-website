"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "white",
  border: "1px solid var(--c-border)",
  color: "var(--c-text)",
  padding: "14px 16px",
  borderRadius: 10,
  fontSize: "0.95rem",
  fontFamily: "var(--font-sans)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--c-muted)",
  marginBottom: 8,
};

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

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div style={{ fontSize: "4rem", color: "var(--c-green)", marginBottom: "1.5rem" }}>&#10003;</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--c-green)", marginBottom: 12 }}>Order Confirmed!</h2>
          <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", marginBottom: 6 }}>Order ID: <span style={{ color: "var(--c-gold)" }}>{orderId}</span></p>
          <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", marginBottom: 32 }}>Thank you for shopping with H&N. We&apos;ll reach out to confirm delivery details.</p>
          <a href="/" style={{ display: "inline-block", background: "var(--c-green)", color: "var(--c-cream)", padding: "14px 32px", borderRadius: 10, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}>
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "6rem 4vw 4rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <a href="/" style={{ color: "var(--c-muted)", fontSize: "0.95rem", textDecoration: "none" }}>&larr; Back to shop</a>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--c-green)", fontWeight: 300, marginTop: 24, marginBottom: 40 }}>Checkout</h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }}>
            {/* Form */}
            <div>
              <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 24 }}>Delivery Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Your name" />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="your@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="Your phone number" />
                </div>
                <div>
                  <label style={labelStyle}>Delivery Address *</label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} style={{ ...inputStyle, resize: "none" as const }} placeholder="Full delivery address" />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ background: "white", border: "1px solid var(--c-border)", borderRadius: 12, padding: 24, height: "fit-content", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 20 }}>Order Summary</h3>
              {items.length === 0 ? (
                <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", padding: "2rem 0", textAlign: "center" }}>Cart is empty</p>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--c-border)" }}>
                      <img src={item.img} alt={item.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, background: "var(--c-bg2)" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.9rem", color: "var(--c-green)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                        <p style={{ fontSize: "0.78rem", color: "var(--c-muted)" }}>&#8377;{item.price} &times; {item.qty}</p>
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "var(--c-gold)" }}>&#8377;{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 8px" }}>
                    <span style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-muted)" }}>Total</span>
                    <span style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--c-green)" }}>&#8377;{totalPrice}</span>
                  </div>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    style={{ width: "100%", background: "var(--c-green)", color: "var(--c-cream)", border: "none", padding: "14px 0", borderRadius: 10, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, marginTop: 8 }}
                  >
                    {loading ? "Processing..." : `Pay \u20B9${totalPrice}`}
                  </button>
                  <p style={{ fontSize: "0.68rem", color: "var(--c-muted)", textAlign: "center", marginTop: 12, opacity: 0.6 }}>Secured by Razorpay</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
