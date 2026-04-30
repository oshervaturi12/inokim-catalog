import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ProductHero from "@/app/components/ProductHero";
import ProductSubnav from "@/app/components/ProductSubnav";
import FeatureBand from "@/app/components/FeatureBand";
import SpecGrid from "@/app/components/SpecGrid";
import ColorSwatch from "@/app/components/ColorSwatch";
import DealerForm from "@/app/components/DealerForm";
import MegaCta from "@/app/components/MegaCta";
import Reveal from "@/app/components/Reveal";
import Scooter3DLazy from "@/app/components/Scooter3dlazy";
import { products, getProduct } from "@/app/lib/products";

interface PageProps {
  params: Promise<{ model: string }>;
}

const DARK_HERO_SLUGS = new Set(["oxo-dubai", "oxo-carbon"]);

// ─── Static generation ──────────────────────────────────────
// Coming-soon products have their own dedicated routes (e.g. /catalog/oxo-bike-dubai)
// so we exclude them here to avoid generating an empty page from this template.
export function generateStaticParams() {
  return products.filter((p) => !p.comingSoon).map((p) => ({ model: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { model } = await params;
  const product = getProduct(model);
  if (!product) return { title: "Not found" };

  const description = product.description ?? product.headline ?? product.tagline;

  return {
    title: `${product.name} — Inokim 2026`,
    description,
    openGraph: {
      title: `${product.name} — Inokim 2026`,
      description,
      images: [{ url: product.imageSrc }],
      type: "website",
    },
  };
}

// ─── Page ───────────────────────────────────────────────────
export default async function ProductPage({ params }: PageProps) {
  const { model } = await params;
  const product = getProduct(model);
  if (!product) notFound();

  // Coming-soon products are served from dedicated routes, e.g. /catalog/oxo-bike-dubai/page.tsx.
  // Next gives priority to the static route, but if someone reaches this branch we redirect defensively.
  if (product.comingSoon) {
    redirect(`/catalog/${product.slug}`);
  }

  const heroTheme = DARK_HERO_SLUGS.has(product.slug) ? "dark" : "section";

  // Subnav sections — only show ones that exist on this page
  const subnavSections = [
    { id: "features", label: "Features" },
    { id: "specs", label: "Specs" },
    { id: "pricing", label: "Pricing" },
  ];

  // Spec groups for the SpecGrid
  const specGroups = [
    { title: "Performance", specs: product.specs.power },
    { title: "Build", specs: product.specs.build },
    { title: "Smart", specs: product.specs.smart },
    { title: "B2B", specs: product.specs.logistics },
  ].filter((g) => g.specs.length > 0);

  // Related products: same collection first, then everything else.
  // Dedupe by slug and exclude both the current product and any coming-soon products
  // (they have a dedicated route and shouldn't appear in regular tile rows).
  const sameCollection = products.filter(
    (p) =>
      p.collection === product.collection &&
      p.slug !== product.slug &&
      !p.comingSoon,
  );
  const otherProducts = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.collection !== product.collection &&
      !p.comingSoon,
  );
  const related = [...sameCollection, ...otherProducts].slice(0, 3);

  return (
    <>
      {/* Sticky product subnav */}
      <ProductSubnav productName={product.name} sections={subnavSections} />

      {/* HERO */}
      <ProductHero
        name={product.name}
        collection={product.collectionLabel}
        headline={product.headline ?? product.tagline}
        subhead={product.description}
        imageSrc={product.imageSrc}
        highlights={product.highlights}
        theme={heroTheme}
        heroSlot={
          product.use3D ? (
            <Scooter3DLazy
              modelSrc={product.model3DSrc}
              toneMode={heroTheme === "dark" ? "dark" : "light"}
            />
          ) : undefined
        }
      />

      {/* COLOR LINEUP — only if product has colors */}
      {product.colors && product.colors.length > 0 && (
        <section className="bg-[var(--color-bg)] px-6 py-[120px]">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="text-[28px] font-semibold leading-tight tracking-tight text-[var(--color-fg-secondary)]">
                {product.colors.length} colors
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-2 text-[clamp(40px,6.5vw,80px)] font-bold leading-[1.05] tracking-tight">
                Pick your favorite.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-[clamp(17px,1.6vw,21px)] text-[var(--color-fg-secondary)]">
                The {product.name} comes in {product.colors.length} bold finishes. Same chassis, distinct character.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12">
                <ColorSwatch colors={product.colors} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FEATURE BANDS — anchor for subnav */}
      <div id="features">
        {product.features?.map((f, i) => (
          <FeatureBand
            key={i}
            eyebrow={f.eyebrow}
            title={f.title}
            subtitle={f.description}
            imageSrc={f.imageSrc ?? product.imageSrc}
            imageAlt={`${product.name} — ${f.eyebrow}`}
            theme={f.theme ?? "section"}
            layout={f.layout ?? "stacked"}
            parallax={f.parallax}
          />
        ))}
      </div>

      {/* TECH SPECS */}
      <SpecGrid groups={specGroups} />

      {/* MEGA CTA — "Stock the flagship" moment */}
      <MegaCta
        eyebrow="For distributors"
        title={`Stock the\n{accent:${product.name.split(" ")[0].toLowerCase()}}.`}
        subtitle="One distributor per territory. MOQ: 1 × 20ft mixed container. Lead time 35–45 days from deposit. Reach out for FOB pricing tailored to your market."
        primaryCta={{ label: "Request a quote", href: "#dealer-form" }}
        secondaryCta={{
          label: "sales@inokim.com",
          href: "mailto:sales@inokim.com",
          external: true,
        }}
      />

      {/* DEALER FORM */}
      <DealerForm productName={product.name} />

      {/* CONTINUE EXPLORING */}
      <section className="mx-auto max-w-7xl px-6 py-[120px]">
        <Reveal>
          <h2 className="text-center text-[clamp(32px,4.5vw,56px)] font-semibold tracking-tight">
            Continue exploring.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => (
            <Reveal
              key={r.slug}
              delay={0.05 + i * 0.05}
              className="aspect-[4/5]"
            >
              <Link
                href={`/catalog/${r.slug}`}
                className="group relative block h-full overflow-hidden rounded-[28px] bg-[var(--color-bg-section)] transition-transform duration-500 ease-out hover:scale-[0.992]"
              >
                <div className="relative z-[2] px-7 pt-12 text-center">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                    {r.collectionLabel}
                  </div>
                  <h3 className="mt-1.5 text-[clamp(28px,3vw,36px)] font-semibold leading-[1.07] tracking-tight">
                    {r.name}
                  </h3>
                  <p className="mt-2 text-[15px] text-[var(--color-fg-secondary)]">
                    {r.tagline}
                  </p>
                  <div className="mt-3.5 text-[13px] text-[var(--color-link)]">
                    Learn more ›
                  </div>
                </div>
                <div className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-[50%] w-[88%] -translate-x-1/2">
                  <Image
                    src={r.imageSrc}
                    alt={r.name}
                    fill
                    className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}