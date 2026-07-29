import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

const MAX = { name: 100, email: 160, subject: 160, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Fixed-window rate limit, per instance. Enough to blunt casual abuse of a
 * personal contact form; a larger deployment would move this to a shared store.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 500) {
      for (const [id, value] of hits) if (now > value.resetAt) hits.delete(id);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const honeypot = String(payload.company ?? "").trim();

  // A filled honeypot means a bot — accept silently so it doesn't retry.
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (name.length < 2 || name.length > MAX.name) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > MAX.email) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length < 20 || message.length > MAX.message) {
    return NextResponse.json(
      { error: "Message must be between 20 and 5000 characters." },
      { status: 400 }
    );
  }
  if (subject.length > MAX.subject) {
    return NextResponse.json({ error: "Subject is too long." }, { status: 400 });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error("[contact] EMAIL_USER / EMAIL_PASS are not configured");
    return NextResponse.json(
      { error: "Messaging isn't configured right now — please email me directly." },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to: profile.email,
      replyTo: `"${name}" <${email}>`,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        subject && `Subject: ${subject}`,
        `Received: ${new Date().toISOString()}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Log server-side; never leak transport details to the client.
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { error: "Couldn't send that message. Please email me directly." },
      { status: 502 }
    );
  }
}
