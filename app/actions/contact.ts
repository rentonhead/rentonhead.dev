"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// Simple in-memory rate limiter (per-instance).
// Not perfect across serverless invocations, but a meaningful first line of defence.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3; // 3 submissions per window per IP
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitStore.get(ip) || []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  // Opportunistic cleanup so the map doesn't grow unbounded
  if (rateLimitStore.size > 5000) {
    rateLimitStore.forEach((v, k) => {
      const fresh = v.filter((t: number) => t > windowStart);
      if (fresh.length === 0) rateLimitStore.delete(k);
      else rateLimitStore.set(k, fresh);
    });
  }
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") || "unknown";
}

const NAME_MAX = 100;
const EMAIL_MAX = 200;
const SUBJECT_MAX = 200;
const MESSAGE_MAX = 5000;
const MESSAGE_MIN = 10;

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const honeypot = (formData.get("_honey") as string | null) ?? "";

  // Honeypot: silently succeed so bots don't get useful feedback
  if (honeypot) return { status: "success" };

  // Rate limit
  const ip = await getClientIp();
  if (isRateLimited(ip)) {
    return { status: "error", message: "rate_limited" };
  }

  // Required field check
  if (!name || !email || !message) {
    return { status: "error", message: "missing_fields" };
  }

  // Length bounds
  if (
    name.length > NAME_MAX ||
    email.length > EMAIL_MAX ||
    subject.length > SUBJECT_MAX ||
    message.length > MESSAGE_MAX
  ) {
    return { status: "error", message: "message_too_long" };
  }
  if (message.length < MESSAGE_MIN) {
    return { status: "error", message: "missing_fields" };
  }

  // Email format
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return { status: "error", message: "invalid_email" };
  }

  // Spam heuristics: block obvious bot patterns
  // 1) URLs in the name field
  if (/https?:\/\//i.test(name) || /<a\s/i.test(name)) {
    return { status: "error", message: "spam_detected" };
  }
  // 2) Too many links in the message (>3 → suspicious)
  const linkMatches = message.match(/https?:\/\//gi);
  if (linkMatches && linkMatches.length > 3) {
    return { status: "error", message: "spam_detected" };
  }
  // 3) Newlines in single-line fields (header injection attempt)
  if (/[\r\n]/.test(email) || /[\r\n]/.test(name) || /[\r\n]/.test(subject)) {
    return { status: "error", message: "spam_detected" };
  }

  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    console.error("GMAIL_APP_PASSWORD env var is not set");
    return { status: "error", message: "server_error" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hasancemilacar@gmail.com",
      pass: appPassword,
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const mailSubject = subject
    ? `[rentonhead.dev] ${subject.slice(0, SUBJECT_MAX)}`
    : `[rentonhead.dev] Yeni mesaj — ${name.slice(0, NAME_MAX)}`;

  try {
    await transporter.sendMail({
      from: `"rentonhead.dev Contact" <hasancemilacar@gmail.com>`,
      to: "hasancemilacar@gmail.com",
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: mailSubject,
      text: `Ad: ${name}\nE-posta: ${email}\nIP: ${ip}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#14b8a6;margin-bottom:4px">rentonhead.dev — Yeni mesaj</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p><strong>Ad:</strong> ${safeName}</p>
          <p><strong>E-posta:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${subject ? `<p><strong>Konu:</strong> ${safeSubject}</p>` : ""}
          <p style="color:#6b7280;font-size:12px"><strong>IP:</strong> ${escapeHtml(ip)}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="white-space:pre-wrap;line-height:1.6">${safeMessage}</p>
        </div>
      `,
    });

    return { status: "success" };
  } catch (err) {
    console.error("Mail send error:", err);
    return { status: "error", message: "server_error" };
  }
}
