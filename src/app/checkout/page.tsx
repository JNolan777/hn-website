"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "white", border: "1px solid var(--c-border)",
  color: "var(--c-text)", padding: "14px 16px", borderRadius: 10,
  fontSize: "0.95rem", fontFamily: "var(--font-sans)", outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.72rem", letterSpacing: "0.15em",
  textTransform: "uppercase", color: "var(--c-muted)", marginBottom: 8,
};

export default function CheckoutPage() {
  const { items, subtotal, totalPrice, appliedCombo, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone.trim())) errs.phone = "Enter a valid 10-digit phone number";
    if (!address.trim()) errs.address = "Address is required";
    if (!city.trim()) errs.city = "City is required";
    if (!pincode.trim()) errs.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(pincode.trim())) errs.pincode = "Enter a valid 6-digit pincode";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePayment = async () => {
    if (!validate()) return;
    if (items.length === 0) { setErrors({ form: "Your cart is empty" }); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const data = await res.json();
      if (!res.ok) { setErrors({ form: data.error || "Failed to create order" }); setLoading(false); return; }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount, currency: data.currency,
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
            setErrors({ form: "Payment verification failed. Please contact support." });
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
      setErrors({ form: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  const renderField = (id: string, label: string, value: string, onChange: (v: string) => void, opts?: { type?: string; placeholder?: string; required?: boolean }) => (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{opts?.required !== false ? " *" : ""}</label>
      <input id={id} type={opts?.type || "text"} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, borderColor: errors[id] ? "#c44" : "var(--c-border)" }} placeholder={opts?.placeholder} />
      {errors[id] && <p style={{ fontSize: "0.75rem", color: "#c44", marginTop: 4 }}>{errors[id]}</p>}
    </div>
  );

  if (success) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ textAlign: "center", maxWidth: 420 }}>
            <div style={{ fontSize: "4rem", color: "var(--c-green)", marginBottom: "1.5rem" }}>&#10003;</div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--c-green)", marginBottom: 12 }}>Order Confirmed!</h2>
            <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", marginBottom: 6 }}>Order ID: <span style={{ color: "var(--c-gold)" }}>{orderId}</span></p>
            <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", marginBottom: 32 }}>Thank you for shopping with H&N. We&apos;ll reach out to confirm delivery.</p>
            <a href="/" style={{ display: "inline-block", background: "var(--c-green)", color: "var(--c-cream)", padding: "14px 32px", borderRadius: 10, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}>Continue Shopping</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartDrawer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "6rem 4vw 4rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <a href="/" style={{ color: "var(--c-muted)", fontSize: "0.95rem", textDecoration: "none" }}>&larr; Back to shop</a>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--c-green)", fontWeight: 300, marginTop: 24, marginBottom: 40 }}>Checkout</h1>

          {errors.form && <div style={{ background: "#fde8e8", border: "1px solid #f5c6c6", borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#c44", fontSize: "0.88rem" }}>{errors.form}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }}>
            <div>
              <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 24 }}>Delivery Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {renderField("name", "Full Name", name, setName, { placeholder: "Your name" })}
                {renderField("email", "Email", email, setEmail, { type: "email", placeholder: "your@email.com", required: false })}
                {renderField("phone", "Phone", phone, setPhone, { type: "tel", placeholder: "10-digit phone number" })}
                {renderField("address", "Street Address", address, setAddress, { placeholder: "House/flat, street, area" })}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {renderField("city", "City", city, setCity, { placeholder: "City" })}
                  {renderField("pincode", "Pincode", pincode, setPincode, { placeholder: "6-digit pincode" })}
                </div>
              </div>
            </div>

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
                        <p style={{ fontSize: "0.88rem", color: "var(--c-green)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--c-muted)" }}>&#8377;{item.price} &times; {item.qty}</p>
                      </div>
                      <span style={{ fontSize: "0.88rem", color: "var(--c-gold)", flexShrink: 0 }}>&#8377;{item.price * item.qty}</span>
                    </div>
                  ))}

                  <div style={{ padding: "12px 0 4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--c-muted)", marginBottom: 4 }}>
                      <span>Subtotal</span><span>&#8377;{subtotal}</span>
                    </div>
                    {appliedCombo && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--c-green)", marginBottom: 4 }}>
                        <span>{appliedCombo.name} ({appliedCombo.discount}% off)</span><span>&minus;&#8377;{appliedCombo.saving}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--c-border)", marginTop: 8 }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--c-green)" }}>Total</span>
                      <span style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--c-green)" }}>&#8377;{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    style={{ width: "100%", background: "var(--c-green)", color: "var(--c-cream)", border: "none", padding: "14px 0", borderRadius: 10, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, marginTop: 12 }}
                  >
                    {loading ? "Processing..." : `Pay \u20B9${totalPrice}`}
                  </button>
                  <p style={{ fontSize: "0.68rem", color: "var(--c-muted)", textAlign: "center", marginTop: 10, opacity: 0.6 }}>Secured by Razorpay</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
