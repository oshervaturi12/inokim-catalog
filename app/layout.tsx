import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}