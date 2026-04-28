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
      {
        label: "Peak power",
        get: (p) => specBy(p.specs.power, "Peak Power"),
      },
      {
        label: "Battery",
        get: (p) => specBy(p.specs.power, "Battery"),
      },
      {
        label: "Top speed",
        get: (p) => specBy(p.specs.power, "Top Speed"),
      },
      {
        label: "Range",
        get: (p) => specBy(p.specs.power, "Range"),
      },
    ],
  },
  {
    title: "Build",
    specs: [
      {
        label: "Frame",
        get: (p) => specBy(p.specs.build, "Frame") ?? "Aluminum",
      },
      {
        label: "Weight",
        get: (p) => specBy(p.specs.build, "Weight"),
      },
      {
        label: "Tires",
        get: (p) => specBy(p.specs.build, "Tires"),
      },
      {
        label: "Brakes",
        get: (p) => specBy(p.specs.build, "Brakes"),
      },
      {
        label: "Suspension",
        get: (p) => specBy(p.specs.build, "Suspension") ?? "—",
      },
      {
        label: "Folded size",
        get: (p) => specBy(p.specs.build, "Folded Size"),
      },
    ],
  },
  {
    title: "Smart features",
    specs: [
      {
        label: "Ghost Shield",
        get: (p) => specBy(p.specs.smart, "Ghost Shield") ?? "—",
      },
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
      {
        label: "Smart display",
        get: (p) => specBy(p.specs.smart, "Smart Display") ?? "—",
      },
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
      {
        label: "FOB China",
        get: (p) => specBy(p.specs.logistics, "FOB China"),
      },
      {
        label: "MSRP USD",
        get: (p) => specBy(p.specs.logistics, "MSRP USD"),
      },
      {
        label: "40HQ Container",
        get: (p) => specBy(p.specs.logistics, "40HQ Container"),
      },
      {
        label: "Lead time",
        get: (p) => specBy(p.specs.logistics, "Lead Time"),
      },
    ],
  },
];

