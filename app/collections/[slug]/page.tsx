import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ProductTile from "@/app/components/ProductTile";
import Reveal from "@/app/components/Reveal";
import MagneticButton from "@/app/components/MagneticButton";
import BrandWatermark from "@/app/components/BrandWatermark";
import {
  collections,
  getCollection,
  getProductsForCollection,
} from "@/app/lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DARK_TILES = new Set(["oxo-dubai", "oxo-carbon"]);
const FULL_WIDTH_TILES = new Set(["kix"]);

// ─── Static generation ──────────────────────────────────────
export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Not found" };

  return {
    title: `${collection.displayName} — Inokim 2026`,
    description: collection.subhead,
    openGraph: {
      title: `${collection.displayName} — Inokim 2026`,
      description: collection.subhead,
      type: "website",
    },
  };
}

/** Parses `{accent:text}` to wrap in red gradient span. */
function parseHeadline(headline: string) {
  const parts = headline.split(/(\{accent:[^}]+\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{accent:([^}]+)\}$/);
    if (match) {
      return (
        <span key={i} className="text-gradient-accent">
          {match[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Page ───────────────────────────────────────────────────
export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsForCollection(slug);
  if (collectionProducts.length === 0) notFound();

  // Hero theme styles
  const heroIsDark = collection.heroTheme === "dark";
  const heroBg = {
    white: "bg-[var(--color-bg)]",
    section: "bg-[var(--color-bg-section)]",
    dark: "bg-[var(--color-bg-darker)]",
  }[collection.heroTheme];

  const heroFg = heroIsDark ? "text-[var(--color-fg-on-dark)]" : "text-[var(--color-fg)]";
  const heroSubFg = heroIsDark
    ? "text-[var(--color-fg-secondary-on-dark)]"
    : "text-[var(--color-fg-secondary)]";
  const headlineGradient = heroIsDark ? "text-gradient-dark" : "text-gradient-light";

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════ */}
      <section
        className={`relative overflow-hidden px-6 py-[120px] text-center ${heroBg} ${heroFg}`}
      >
        {/* Brand watermark — collection wordmark fading into the bg */}
        <BrandWatermark
          anchor="bottom-right"
          widthClass="w-[1100px]"
          opacityClass={heroIsDark ? "opacity-[0.05]" : "opacity-[0.06]"}
          toneClass={heroIsDark ? "text-white" : "text-[#34444c]"}
          showWordmark
          wordmark={collection.label.toUpperCase()}
          rotation={-4}
        />

        {/* Atmospheric glow on dark hero */}
        {heroIsDark && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(230,57,70,0.18), transparent 70%)",
            }}
          />
        )}

        <div className="relative z-[1] mx-auto max-w-4xl">
          <Reveal>
            <div
              className={`text-[21px] font-semibold tracking-tight ${
                heroIsDark ? "text-[var(--color-fg-on-dark)]" : "text-[var(--color-fg)]"
              }`}
            >
              {collection.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className={`mt-3 text-[clamp(48px,8vw,112px)] font-bold leading-[0.95] tracking-display ${headlineGradient}`}
            >
              {parseHeadline(collection.headline)}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className={`mx-auto mt-6 max-w-2xl text-[clamp(19px,2vw,24px)] font-normal leading-snug tracking-tight ${heroSubFg}`}
            >
              {collection.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <MagneticButton href="#models" variant="primary">
                See the {collectionProducts.length} model
                {collectionProducts.length > 1 ? "s" : ""}
              </MagneticButton>
              <MagneticButton
                href="/#dealer"
                variant={heroIsDark ? "ghost-light" : "ghost-dark"}
              >
                Become a dealer ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OPTIONAL STORY BAND
          ═══════════════════════════════════════════════ */}
      {collection.story && (
        <section className="bg-[var(--color-bg)] px-6 py-[100px]">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-[clamp(24px,3vw,36px)] font-semibold leading-[1.2] tracking-tight text-[var(--color-fg)]">
                {collection.story}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          MODEL GRID
          ═══════════════════════════════════════════════ */}
      <section id="models" className="bg-[var(--color-bg)] py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          {collectionProducts.map((p) => (
            <ProductTile
              key={p.slug}
              slug={p.slug}
              name={p.name}
              eyebrow={p.collectionLabel}
              tagline={p.tileTagline ?? p.tagline}
              imageSrc={p.imageSrc}
              dark={DARK_TILES.has(p.slug)}
              fullWidth={FULL_WIDTH_TILES.has(p.slug)}
              colors={p.colors}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OTHER COLLECTIONS
          ═══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-[120px]">
        <Reveal>
          <h2 className="text-center text-[clamp(32px,4.5vw,56px)] font-semibold tracking-tight">
            Explore other collections.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {collections
            .filter((c) => c.slug !== slug)
            .map((c, i) => (
              <Reveal key={c.slug} delay={0.05 + i * 0.04}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-[14px] text-[var(--color-fg)] transition-colors hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-white"
                >
                  {c.label} →
                </Link>
              </Reveal>
            ))}
        </div>
      </section>
    </>
  );
}