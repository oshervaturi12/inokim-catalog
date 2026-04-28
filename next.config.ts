import type { NextConfig } from "next";

/**
 * Production-tuned config for the Inokim 2026 catalog.
 *
 * Goals (in order of impact):
 * 1. Aggressive image optimization — most weight on this site is PNG product shots
 * 2. Static rendering — nothing on the site is dynamic, lock it down
 * 3. Bundle hygiene — keep three.js out of shared chunks, tree-shake icon libs
 * 4. Cache hard — static assets get 1-year immutable cache headers
 * 5. Modern compression
 */
const nextConfig: NextConfig = {
  // ─── Output ───────────────────────────────────────────────
  // Standalone build trims node_modules from the deploy output.
  // Vercel handles this automatically; keep for self-hosting (Heroku, etc).
  output: "standalone",

  // ─── Image optimization ───────────────────────────────────
  images: {
    // Modern formats first — AVIF saves ~50% over WebP for photos,
    // WebP saves ~30% over PNG. Browser auto-negotiates.
    formats: ["image/avif", "image/webp"],

    // Match the breakpoints the site actually uses (mobile, tablet, desktop, retina).
    // Defaults are too granular and waste cache slots.
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [40, 96, 192, 384],

    // Cache the optimized variants for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Allow SVGs through next/image (ScooterSvg, BrandWatermark assets).
    // Only safe when you trust your SVG sources — they're in /public so you do.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── Compression ──────────────────────────────────────────
  compress: true, // gzip — your CDN should add brotli on top

  // ─── Bundle hygiene ──────────────────────────────────────
  experimental: {
    // Tree-shake imports from these libs (Next 15+).
    // Adds modular imports so `import { X } from "drei"` only ships X.
    optimizePackageImports: [
      "lucide-react",
      "@react-three/drei",
    ],
  },

  // Don't bundle three.js into server chunks — client-only.
  serverExternalPackages: ["three"],

  // ─── React strictness ─────────────────────────────────────
  reactStrictMode: true,

  // Hide framework header — minor hardening.
  poweredByHeader: false,

  // ─── Cache headers ────────────────────────────────────────
  async headers() {
    return [
      {
        // Hash-fingerprinted Next assets — safe to cache forever
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static product images in /public/products
        source: "/products/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 3D models in /public/models
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Logos, fonts under public root
        source: "/:path*\\.(svg|woff|woff2|ttf|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Standard security headers, applied site-wide
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;