import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import "./globals.css";

// Inter Tight — closest open-source match to SF Pro Display.
// Tighter letter-spacing, more refined details vs. Inter, optimized for display sizes.
const interTight = Inter_Tight({
  subsets: ["latin"],
  // Only ship weights actually used in components: 400, 500, 600, 700.
  // Skipping 300/800 saves ~80KB of font weight.
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  // Preload reduces FOUT (flash of unstyled text)
  preload: true,
});

export const metadata: Metadata = {
  title: "Inokim 2026 — Global B2B Catalog",
  description:
    "The 2026 collection. Eleven models, six collections. FOB China pricing, full specs, and exclusive distributor opportunities — one per territory.",
  metadataBase: new URL("https://inokim.com"),
  openGraph: {
    title: "Inokim 2026 — Built better.",
    description: "The 2026 collection. Choose your power. Global B2B orders open.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="antialiased">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}