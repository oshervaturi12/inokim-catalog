import { NextResponse, type NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db/mongoose";
import DealerInquiryModel from "@/app/lib/models/DealerInquiry";

// Force Node runtime — Mongoose doesn't run on Edge
export const runtime = "nodejs";

// Don't pre-render — this is a mutation
export const dynamic = "force-dynamic";

/* ─── Simple in-memory IP rate limiter ────────────────────────
   For low-volume B2B forms this is sufficient. For high-volume
   sites, swap for Upstash Redis or Vercel KV. */
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX_PER_IP = 5; // 5 submissions per hour per IP
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; resetAt?: number } {
  const now = Date.now();
  const hit = ipHits.get(ip);

  if (!hit || hit.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true };
  }

  if (hit.count >= RATE_MAX_PER_IP) {
    return { allowed: false, resetAt: hit.resetAt };
  }

  hit.count += 1;
  return { allowed: true };
}

function getClientIp(req: NextRequest): string {
  // Trust order: x-forwarded-for (Heroku/Vercel/Cloudflare) -> x-real-ip
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* ═══════════════════════════════════════════════════════════════
   POST /api/dealer-inquiry
   ═══════════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate limit
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil(((rate.resetAt ?? Date.now()) - Date.now()) / 1000),
          ),
        },
      },
    );
  }

  // Parse FormData
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const get = (k: string) => (formData.get(k)?.toString() ?? "").trim();

  // Honeypot — real users never fill this hidden field; bots usually do
  const honeypot = get("website_url");
  if (honeypot) {
    // Pretend success to not tip off the bot
    return NextResponse.json({ ok: true });
  }

  // Required-consent check
  if (get("consent") !== "on") {
    return NextResponse.json({ error: "Consent is required" }, { status: 400 });
  }

  const payload = {
    fullName: get("fullName"),
    email: get("email"),
    phone: get("phone"),
    company: get("company"),
    website: get("website"),
    country: get("country"),
    city: get("city"),
    product: get("product"),
    units: get("units") || "20",
    message: get("message"),
    ipAddress: ip,
    userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? "",
    referer: req.headers.get("referer")?.slice(0, 500) ?? "",
  };

  // Save to DB
  try {
    await connectDB();
    const inquiry = await DealerInquiryModel.create(payload);

    return NextResponse.json(
      { ok: true, id: inquiry._id.toString() },
      { status: 201 },
    );
  } catch (err) {
    // Mongoose validation error
    if (
      err &&
      typeof err === "object" &&
      "name" in err &&
      err.name === "ValidationError"
    ) {
      const errors = "errors" in err ? err.errors : undefined;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 },
      );
    }

    console.error("[dealer-inquiry] save failed:", err);
    return NextResponse.json(
      { error: "Server error. Please try again or email sales@inokim.com" },
      { status: 500 },
    );
  }
}