"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/app/lib/products";
import BrandWatermark from "@/app/components/BrandWatermark";

interface CompareViewProps {
  products: Product[];
  initialSlugs: string[];
}

const MAX_PRODUCTS = 4;

/* ─── Spec rows we render. Each row pulls its value via accessor. ─── */
interface SpecDef {
  label: string;
  /** How to extract the displayable value from a product */
  get: (p: Product) => string | null;
}

interface SpecGroup {
  title: string;
  specs: SpecDef[];
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    title: "Performance",
    specs: [
      { label: "Peak power", get: (p) => specBy(p.specs.power, "Peak Power") },
      { label: "Battery", get: (p) => specBy(p.specs.power, "Battery") },
      { label: "Top speed", get: (p) => specBy(p.specs.power, "Top Speed") },
      { label: "Range", get: (p) => specBy(p.specs.power, "Range") },
    ],
  },
  {
    title: "Build",
    specs: [
      { label: "Frame", get: (p) => specBy(p.specs.build, "Frame") ?? "Aluminum" },
      { label: "Weight", get: (p) => specBy(p.specs.build, "Weight") },
      { label: "Tires", get: (p) => specBy(p.specs.build, "Tires") },
      { label: "Brakes", get: (p) => specBy(p.specs.build, "Brakes") },
      { label: "Suspension", get: (p) => specBy(p.specs.build, "Suspension") ?? "—" },
      { label: "Folded size", get: (p) => specBy(p.specs.build, "Folded Size") },
    ],
  },
  {
    title: "Smart features",
    specs: [
      { label: "Ghost Shield", get: (p) => specBy(p.specs.smart, "Ghost Shield") ?? "—" },
      {
        label: "Apple CarPlay",
        get: (p) =>
          specBy(p.specs.smart, "Apple CarPlay") ??
          specBy(p.specs.smart, "CarPlay") ??
          "—",
      },
      {
        label: "GPS / NFC / Alarm",
        get: (p) => specBy(p.specs.smart, "GPS / NFC / Alarm") ?? "—",
      },
      { label: "Smart display", get: (p) => specBy(p.specs.smart, "Smart Display") ?? "—" },
    ],
  },
  {
    title: "Colors",
    specs: [
      {
        label: "Available colors",
        get: (p) => p.colors?.map((c) => c.name).join(", ") ?? "Single color",
      },
    ],
  },
  {
    title: "B2B & Logistics",
    specs: [
      { label: "FOB China", get: (p) => specBy(p.specs.logistics, "FOB China") },
      { label: "MSRP USD", get: (p) => specBy(p.specs.logistics, "MSRP USD") },
      { label: "40HQ Container", get: (p) => specBy(p.specs.logistics, "40HQ Container") },
      { label: "Lead time", get: (p) => specBy(p.specs.logistics, "Lead Time") },
    ],
  },
];

function specBy(
  arr: { label: string; value: string; unit?: string; secondary?: string }[],
  label: string,
): string | null {
  const s = arr.find((x) => x.label === label);
  if (!s) return null;
  return [s.value, s.unit].filter(Boolean).join(" ");
}

export default function CompareView({ products, initialSlugs }: CompareViewProps) {
  const router = useRouter();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialSlugs.filter((s) => products.some((p) => p.slug === s)),
  );
  const [pickerOpen, setPickerOpen] = useState(false);

  const selected = selectedSlugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => p !== undefined);

  // Sync URL with selection
