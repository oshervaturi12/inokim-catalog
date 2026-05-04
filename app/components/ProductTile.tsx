import Link from "next/link";
import Image from "next/image";
import InlineSvg from "./InlineSvg";

interface Color {
  name: string;
  hex: string;
}

interface ProductTileProps {
  slug: string;
  name: string;
  /** Collection label like "Dubai 2026" */
  eyebrow: string;
  /** Two-line tagline. Use \n for line break. */
  tagline: string;
  imageSrc: string;
  /** Path to product logo SVG. Rendered as a watermark behind the product. */
  svg?: string;
  /** Dark background variant for flagship products */
  dark?: boolean;
  /** Spans both columns of the grid */
  fullWidth?: boolean;
  /** Aspect ratio override — accepts CSS aspect-ratio values like "4/5" or "16/8" */
  aspect?: string;
  /** Override the buy button destination */
  buyHref?: string;
  /** Optional color lineup — renders a swatch row when present */
  colors?: Color[];
  /** Coming soon mode — uses the cinematic teaser layout instead of standard tile */
  comingSoon?: boolean;
  /** Release window text shown in the badge, e.g. "Coming Soon", "Q3 2026" */
  releaseWindow?: string;
}

export default function ProductTile({
  slug,
  name,
  eyebrow,
  tagline,
  imageSrc,
  svg,
  dark = false,
  fullWidth = false,
  aspect = "4/5",
  buyHref,
  colors,
  comingSoon = false,
  releaseWindow = "Coming Soon",
}: ProductTileProps) {
  const productHref = `/catalog/${slug}`;
  const finalBuyHref = buyHref ?? productHref;

  console.log(svg)

  // ═══════════════════════════════════════════════════════════
  // COMING SOON — cinematic teaser layout
  // ═══════════════════════════════════════════════════════════
  if (comingSoon) {
    return (
      <article
        className={`group relative h-full w-full overflow-hidden rounded-3xl bg-black transition-transform duration-300 ${
          fullWidth ? "md:col-span-2" : ""
        }`}
        style={{ aspectRatio: aspect }}
      >
        <Link
          href={productHref}
          aria-label={`${name} — coming soon, sneak peek`}
          className="absolute inset-0 z-10"
        />

        {/* Background image — full bleed */}
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes={fullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          priority
        />

        {/* Bottom-to-top dark gradient — protects text legibility over image */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"
        />

        {/* Atmospheric red glow — bottom-left, behind the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-[60%] w-[60%] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(230,57,70,0.35), transparent 70%)",
          }}
        />

        {/* Coming Soon badge — top-left */}
        <div className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-black/40 px-3.5 py-1.5 backdrop-blur-md sm:left-7 sm:top-7 sm:gap-2.5 sm:px-4 sm:py-2">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[11px]">
            {releaseWindow}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-white/20 sm:block" />
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.06em] text-white/60 sm:block sm:text-[11px]">
            {eyebrow}
          </span>
        </div>

        {/* Bottom-aligned content */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 md:p-12 lg:p-14">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-[12px]">
              World&apos;s first
            </div>

            <h3 className="mt-2 text-[clamp(28px,5vw,72px)] font-bold leading-[0.95] tracking-tight text-white sm:mt-3">
              {name.split(" ").map((word, i, arr) => (
                <span key={i} className="block sm:inline">
                  {word}
                  {i < arr.length - 1 && " "}
                </span>
              ))}
            </h3>

            <p className="mt-3 max-w-md text-[clamp(14px,1.5vw,18px)] font-normal leading-snug text-white/70 sm:mt-4">
              {tagline.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && " "}
                </span>
              ))}
            </p>

            {/* CTAs — z-30 so they sit above the overlay link */}
            <div className="relative z-30 mt-5 flex flex-wrap items-center gap-4 sm:mt-7">
              <Link
                href={`${productHref}#notify`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[13px] font-medium text-white transition-all hover:scale-[1.02] hover:bg-[#c12d3b] sm:px-6 sm:py-3 sm:text-[14px]"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-white" />
                <span>Notify me</span>
              </Link>
              <Link
                href={productHref}
                className="group/cta inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90 transition-colors hover:text-white sm:text-[14px]"
              >
                <span>Sneak peek</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover/cta:translate-x-1"
                >
                  ›
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // STANDARD TILE — with optional logo watermark
  // ═══════════════════════════════════════════════════════════

  const bgClass = dark
    ? "bg-[var(--color-bg-dark)]"
    : "bg-[var(--color-bg-section)]";
  const eyebrowColor = dark
    ? "text-[var(--color-fg-secondary-on-dark)]"
    : "text-[var(--color-fg-secondary)]";
  const titleColor = dark
    ? "text-[var(--color-fg-on-dark)]"
    : "text-[var(--color-fg)]";
  const taglineColor = dark
    ? "text-[var(--color-fg-secondary-on-dark)]"
    : "text-[var(--color-fg-secondary)]";
  const learnMoreColor = dark
    ? "text-[var(--color-link-on-dark)]"
    : "text-[var(--color-link)]";

  // Watermark color treatment by tile theme.
  // Dark tile = soft white glow. Light tile = debossed dark tone (like watermarked
  // stationery) — counter-intuitive, but white-on-cream looks like a sticker.
  const watermarkStyle = dark
    ? { color: "#ffffff", opacity: 0.085 }
    : { color: "#1a1a1a", opacity: 0.055 };

  return (
    <article
      className={`group relative h-full w-full overflow-hidden rounded-3xl transition-transform duration-300 hover:scale-[0.995] ${bgClass} ${
        fullWidth ? "md:col-span-2" : ""
      }`}
      style={{ aspectRatio: aspect }}
    >
      {/* Whole-tile clickable overlay (z-10) — sits BELOW the action buttons */}
      <Link
        href={productHref}
        aria-label={`${name} — learn more`}
        className="absolute inset-0 z-10"
      />

      {/* ─── LOGO WATERMARK ───
        Sits in the lower 78% of the tile, behind the product image, in front
        of the background. The product image (z-[1]) sits IN FRONT of this —
        the silhouette of the scooter cuts through the logo cleanly.

        Implementation note: we inline the SVG (via InlineSvg) rather than
        using <img>, because we need `currentColor` to flow through the
        stroke and `opacity` to apply to the whole mark — both impossible
        when an SVG is loaded as an image. */}
      {svg && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 z-[0] -translate-x-1/2 flex items-center justify-center"
          style={{
            bottom: "6%",
            width: "78%",
            aspectRatio: "1 / 1",
            color: watermarkStyle.color,
            opacity: watermarkStyle.opacity,
          }}
        >
          <InlineSvg src={svg} className="h-full w-full" />
        </div>
      )}

      {/* Top content (z-20, above overlay) */}
      <div className="relative z-20 px-6 pt-12 text-center sm:px-8 sm:pt-14">
        <div
          className={`text-xs font-semibold uppercase tracking-wider ${eyebrowColor}`}
        >
          {eyebrow}
        </div>

        <h3
          className={`mt-1 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] tracking-tight ${titleColor}`}
        >
          {name}
        </h3>

        <p
          className={`mt-2 text-[clamp(15px,1.5vw,18px)] font-normal ${taglineColor}`}
        >
          {tagline.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* Action buttons — z-30 ensures they receive clicks before overlay */}
        <div className="relative z-30 mt-4 flex flex-wrap items-center justify-center gap-4 text-[15px]">
          <Link
            href={finalBuyHref}
            className="rounded-sm bg-[var(--color-link)] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-link-hover)]"
          >
            Request a dealer quote
          </Link>
          <Link
            href={productHref}
            className={`text-[14px] transition-colors hover:underline ${learnMoreColor}`}
          >
            Learn more ›
          </Link>
        </div>

        {/* Color swatches — only rendered when product has colors */}
        {colors && colors.length > 0 && (
          <div
            className="mt-5 flex items-center justify-center gap-2"
            aria-label={`${colors.length} colors available`}
          >
            {colors.map((c) => {
              const hex = c.hex.toLowerCase();
              const isLight =
                hex === "#ffffff" || hex === "#f5f5f5" || hex === "#fafafa";
              return (
                <span
                  key={c.name}
                  title={c.name}
                  className={`size-3 rounded-full ${
                    isLight ? "ring-1 ring-black/10" : ""
                  }`}
                  style={{ background: c.hex }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Product image — bottom-anchored, IN FRONT of the watermark.
        pointer-events disabled so the overlay link (z-10) receives clicks here. */}
      <div
        className={`pointer-events-none absolute bottom-12 left-1/2 z-[1] -translate-x-1/2 ${
          fullWidth ? "h-[55%] w-[60%]" : "h-[55%] w-[88%]"
        }`}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
          sizes={
            fullWidth
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />
      </div>
    </article>
  );
}