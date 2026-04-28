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
  { href: "/#dealer", label: "Dealers" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-12 border-b border-[var(--color-border-light)] bg-white/[0.72] backdrop-blur-xl backdrop-saturate-180">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
            <Link
            href="/"
            className="flex items-center"
            aria-label="Inokim home"
            >
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

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[var(--color-border-light)] bg-white md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-2 z-999">
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
          </div>
        </div>
      )}
    </nav>
  );
}