useEffect(() => {
  const url = new URL(window.location.href);
  if (selectedSlugs.length > 0) {
    url.searchParams.set("models", selectedSlugs.join(","));
  } else {
    url.searchParams.delete("models");
  }
  router.replace(url.pathname + url.search, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedSlugs]);

  const toggleProduct = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX_PRODUCTS) return prev;
      return [...prev, slug];
    });
  }, []);

  function clearAll() {
    setSelectedSlugs([]);
  }

  // Column widths — mobile = fixed 130px so user scrolls horizontally
  // Tablet+ = flexible grid (1fr each)
  const labelColWidth = "minmax(110px, 160px)";
  const productColMobile = "130px";

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--color-bg-section)] px-4 py-16 text-center sm:px-6 sm:py-[80px] lg:py-[100px]">
        <BrandWatermark
          anchor="left-edge"
          widthClass="w-[600px] sm:w-[900px]"
          opacityClass="opacity-[0.05]"
          toneClass="text-[#34444c]"
          showWordmark={false}
          rotation={-12}
        />

        <div className="relative z-[1] mx-auto max-w-3xl">
          <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
            Compare
          </div>
          <h1 className="mt-3 text-[clamp(36px,7vw,96px)] font-bold leading-[0.95] tracking-display">
            Find the{" "}
            <span className="text-gradient-accent">right scooter</span> for your market.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-5 sm:text-[19px]">
            Pick up to {MAX_PRODUCTS} models to compare specs, pricing, and B2B logistics side by side.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT PICKER — sticky bar
          ═══════════════════════════════════════════════ */}
      <section className="sticky top-12 z-[80] border-b border-[var(--color-border-light)] bg-white/85 px-4 py-3 backdrop-blur-xl backdrop-saturate-180 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[13px] font-medium text-[var(--color-fg)] sm:text-[14px]">
              Comparing {selected.length} of {MAX_PRODUCTS}
            </span>
            {selected.length > 0 && (
              <button
                onClick={clearAll}
                className="text-[11px] text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)] hover:underline sm:text-[12px]"
              >
                Clear all
              </button>
            )}
          </div>
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="flex-shrink-0 rounded-sm bg-[var(--color-fg)] px-4 py-2 text-[12px] font-normal text-white transition-colors hover:bg-[#2D2D2F] sm:px-5 sm:text-[13px]"
          >
            {pickerOpen ? "Done" : selected.length === 0 ? "Pick models" : "Edit"}
          </button>
        </div>

        {/* Picker drawer */}
        {pickerOpen && (
          <div className="mx-auto mt-3 max-w-7xl sm:mt-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {products.map((p) => {
                const isSelected = selectedSlugs.includes(p.slug);
                const disabled = !isSelected && selected.length >= MAX_PRODUCTS;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => toggleProduct(p.slug)}
                    disabled={disabled}
                    className={`relative flex items-center gap-2.5 rounded-sm border px-2.5 py-2 text-left transition-all sm:gap-3 sm:px-3 sm:py-2.5 ${
                      isSelected
                        ? "border-[var(--color-fg)] bg-[var(--color-fg)] text-white"
                        : "border-[var(--color-border)] bg-white text-[var(--color-fg)] hover:border-[var(--color-fg-secondary)]"
                    } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                  >
                    <div className="relative size-8 flex-shrink-0 sm:size-10">
                      <Image
                        src={p.imageSrc}
                        alt={p.name}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12px] font-medium sm:text-[13px]">
                        {p.name}
                      </div>
                      <div
                        className={`truncate text-[10px] sm:text-[11px] ${
                          isSelected
                            ? "text-white/70"
                            : "text-[var(--color-fg-secondary)]"
                        }`}
                      >
                        {p.collectionLabel}
                      </div>
                    </div>
                    {isSelected && (
                      <span
                        className="ml-auto flex size-4 flex-shrink-0 items-center justify-center rounded-sm bg-white text-[var(--color-fg)] sm:size-5"
                        aria-hidden
                      >
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          EMPTY STATE
          ═══════════════════════════════════════════════ */}
      {selected.length === 0 && (
        <section className="bg-[var(--color-bg)] px-4 py-20 text-center sm:px-6 sm:py-[100px] lg:py-[120px]">
          <div className="mx-auto max-w-md">
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
              Get started
            </div>
            <h2 className="mt-3 text-[clamp(24px,4vw,40px)] font-bold leading-[1.1] tracking-tight">
              Pick at least two models to begin.
            </h2>
            <p className="mt-3 text-[14px] text-[var(--color-fg-secondary)] sm:mt-4 sm:text-[15px]">
              Open the picker above and select up to {MAX_PRODUCTS} scooters from the lineup.
            </p>
            <button
              onClick={() => setPickerOpen(true)}
              className="mt-6 rounded-sm bg-[var(--color-link)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-link-hover)] sm:mt-8"
            >
              Open picker
            </button>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          COMPARISON TABLE — horizontal scroll on mobile
          ═══════════════════════════════════════════════ */}
      {selected.length > 0 && (
        <section className="bg-[var(--color-bg)] px-4 py-12 sm:px-6 sm:py-[60px] lg:py-[80px]">
          {/* Mobile scroll hint */}
          <div className="mx-auto mb-4 flex max-w-7xl items-center justify-center gap-2 text-[11px] text-[var(--color-fg-tertiary)] sm:hidden">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Scroll horizontally to compare</span>
          </div>

          {/* Scroll container — only on mobile (sm:overflow-visible removes scroll on tablet+) */}
          <div className="-mx-4 overflow-x-auto sm:mx-auto sm:max-w-7xl sm:overflow-visible">
            <div
              className="px-4 sm:px-0"
              style={{
                minWidth: `calc(${labelColWidth.split(",")[0].replace("minmax(", "").trim()} + ${selected.length} * ${productColMobile})`,
              }}
            >
              {/* Product columns header */}
              <div
                className="grid items-end gap-3 border-b border-[var(--color-border)] pb-6 sm:gap-4 sm:pb-8"
                style={{
                  gridTemplateColumns: `${labelColWidth} repeat(${selected.length}, minmax(${productColMobile}, 1fr))`,
                }}
              >
                <div /> {/* Empty cell above row labels */}
                {selected.map((p) => (
                  <div key={p.slug} className="flex flex-col items-center text-center">
                    <Link
                      href={`/catalog/${p.slug}`}
                      className="group relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-sm bg-[var(--color-bg-section)] transition-transform hover:scale-[0.99]"
                    >
                      <Image
                        src={p.imageSrc}
                        alt={p.name}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02] sm:p-3"
                        sizes="(max-width: 768px) 130px, 200px"
                      />
                    </Link>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:mt-3 sm:text-[11px]">
                      {p.collectionLabel}
                    </div>
                    <Link
                      href={`/catalog/${p.slug}`}
                      className="mt-1 text-[clamp(14px,2vw,22px)] font-semibold leading-tight tracking-tight hover:underline"
                    >
                      {p.name}
                    </Link>
                    <button
                      onClick={() => toggleProduct(p.slug)}
                      className="mt-1 text-[11px] text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg)] hover:underline sm:mt-2 sm:text-[12px]"
                      aria-label={`Remove ${p.name}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Spec groups */}
              {SPEC_GROUPS.map((group) => (
                <div key={group.title} className="mt-8 sm:mt-12">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg)] sm:text-[14px]">
                    {group.title}
                  </h3>

                  <div className="mt-3 sm:mt-4">
                    {group.specs.map((spec) => {
                      const values = selected.map((p) => spec.get(p) ?? "—");
                      const differs =
                        values.length > 1 &&
                        new Set(values.filter((v) => v !== "—")).size > 1;

                      return (
                        <div
                          key={spec.label}
                          className="grid items-center gap-3 border-b border-[var(--color-border-light)] py-3 last:border-b-0 sm:gap-4 sm:py-4"
                          style={{
                            gridTemplateColumns: `${labelColWidth} repeat(${selected.length}, minmax(${productColMobile}, 1fr))`,
                          }}
                        >
                          <div className="text-[12px] text-[var(--color-fg-secondary)] sm:text-[13px]">
                            {spec.label}
                          </div>
                          {values.map((v, i) => (
                            <div
                              key={i}
                              className={`text-center text-[12px] sm:text-[14px] ${
                                v === "—"
                                  ? "text-[var(--color-fg-tertiary)]"
                                  : "font-medium text-[var(--color-fg)]"
                              }`}
                            >
                              <span className="inline-flex items-center gap-1.5">
                                {differs && v !== "—" && (
                                  <span
                                    className="size-1.5 flex-shrink-0 rounded-sm bg-[var(--color-accent)]"
                                    aria-hidden
                                  />
                                )}
                                <span className="break-words">{v}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* CTA row */}
              <div
                className="mt-12 grid items-center gap-3 border-t border-[var(--color-border)] pt-6 sm:mt-16 sm:gap-4 sm:pt-8"
                style={{
                  gridTemplateColumns: `${labelColWidth} repeat(${selected.length}, minmax(${productColMobile}, 1fr))`,
                }}
              >
                <div className="text-[12px] text-[var(--color-fg-secondary)] sm:text-[13px]">
                  Get a quote
                </div>
                {selected.map((p) => (
                  <div key={p.slug} className="flex justify-center">
                    <Link
                      href={`/catalog/${p.slug}#dealer-form`}
                      className="rounded-sm bg-[var(--color-link)] px-3 py-1.5 text-[11px] font-normal text-white transition-colors hover:bg-[var(--color-link-hover)] sm:px-5 sm:py-2 sm:text-[13px]"
                    >
                      Inquire
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          LEGEND
          ═══════════════════════════════════════════════ */}
      {selected.length > 1 && (
        <section className="bg-[var(--color-bg-section)] px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-center text-[12px] text-[var(--color-fg-secondary)] sm:gap-3 sm:text-[13px]">
            <span className="size-1.5 flex-shrink-0 rounded-sm bg-[var(--color-accent)]" />
            <span>Red dot indicates models differ on this spec.</span>
          </div>
        </section>
      )}
    </>
  );
}