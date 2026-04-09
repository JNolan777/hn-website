import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const KEY_ID = process.env.RAZORPAY_KEY_ID!;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const body = JSON.stringify({
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: "hn_" + Date.now(),
    });

    const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body,
    });

    const order = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: order.error?.description || "Order creation failed" }, { status: 500 });
    }

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
