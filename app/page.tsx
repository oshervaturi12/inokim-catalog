import Image from "next/image";
import Link from "next/link";
import ProductTile from "@/app/components/ProductTile";
import Button from "@/app/components/Button";
import { products } from "@/app/lib/products";

const DARK_TILES = new Set(["oxo-dubai", "oxo-carbon"]);
const FULL_WIDTH_TILES = new Set(["kix"]);

export default function HomePage() {
  const comingSoonProduct = products.find((p) => p.comingSoon);
  const regularProducts = products.filter((p) => !p.comingSoon);

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

      {/* ════════════════════════════════════════════════════════════
          CINEMATIC COMING-SOON BANNER — DUBAI ebike
          ════════════════════════════════════════════════════════════ */}
      {comingSoonProduct && (
        <section id="catalog" className="relative bg-white px-4 pt-4">
          <article className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-black sm:aspect-[16/10] md:aspect-[21/9] lg:aspect-[21/8]">
            {/* ─── Image + decoration layers (pointer-events-none so the link below catches clicks) ─── */}
            <div className="pointer-events-none absolute inset-0">
              <Image
                src={comingSoonProduct.imageSrc}
                alt={comingSoonProduct.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1400px"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: "center 30%" }}
              />

              {/* Layer 1: bottom-to-top dark gradient */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30"
              />

              {/* Layer 2: side vignette */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* Layer 3: animated red atmospheric glow */}
              <div
                aria-hidden
                className="absolute -bottom-1/4 left-1/4 h-[80%] w-[60%] animate-pulse blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(230,57,70,0.35), transparent 70%)",
                  animationDuration: "4s",
                }}
              />

              {/* Layer 4: subtle SVG noise grain */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
                }}
              />
            </div>

            {/* ─── Whole-banner click overlay — INSIDE the sized parent so it actually fills the banner ─── */}
            <Link
              href={`/catalog/${comingSoonProduct.slug}`}
              aria-label={`${comingSoonProduct.name} — sneak peek`}
              className="absolute inset-0 z-10"
            />

            {/* ─── Top-left badge ─── */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-sm border border-[var(--color-accent)]/40 bg-black/40 px-3 py-1.5 backdrop-blur-md sm:left-6 sm:top-6 sm:gap-2.5 sm:px-4 sm:py-2 md:left-8 md:top-8">
              <span className="size-1.5 animate-pulse rounded-sm bg-[var(--color-accent)] sm:size-2" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[11px] md:text-[12px]">
                Coming Soon
              </span>
              <span aria-hidden className="hidden h-3 w-px bg-white/30 sm:block" />
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.06em] text-white/70 sm:block sm:text-[11px] md:text-[12px]">
                Dubai 2026
              </span>
            </div>

            {/* ─── Top-right corner mark ─── */}
            <div className="pointer-events-none absolute right-4 top-4 z-20 hidden text-right sm:right-6 sm:top-6 md:right-8 md:top-8 md:block">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
                World&apos;s First
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.06em] text-white/30 md:text-[11px]">
                E-Bike with CarPlay
              </div>
            </div>

            {/* ─── Bottom-right specs strip ─── */}
            <div className="pointer-events-none absolute bottom-6 right-6 z-20 hidden flex-col items-end gap-1 lg:flex lg:bottom-12 lg:right-12">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                Status
              </div>
              <div className="text-[14px] font-bold tracking-tight text-white">
                In development
              </div>
            </div>

            {/* ─── Bottom content (text is pointer-events-none, only the CTA buttons are clickable separately) ─── */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 md:p-12 lg:p-16">
              <div className="max-w-3xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-[12px] md:text-[13px]">
                  Inokim presents
                </div>

                <h2 className="mt-3 text-[clamp(32px,7vw,96px)] font-bold leading-[0.92] tracking-tight text-white sm:mt-4">
                  <span className="block">{comingSoonProduct.name}</span>
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #E63946 0%, #FF6B6B 60%, #E63946 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 4s ease-in-out infinite",
                    }}
                  >
                    With CarPlay.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-[clamp(14px,1.6vw,20px)] font-normal leading-snug text-white/75 sm:mt-5">
                  The world&apos;s first e-bike engineered around Apple CarPlay. Native dashboard. Native navigation. Two wheels.
                </p>

                {/* CTAs — pointer-events-auto re-enables clicks just for these. z-30 above the banner Link. */}
                <div className="pointer-events-auto relative z-30 mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-5">
                  <Link
                    href={`/catalog/${comingSoonProduct.slug}#notify`}
                    className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-accent)] px-5 py-3 text-[13px] font-medium text-white shadow-[0_8px_30px_rgba(230,57,70,0.4)] transition-all hover:scale-[1.04] hover:bg-[#c12d3b] hover:shadow-[0_12px_40px_rgba(230,57,70,0.6)] sm:px-6 sm:text-[14px]"
                  >
                    <span className="size-1.5 animate-pulse rounded-sm bg-white" />
                    <span>Notify me on launch</span>
                  </Link>

                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90 transition-colors group-hover:text-white sm:text-[14px]">
                    <span>Sneak peek</span>
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      ›
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* ============ TILE GRID ============ */}
      <section
        id={comingSoonProduct ? undefined : "catalog"}
        className="bg-white py-4"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          {regularProducts.map((p) => (
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
      <section className="mx-4 md:mx-12 mt-4 overflow-hidden rounded-3xl bg-[var(--color-bg-dark)] px-6 py-20 text-center md:py-28">
        <div className="text-xl font-normal tracking-tight text-[var(--color-fg-secondary-on-dark)] md:text-2xl">
          Since 2009.
        </div>
        <h2 className="mt-1 text-[clamp(36px,6vw,72px)] font-semibold leading-[1.05] tracking-tight text-[var(--color-fg-on-dark)]">
          Engineered without<br />compromise.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-fg-secondary-on-dark)] md:text-xl">
          UL 2272, CE, FCC, and RoHS certified. 12-month manufacturer warranty. Five years of spare-parts availability. The same Inokim quality, in eleven distinct expressions.
        </p>

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