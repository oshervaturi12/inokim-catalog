import Link from "next/link";
import Image from "next/image";

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
}

export default function ProductTile({
  slug,
  name,
  eyebrow,
  tagline,
  imageSrc,
  dark = false,
  fullWidth = false,
  aspect = "4/5",
  buyHref,
  colors,
}: ProductTileProps) {
  const productHref = `/catalog/${slug}`;
  const finalBuyHref = buyHref ?? productHref;

  const bgClass = dark ? "bg-[var(--color-bg-dark)]" : "bg-[var(--color-bg-section)]";
  const eyebrowColor = dark
    ? "text-[var(--color-fg-secondary-on-dark)]"
    : "text-[var(--color-fg-secondary)]";
  const titleColor = dark ? "text-[var(--color-fg-on-dark)]" : "text-[var(--color-fg)]";
  const taglineColor = dark
    ? "text-[var(--color-fg-secondary-on-dark)]"
    : "text-[var(--color-fg-secondary)]";
  const learnMoreColor = dark
    ? "text-[var(--color-link-on-dark)]"
    : "text-[var(--color-link)]";

  return (
    <article
      className={`group h-full w-full relative overflow-hidden rounded-3xl transition-transform duration-300 hover:scale-[0.995] ${bgClass} ${
        fullWidth ? "md:col-span-2" : ""
      }`}
      style={{ aspectRatio: aspect }}
    >
      <Link
        href={productHref}
        aria-label={`${name} — learn more`}
        className="absolute inset-0 z-10"
      />

      <div className="relative z-20 px-6 pt-12 text-center sm:px-8 sm:pt-14">
        <div className={`text-xs font-semibold uppercase tracking-wider ${eyebrowColor}`}>
          {eyebrow}
        </div>

        <h3
          className={`mt-1 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] tracking-tight ${titleColor}`}
        >
          {name}
        </h3>

        <p className={`mt-2 text-[clamp(15px,1.5vw,18px)] flex items-center justify-center gap-2 font-normal ${taglineColor}`}>
          {tagline.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </p>

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

        {colors && colors.length > 0 && (
          <div
            className="mt-5 flex items-center justify-center gap-2"
            aria-label={`${colors.length} colors available`}
          >
            {colors.map((c) => {
              const hex = c.hex.toLowerCase();
              const isLight = hex === "#ffffff" || hex === "#f5f5f5" || hex === "#fafafa";
              return (
                <span
                  key={c.name}
                  title={c.name}
                  className={`size-6 rounded-full ${isLight ? "ring-1 ring-black/10" : ""}`}
                  style={{ background: c.hex }}
                />
              );
            })}
          </div>
        )}
      </div>

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
          sizes={fullWidth ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
        />
      </div>
    </article>
  );
}