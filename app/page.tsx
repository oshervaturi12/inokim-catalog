import Image from "next/image";
import ProductTile from "@/app/components/ProductTile";
import Button from "@/app/components/Button";
import { products } from "@/app/lib/products";

// Flagship dual-motors get the dark tile treatment.
const DARK_TILES = new Set(["oxo-dubai", "oxo-carbon"]);
const FULL_WIDTH_TILES = new Set(["kix"]);

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bg-[var(--color-bg-section)] px-6 pt-20 text-center md:pt-24">
        <div className="text-xl font-semibold tracking-tight text-[var(--color-fg)] md:text-2xl">
          Inokim 2026
        </div>
        <h1 className="mt-1 text-[clamp(40px,7vw,80px)] font-semibold leading-[1.05] tracking-tight text-[var(--color-fg)]">
          Built better.
        </h1>
        <p className="mt-2 text-[clamp(18px,2.4vw,28px)] font-normal tracking-tight text-[var(--color-fg-secondary)]">
          Eleven models. Six collections. One distributor per territory.
        </p>

        <div className="mt-6 flex justify-center gap-5 text-base md:text-lg z-40">
          <a
            href="#catalog"
            className="inline-flex items-center gap-1 text-[var(--color-link)] hover:underline z-40"
          >
            Explore the lineup <span aria-hidden>›</span>
          </a>
          <a
            href="#dealer"
            className="inline-flex items-center gap-1 text-[var(--color-link)] hover:underline z-40"
          >
            Become a dealer <span aria-hidden>›</span>
          </a>
        </div>

        {/* Hero product image — LCP-optimized */}
        <div className="relative mx-auto md:-mt-26 aspect-[16/8] w-full">
          <Image
            src="/products/bg.png"
            alt="Inokim OXO Dubai"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 1100px"
            priority
            fetchPriority="high"
          />
        </div>
      </section>

      {/* ============ TILE GRID ============ */}
      <section id="catalog" className="bg-white py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          {products.map((p) => (
            <ProductTile
              key={p.slug}
              slug={p.slug}
              name={p.name}
              eyebrow={p.collectionLabel}
              tagline={p.tileTagline ?? p.tagline}
              imageSrc={p.imageSrc}
              dark={DARK_TILES.has(p.slug)}
              fullWidth={FULL_WIDTH_TILES.has(p.slug)}
              aspect={FULL_WIDTH_TILES.has(p.slug) ? "16/8" : "4/5"}
               colors={p.colors}  
            />
          ))}
        </div>
      </section>

      {/* ============ FEATURE BAND — Built Better ============ */}
      <section className="mx-4 md:mx-12 mt-4 overflow-hidden mt-4 overflow-hidden rounded-3xl bg-[var(--color-bg-dark)] px-6 py-20 text-center md:py-28">
        <div className="text-xl font-normal tracking-tight text-[var(--color-fg-secondary-on-dark)] md:text-2xl">
          Since 2009.
        </div>
        <h2 className="mt-1 text-[clamp(36px,6vw,72px)] font-semibold leading-[1.05] tracking-tight text-[var(--color-fg-on-dark)]">
          Engineered without<br />compromise.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-secondary-on-dark)] md:text-xl">
          UL 2272, CE, FCC, and RoHS certified. 12-month manufacturer warranty. Five years of spare-parts availability. The same Inokim quality, in eleven distinct expressions.
        </p>

        {/* Stat row */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-12 gap-y-6">
          {[
            { v: "11", l: "Models" },
            { v: "6", l: "Collections" },
            { v: "35–45", l: "Days lead time" },
            { v: "5 yr", l: "Spare parts" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl font-semibold tracking-tight text-[var(--color-fg-on-dark)] md:text-5xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--color-fg-secondary-on-dark)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ DEALER CTA ============ */}
      <section id="dealer" className="bg-white px-6 py-28 text-center md:py-32">
        <h2 className="mx-auto max-w-3xl text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight">
          Exclusive distributors wanted.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-fg-secondary)] md:text-xl">
          One per territory. Global B2B orders open. Reach out for FOB pricing and territory availability.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="mailto:sales@inokim.com" variant="primary" size="md">
            Email sales
          </Button>
          <Button href="#catalog" variant="secondary" size="md">
            Browse catalog
          </Button>
        </div>
      </section>
    </>
  );
}