"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "/oxo-dubai", label: "OXO Dubai" },
  { href: "/collections/dubai", label: "Dubai" },
  { href: "/collections/carbon", label: "Carbon" },
  { href: "/collections/quick4", label: "Quick⁴" },
  { href: "/collections/light", label: "Light" },
  { href: "/collections/kix", label: "Kix" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About us" },
  { href: "/press", label: "Press" },
];

// Path to the PDF inside /public — change this filename if your PDF is named differently
const CATALOG_PDF_HREF = "/inokim.pdf";
const CATALOG_PDF_FILENAME = "inokim.pdf";

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-12 border-b border-[var(--color-border-light)] bg-white/[0.72] backdrop-blur-xl backdrop-saturate-180">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center" aria-label="Inokim home">
          <Image
            src="/logo.svg"
            alt="Inokim"
            width={96}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-8 text-xs text-[var(--color-fg)] md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[var(--color-fg-secondary)]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side: Download CTA + mobile burger */}
        <div className="flex items-center gap-3">
          {/* Download Catalog — desktop CTA */}
          <a
            href={CATALOG_PDF_HREF}
            download={CATALOG_PDF_FILENAME}
            className="hidden items-center gap-1.5 rounded-sm bg-[var(--color-fg)] px-3.5 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-[#2D2D2F] md:inline-flex"
            aria-label="Download the full Inokim 2026 catalog as PDF"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M8 2v9m0 0l3.5-3.5M8 11L4.5 7.5M2 13h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Catalog</span>
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-8 items-center justify-center md:hidden"
          >
            <span className="relative block h-px w-4 bg-[var(--color-fg)]">
              <span
                className={`absolute left-0 h-px w-4 bg-[var(--color-fg)] transition-transform ${
                  open ? "top-0 rotate-45" : "-top-1.5"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-[var(--color-fg)] transition-transform ${
                  open ? "top-0 -rotate-45" : "top-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[var(--color-border-light)] bg-white md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-border-light)] py-3 text-sm last:border-b-0"
              >
                {l.label}
              </Link>
            ))}

            {/* Download CTA — mobile, prominent at the bottom */}
            <a
              href={CATALOG_PDF_HREF}
              download={CATALOG_PDF_FILENAME}
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-fg)] px-4 py-3 text-sm font-medium text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M8 2v9m0 0l3.5-3.5M8 11L4.5 7.5M2 13h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Download Catalog (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}