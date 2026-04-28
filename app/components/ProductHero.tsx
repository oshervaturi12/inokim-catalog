

import Image from "next/image";
import { type ReactNode } from "react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import Tilt3D from "./Tilt3d";

interface HighlightSpec {
  label: string;
  value: string;
}

interface ProductHeroProps {
  name: string;
  collection: string;
  /** Short headline displayed under collection eyebrow. Can include `{accent: text}` for red gradient emphasis. */
  headline: string;
  /** Optional longer description shown beneath the headline */
  subhead?: string;
  imageSrc: string;
  /** 4-stat strip below the image */
  highlights?: HighlightSpec[];
  theme?: "light" | "section" | "dark";
  /** Optional custom slot to replace the product image — pass <Scooter3D /> here for flagship pages */
  heroSlot?: ReactNode;
  /** Disable the cursor tilt on the default image (e.g. when heroSlot brings its own interaction) */
  disableTilt?: boolean;
}

const themes = {
  light: {
    bg: "bg-[var(--color-bg)]",
    eyebrow: "text-[var(--color-fg)]",
    headline: "text-gradient-light",
    sub: "text-[var(--color-fg-secondary)]",
    glow: false,
    statValue: "text-[var(--color-fg)]",
    statLabel: "text-[var(--color-fg-secondary)]",
    border: "border-black/[0.05]",
  },
  section: {
    bg: "bg-[var(--color-bg-section)]",
    eyebrow: "text-[var(--color-fg)]",
    headline: "text-gradient-light",
    sub: "text-[var(--color-fg-secondary)]",
    glow: false,
    statValue: "text-[var(--color-fg)]",
    statLabel: "text-[var(--color-fg-secondary)]",
    border: "border-black/[0.06]",
  },
  dark: {
    bg: "bg-[var(--color-bg-darker)]",
    eyebrow: "text-[var(--color-fg-on-dark)]",
    headline: "text-gradient-dark",
    sub: "text-[var(--color-fg-secondary-on-dark)]",
    glow: true,
    statValue: "text-[var(--color-fg-on-dark)]",
    statLabel: "text-[var(--color-fg-secondary-on-dark)]",
    border: "border-white/[0.08]",
  },
};

/**
 * Parses simple syntax `{accent:text}` and wraps in red-gradient span.
 * Example input:  "Two motors. {accent:2,600 watts} of force."
 */
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

export default function ProductHero({
  name,
  collection,
  headline,
  subhead,
  imageSrc,
  highlights,
  theme = "section",
  heroSlot,
  disableTilt = false,
}: ProductHeroProps) {
  const t = themes[theme];

  return (
    <section
      className={`relative flex min-h-[92vh] flex-col overflow-hidden px-6 pt-16 text-center ${t.bg}`}
    >
      {/* Atmospheric glow (dark theme only) */}
      {t.glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[12%] left-1/2 z-0 h-[400px] w-[min(900px,90vw)] -translate-x-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(230,57,70,0.18), transparent 70%)",
          }}
        />
      )}

      {/* Top content */}
      <div className="relative z-[2]">
        <Reveal>
          <div className={`text-[21px] font-semibold tracking-tight ${t.eyebrow}`}>
            {collection}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className={`mt-1.5 text-[clamp(56px,9vw,124px)] font-bold leading-[0.92] tracking-display ${t.headline}`}
          >
            {name}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className={`mx-auto mt-4 max-w-3xl text-[clamp(21px,2.4vw,32px)] font-normal leading-snug tracking-tight ${t.sub}`}
          >
            {parseHeadline(headline)}
          </p>
        </Reveal>

        {subhead && (
          <Reveal delay={0.25}>
            <p
              className={`mx-auto mt-3 max-w-xl text-[17px] ${t.sub}`}
            >
              {subhead}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.3}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <MagneticButton href="#dealer-form" variant="primary">
              Request quote
            </MagneticButton>
            <MagneticButton
              href="#features"
              variant={theme === "dark" ? "ghost-light" : "ghost-dark"}
            >
              Learn more ›
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      {/* Hero product image (or custom slot like <Scooter3D />) */}
      <div className="relative z-[1] mt-8 flex flex-1 items-end justify-center pb-8">
        <Reveal variant="image" delay={0.4} className="relative w-full max-w-5xl">
          <div className="relative aspect-[16/9] w-full">
            {heroSlot ? (
              heroSlot
            ) : disableTilt ? (
              <Image
                src={imageSrc}
                alt={name}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 1100px"
                className={`object-contain ${
                  t.glow ? "drop-shadow-[0_30px_60px_rgba(230,57,70,0.25)]" : ""
                }`}
              />
            ) : (
              <Tilt3D intensity={8} lift={20} className="h-full w-full">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className={`object-contain ${
                    t.glow ? "drop-shadow-[0_30px_60px_rgba(230,57,70,0.25)]" : ""
                  }`}
                />
              </Tilt3D>
            )}
          </div>
        </Reveal>
      </div>

      {/* Highlights strip */}
      {highlights && highlights.length > 0 && (
        <div
          className={`relative z-[2] border-t ${t.border} pb-12 pt-8`}
        >
          <Reveal delay={0.5}>
            <ul className="mx-auto grid max-w-[880px] grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((h) => (
                <li key={h.label} className="text-center">
                  <div
                    className={`text-[clamp(28px,3.5vw,44px)] font-semibold leading-none tracking-tight ${t.statValue}`}
                  >
                    {h.value}
                  </div>
                  <div
                    className={`mt-1.5 text-[12px] font-normal ${t.statLabel}`}
                  >
                    {h.label}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}
    </section>
  );
}