/* Helper: find a spec by label inside a section */
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
  }, [selectedSlugs, router]);

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

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--color-bg-section)] px-6 py-[100px] text-center">
        <BrandWatermark
          anchor="left-edge"
          widthClass="w-[900px]"
          opacityClass="opacity-[0.05]"
          toneClass="text-[#34444c]"
          showWordmark={false}
          rotation={-12}
        />

        <div className="relative z-[1] mx-auto max-w-3xl">
          <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
            Compare
          </div>
          <h1 className="mt-3 text-[clamp(48px,7vw,96px)] font-bold leading-[0.95] tracking-display">
            Find the{" "}
            <span className="text-gradient-accent">right scooter</span> for your market.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[19px] text-[var(--color-fg-secondary)]">
            Pick up to {MAX_PRODUCTS} models to compare specs, pricing, and B2B logistics side by side.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT PICKER
          ═══════════════════════════════════════════════ */}
      <section className="sticky top-12 z-[80] border-b border-[var(--color-border-light)] bg-white/85 px-6 py-4 backdrop-blur-xl backdrop-saturate-180">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-[var(--color-fg)]">
              Comparing {selected.length} of {MAX_PRODUCTS}
            </span>
            {selected.length > 0 && (
              <button
                onClick={clearAll}
                className="text-[12px] text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="rounded-sm bg-[var(--color-fg)] px-5 py-2 text-[13px] font-normal text-white transition-colors hover:bg-[#2D2D2F]"
          >
            {pickerOpen ? "Done" : selected.length === 0 ? "Pick models" : "Edit selection"}
          </button>
        </div>

        {/* Picker drawer */}
        {pickerOpen && (
          <div className="mx-auto mt-4 max-w-7xl">
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
                    className={`relative flex items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-all ${
                      isSelected
                        ? "border-[var(--color-fg)] bg-[var(--color-fg)] text-white"
                        : "border-[var(--color-border)] bg-white text-[var(--color-fg)] hover:border-[var(--color-fg-secondary)]"
                    } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                  >
                    <div className="relative size-10 flex-shrink-0">
                      <Image
                        src={p.imageSrc}
                        alt={p.name}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">{p.name}</div>
                      <div
                        className={`truncate text-[11px] ${
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
                        className="ml-auto flex size-5 items-center justify-center rounded-sm bg-white text-[var(--color-fg)]"
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
        <section className="bg-[var(--color-bg)] px-6 py-[120px] text-center">
          <div className="mx-auto max-w-md">
            <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
              Get started
            </div>
            <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-tight">
              Pick at least two models to begin.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-fg-secondary)]">
              Open the picker above and select up to {MAX_PRODUCTS} scooters from the lineup.
            </p>
            <button
              onClick={() => setPickerOpen(true)}
              className="mt-8 rounded-sm bg-[var(--color-link)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-link-hover)]"
            >
              Open picker
            </button>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          COMPARISON TABLE
          ═══════════════════════════════════════════════ */}
      {selected.length > 0 && (
        <section className="bg-[var(--color-bg)] px-6 py-[80px]">
          <div className="mx-auto max-w-7xl">
            {/* Product columns header */}
            <div
              className="grid items-end gap-4 border-b border-[var(--color-border)] pb-8"
              style={{
                gridTemplateColumns: `minmax(140px, 200px) repeat(${selected.length}, minmax(0, 1fr))`,
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
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </Link>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                    {p.collectionLabel}
                  </div>
                  <Link
                    href={`/catalog/${p.slug}`}
                    className="mt-1 text-[clamp(18px,2vw,22px)] font-semibold tracking-tight hover:underline"
                  >
                    {p.name}
                  </Link>
                  <button
                    onClick={() => toggleProduct(p.slug)}
                    className="mt-2 text-[12px] text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg)] hover:underline"
                    aria-label={`Remove ${p.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Spec groups */}
            {SPEC_GROUPS.map((group) => (
              <div key={group.title} className="mt-12">
                <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg)]">
                  {group.title}
                </h3>

                <div className="mt-4">
                  {group.specs.map((spec) => {
                    const values = selected.map((p) => spec.get(p) ?? "—");
                    // Highlight when products differ on this spec
                    const differs =
                      values.length > 1 &&
                      new Set(values.filter((v) => v !== "—")).size > 1;

                    return (
                      <div
                        key={spec.label}
                        className="grid items-center gap-4 border-b border-[var(--color-border-light)] py-4 last:border-b-0"
                        style={{
                          gridTemplateColumns: `minmax(140px, 200px) repeat(${selected.length}, minmax(0, 1fr))`,
                        }}
                      >
                        <div className="text-[13px] text-[var(--color-fg-secondary)]">
                          {spec.label}
                        </div>
                        {values.map((v, i) => (
                          <div
                            key={i}
                            className={`text-center text-[14px] ${
                              v === "—"
                                ? "text-[var(--color-fg-tertiary)]"
                                : "font-medium text-[var(--color-fg)]"
                            }`}
                          >
                            <span className="inline-flex items-center gap-1.5">
                              {differs && v !== "—" && (
                                <span
                                  className="size-1.5 rounded-sm bg-[var(--color-accent)]"
                                  aria-hidden
                                />
                              )}
                              {v}
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
              className="mt-16 grid items-center gap-4 border-t border-[var(--color-border)] pt-8"
              style={{
                gridTemplateColumns: `minmax(140px, 200px) repeat(${selected.length}, minmax(0, 1fr))`,
              }}
            >
              <div className="text-[13px] text-[var(--color-fg-secondary)]">
                Get a quote
              </div>
              {selected.map((p) => (
                <div key={p.slug} className="flex justify-center">
                  <Link
                    href={`/catalog/${p.slug}#dealer-form`}
                    className="rounded-sm bg-[var(--color-link)] px-5 py-2 text-[13px] font-normal text-white transition-colors hover:bg-[var(--color-link-hover)]"
                  >
                    Inquire
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          LEGEND
          ═══════════════════════════════════════════════ */}
      {selected.length > 1 && (
        <section className="bg-[var(--color-bg-section)] px-6 py-12">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-center text-[13px] text-[var(--color-fg-secondary)]">
            <span className="size-1.5 rounded-sm bg-[var(--color-accent)]" />
            <span>Red dot indicates models differ on this spec.</span>
          </div>
        </section>
      )}
    </>
  );
}