import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    // Log the contact submission (in production, send email or store in DB)
    console.log("Contact form submission:", { name, email, message, timestamp: new Date().toISOString() });

    // You can integrate with email services here:
    // - Resend: await resend.emails.send(...)
    // - SendGrid: await sgMail.send(...)
    // - Or store in a database

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
