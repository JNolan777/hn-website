import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    if (name.length > 200 || (email && email.length > 200) || message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const sanitized = {
      name: name.trim().replace(/<[^>]*>/g, ""),
      email: email?.trim().replace(/<[^>]*>/g, "") || "",
      message: message.trim().replace(/<[^>]*>/g, ""),
    };

    console.log("Contact form:", JSON.stringify({ ...sanitized, timestamp: new Date().toISOString() }));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
