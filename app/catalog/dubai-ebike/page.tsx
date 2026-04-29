import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import BrandWatermark from "@/app/components/BrandWatermark";
import {
  DevicePhoneMobileIcon,
  MapIcon,
  BoltIcon,
  GlobeAltIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "DUBAI ebike — Coming Soon | Inokim 2026",
  description:
    "The world's first e-bike with built-in Apple CarPlay. A new category for Inokim. Distribution priority for existing partners. Coming soon.",
  openGraph: {
    title: "DUBAI ebike — Coming Soon",
    description:
      "The world's first e-bike with built-in CarPlay. Dubai Collection.",
    type: "website",
  },
};

const HIGHLIGHTS = [
  {
    icon: DevicePhoneMobileIcon,
    label: "Native CarPlay",
    desc: "Real Apple CarPlay, not a phone mount. Built into the dashboard.",
  },
  {
    icon: MapIcon,
    label: "Maps & Navigation",
    desc: "Apple Maps and Waze on the e-bike's screen — eyes on the road.",
  },
  {
    icon: BoltIcon,
    label: "E-Bike class",
    desc: "Inokim's first e-bike. New category. Same engineering DNA.",
  },
  {
    icon: GlobeAltIcon,
    label: "B2B priority",
    desc: "Existing distributors get priority allocation. Limited first run.",
  },
];

export default function DubaiEbikeComingSoonPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          1. CINEMATIC HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-darker)] px-4 py-24 text-center text-[var(--color-fg-on-dark)] sm:px-6 sm:py-0">
        <BrandWatermark
          anchor="bottom-right"
          widthClass="w-[800px] sm:w-[1000px] lg:w-[1400px]"
          opacityClass="opacity-[0.05]"
          toneClass="text-white"
          showWordmark
          wordmark="DUBAI"
          rotation={-6}
        />

        {/* Atmospheric red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 blur-3xl sm:h-[700px] sm:w-[min(1100px,90vw)]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(230,57,70,0.22), transparent 70%)",
          }}
        />

        <div className="relative z-[2] w-full max-w-5xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/15 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-sm bg-[var(--color-accent)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-[12px]">
                Coming Soon · Dubai Collection
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-[clamp(40px,9vw,128px)] font-bold leading-[0.95] tracking-display-tight text-gradient-dark sm:mt-8 sm:leading-[0.88]">
              <span className="block">The world&apos;s first</span>
              <span className="block">e-bike with built-in</span>
              <span className="block">
                <span className="text-gradient-accent">CarPlay</span>.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(16px,2.4vw,28px)] font-normal leading-snug tracking-tight text-[var(--color-fg-secondary-on-dark)] sm:mt-8">
              A new category for Inokim. The first e-bike engineered around Apple CarPlay — your iPhone&apos;s dashboard, on two wheels.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10">
              {/* Primary CTA — download the brochure PDF */}
              <a
                href="/inokim.pdf"
                download="inokim-dubai-ebike-brochure.pdf"
                className="group/dl inline-flex items-center gap-3 rounded-sm bg-[var(--color-accent)] px-7 py-4 text-[14px] font-medium text-white shadow-[0_8px_30px_rgba(230,57,70,0.4)] transition-all hover:scale-[1.04] hover:bg-[#c12d3b] hover:shadow-[0_12px_40px_rgba(230,57,70,0.6)] sm:px-8 sm:text-[15px]"
                aria-label="Download the DUBAI ebike brochure as PDF"
              >
                <ArrowDownTrayIcon className="size-4 transition-transform duration-300 group-hover/dl:translate-y-0.5 sm:size-[18px]" />
                <span>Download the brochure</span>
              </a>

              {/* Secondary file metadata — sets expectations like a luxury brand would */}
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40 sm:text-[12px]">
                <span>PDF</span>
                <span aria-hidden className="size-1 rounded-sm bg-white/20" />
                <span>Coming-soon edition</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. TEASER IMAGE
          ═══════════════════════════════════════════════ */}
      <section
        id="story"
        className="bg-[var(--color-bg-darker)] px-4 py-16 sm:px-6 sm:py-[80px] lg:py-[120px]"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal variant="image">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-black sm:aspect-[4/3] lg:aspect-[16/10]">
              <Image
                src="/products/dubai-ebike-teaser.jpeg"
                alt="DUBAI ebike — coming soon"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. WHAT WE'RE TEASING
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-darker)] px-4 py-20 text-[var(--color-fg-on-dark)] sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
                What we&apos;re teasing
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                A bike that thinks like{" "}
                <span className="text-gradient-accent">your iPhone</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] text-[var(--color-fg-secondary-on-dark)] sm:mt-6 sm:text-[19px]">
                Full specs, pricing, and dealer terms drop closer to launch. Here&apos;s what we&apos;re willing to show now.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 md:gap-6">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon;
              return (
                <Reveal key={h.label} delay={0.1 + i * 0.05}>
                  <div className="h-full rounded-sm border border-white/10 bg-white/[0.03] p-7 sm:p-9">
                    <div className="flex size-12 items-center justify-center rounded-sm bg-white/10">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-6 text-[clamp(20px,2vw,26px)] font-semibold leading-[1.2] tracking-tight">
                      {h.label}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-fg-secondary-on-dark)] sm:text-[15px]">
                      {h.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. CONTEXT BAND — why this matters
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
              Why this matters
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
              Inokim is a scooter brand. Until now.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-[var(--color-fg-secondary)] sm:mt-10 sm:text-[18px]">
              <p>
                For sixteen years, Inokim has refined one platform — the folding electric scooter. The Quick⁴, the OX, the OXO, the KIX. Same DNA, different scale.
              </p>
              <p>
                <span className="font-medium text-[var(--color-fg)]">
                  The DUBAI ebike is the first time we&apos;ve stepped outside.
                </span>{" "}
                Same engineering team. Same factory in Ningbo. Same Tel Aviv design rigor. New category.
              </p>
              <p>
                And we&apos;re not entering quietly. Apple CarPlay isn&apos;t a phone-mount accessory — it&apos;s native, built into the dashboard. The first e-bike that thinks like the device in your pocket.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. NOTIFY-ME / DISTRIBUTOR PRIORITY CTA
          ═══════════════════════════════════════════════ */}
      <section
        id="notify"
        className="relative overflow-hidden bg-[var(--color-bg-darker)] px-4 py-24 text-center text-[var(--color-fg-on-dark)] sm:px-6 sm:py-[120px] lg:py-[160px]"
      >
        <BrandWatermark
          anchor="left-edge"
          widthClass="w-[600px] sm:w-[900px]"
          opacityClass="opacity-[0.04]"
          toneClass="text-white"
          showWordmark={false}
          rotation={8}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 700px 500px at 50% 50%, rgba(230,57,70,0.18), transparent 70%)",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/15 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-sm bg-[var(--color-accent)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-[12px]">
                For distributors
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(36px,7vw,96px)] font-bold leading-[0.95] tracking-display sm:mt-8">
              Be the first{" "}
              <span className="text-gradient-accent">to stock it</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary-on-dark)] sm:mt-6 sm:text-[19px]">
              Existing Inokim distributors get priority allocation. New territory inquiries open. Limited first production run.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              action="/api/dealer-inquiry"
              method="POST"
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              {/* Hidden fields to use the existing dealer-inquiry endpoint */}
              <input type="hidden" name="product" value="DUBAI ebike" />
              <input type="hidden" name="units" value="20" />
              <input type="hidden" name="company" value="(notify-me signup)" />
              <input type="hidden" name="fullName" value="(notify-me signup)" />
              <input type="hidden" name="phone" value="—" />
              <input type="hidden" name="country" value="—" />
              <input type="hidden" name="message" value="DUBAI ebike launch notification request" />
              <input type="hidden" name="consent" value="on" />

              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-sm border border-white/15 bg-white/[0.05] px-5 py-3 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[var(--color-accent)]"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-sm bg-[var(--color-accent)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#c12d3b]"
              >
                Notify me
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-5">
              <Link
                href="/#dealer"
                className="text-[13px] font-medium text-[var(--color-fg-on-dark)] underline-offset-4 hover:underline sm:text-[14px]"
              >
                Existing distributor? Use the dealer form ›
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}