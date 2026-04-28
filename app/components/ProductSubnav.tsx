"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductSubnavProps {
  productName: string;
  /** Section ids to link to (e.g. ["features", "specs", "pricing"]) */
  sections?: { id: string; label: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_SECTIONS = [
  { id: "features", label: "Features" },
  { id: "specs", label: "Specs" },
  { id: "pricing", label: "Pricing" },
];

export default function ProductSubnav({
  productName,
  sections = DEFAULT_SECTIONS,
  ctaLabel = "Request quote",
  ctaHref = "#dealer-form",
}: ProductSubnavProps) {
  const [active, setActive] = useState<string | null>(null);

  // Highlight the section currently in view
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-12 z-[90] h-[52px] border-b border-black/[0.04] bg-[rgba(245,245,247,0.92)] backdrop-blur-xl backdrop-saturate-180">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-[22px]">
        <span className="text-[21px] font-semibold tracking-tight text-[var(--color-fg)]">
          {productName}
        </span>

        <div className="flex items-center gap-6">
          <div className="hidden gap-6 sm:flex">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={`text-[12px] tracking-tight transition-opacity ${
                  active === s.id
                    ? "font-medium text-[var(--color-fg)]"
                    : "text-[var(--color-fg)] opacity-80 hover:opacity-100"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          <Link
            href={ctaHref}
            className="rounded-sm bg-[var(--color-link)] px-4 py-[7px] text-[12px] font-normal text-white transition-colors hover:bg-[var(--color-link-hover)]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}