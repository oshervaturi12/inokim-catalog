import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import MagneticButton from "@/app/components/MagneticButton";
import BrandWatermark from "@/app/components/BrandWatermark";
import {
  TrophyIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CubeIcon,
  ArrowsPointingOutIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  PhotoIcon,
  SwatchIcon,
  UsersIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Press & Media — Inokim 2026",
  description:
    "Press coverage, brand assets, and media contacts. Inokim has been featured in ISRAEL21c, awarded by Red Dot, and chronicled across the global micro-mobility press.",
  openGraph: {
    title: "Press & Media — Inokim",
    description:
      "Press kit, coverage, and media contacts for Inokim — the world's original folding e-scooter brand.",
    type: "website",
  },
};

/* ─── Featured coverage — bigger story cards ─── */
const FEATURED = [
  {
    publication: "ISRAEL21c",
    headline: "Folding e-scooter is shaping the future of urban transport",
    excerpt:
      "Behind the buzz around driverless vehicles and ride-sharing apps, two Israeli men separately sensed the need for a light urban mobility alternative.",
    date: "December 2016",
    href: "https://israel21c.org/folding-e-scooter-is-shaping-the-future-of-urban-transport/",
    eyebrow: "Origin",
  },
  {
    publication: "Red Dot Design Award",
    headline: "OX scooter receives the Red Dot Design Award",
    excerpt:
      "Inokim's OX is recognized for its industrial design and the patented OSAP adjustable dual suspension system. The award places Inokim among the most awarded micro-mobility brands.",
    date: "2018",
    href: "https://www.red-dot.org/",
    eyebrow: "Award",
  },
  {
    publication: "ISRAEL21c",
    headline: "Tel Aviv's scooter craze, explained by the guy behind it",
    excerpt:
      "ISRAEL21c interviews Nimrod Sapir on how electric scooters became Tel Aviv's defining transportation mode — and the global future he sees for last-mile mobility.",
    date: "August 2019",
    href: "https://israel21c.org/tel-avivs-scooter-craze-explained-by-the-guy-behind-it/",
    eyebrow: "Founder interview",
  },
  {
    publication: "Globes / PR Newswire",
    headline: "Inokim e-scooters ride towards an IPO",
    excerpt:
      "Inokim is the only e-scooter manufacturer that owns and operates its entire value chain. Big Shopping Centers takes a 20% stake in early 2020.",
    date: "May 2021",
    href: "https://www.prnewswire.com/il/news-releases/inokim-e-scooters-ride-towards-an-ipo-301289002.html",
    eyebrow: "Business",
  },
];

/* ─── Full coverage list — chronological newest-first ─── */
const COVERAGE = [
  {
    date: "August 2023",
    publication: "Electric Kicks",
    headline: "The Ultimate Guide to Inokim Electric Scooters",
    href: "https://www.electrickicks.com.au/blogs/escooters/the-ultimate-guide-to-inokim-electric-scooters-2023",
  },
  {
    date: "May 2021",
    publication: "PR Newswire",
    headline: "Inokim e-scooters ride towards an IPO",
    href: "https://www.prnewswire.com/il/news-releases/inokim-e-scooters-ride-towards-an-ipo-301289002.html",
  },
  {
    date: "August 2019",
    publication: "ISRAEL21c",
    headline: "Tel Aviv's scooter craze, explained by the guy behind it",
    href: "https://israel21c.org/tel-avivs-scooter-craze-explained-by-the-guy-behind-it/",
  },
  {
    date: "March 2017",
    publication: "ZERO Electric Scooters",
    headline: "Conversations with Nimrod Sapir, Founder of Inokim",
    href: "https://zeroelectricscooter.com/blogs/news/conversations-with-nimrod-sapir-founder-of-inokim",
  },
  {
    date: "December 2016",
    publication: "ISRAEL21c",
    headline: "Folding e-scooter is shaping the future of urban transport",
    href: "https://israel21c.org/folding-e-scooter-is-shaping-the-future-of-urban-transport/",
  },
  {
    date: "2018",
    publication: "Red Dot Design Award",
    headline: "OX scooter — Red Dot Award winner",
    href: "https://www.red-dot.org/",
  },
];

/* ─── Press kit assets ─── */
const PRESS_KIT = [
  {
    icon: SwatchIcon,
    title: "Brand logos",
    desc: "SVG and PNG. Light, dark, and monochrome variants.",
    cta: "Download (.zip)",
    href: "/press-kit/inokim-logos.zip",
    size: "2.4 MB",
  },
  {
    icon: PhotoIcon,
    title: "Product photography",
    desc: "Hi-res transparent PNGs of the entire 2026 lineup.",
    cta: "Download (.zip)",
    href: "/press-kit/inokim-2026-product-photos.zip",
    size: "84 MB",
  },
  {
    icon: DocumentTextIcon,
    title: "Fact sheet & spec sheets",
    desc: "Two-page company overview plus per-model spec PDFs.",
    cta: "Download (.zip)",
    href: "/press-kit/inokim-fact-sheet.zip",
    size: "6 MB",
  },
  {
    icon: UsersIcon,
    title: "Executive bios & headshots",
    desc: "Founder and management team bios with approved press photos.",
    cta: "Download (.zip)",
    href: "/press-kit/inokim-executives.zip",
    size: "12 MB",
  },
];

const AWARDS = [
  { icon: TrophyIcon, label: "Red Dot Design Award" },
  { icon: ShieldCheckIcon, label: "UL 2272 Certified" },
  { icon: GlobeAltIcon, label: "30+ Countries" },
  { icon: ArrowsPointingOutIcon, label: "Patented OSAP Suspension" },
  { icon: CubeIcon, label: "First brushless folding e-scooter (2009)" },
];

export default function PressPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--color-bg-section)] px-4 py-24 text-center sm:px-6 sm:py-[120px] lg:py-[160px]">
        <BrandWatermark
          anchor="bottom-right"
          widthClass="w-[800px] sm:w-[1100px]"
          opacityClass="opacity-[0.05]"
          toneClass="text-[#34444c]"
          showWordmark={false}
          rotation={-6}
        />

        <div className="relative z-[1] mx-auto max-w-4xl">
          <Reveal>
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-secondary)] sm:text-[14px]">
              Press & Media
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-4 text-[clamp(40px,8vw,128px)] font-bold leading-[0.95] tracking-display sm:mt-5">
              Stories,{" "}
              <span className="text-gradient-accent">awards</span>, and assets.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(17px,2.2vw,24px)] font-normal leading-snug tracking-tight text-[var(--color-fg-secondary)] sm:mt-8">
              Featured in <strong className="text-[var(--color-fg)]">ISRAEL21c</strong>, awarded by <strong className="text-[var(--color-fg)]">Red Dot</strong>, chronicled across the global micro-mobility press. Everything a journalist needs in one place.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <MagneticButton href="#press-kit" variant="primary">
                Download press kit
              </MagneticButton>
              <MagneticButton href="#coverage" variant="ghost-dark">
                See coverage ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. FEATURED COVERAGE
          ═══════════════════════════════════════════════ */}
      <section id="coverage" className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                Featured coverage
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                The{" "}
                <span className="text-gradient-accent">stories</span> that shaped the brand.
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 md:gap-6">
            {FEATURED.map((c, i) => (
              <Reveal key={c.headline} delay={0.05 + i * 0.05}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-3xl bg-[var(--color-bg-section)] p-7 transition-colors hover:bg-[var(--color-border-light)] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-accent)]">
                      {c.eyebrow}
                    </div>
                    <ArrowUpRightIcon className="size-5 text-[var(--color-fg-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-fg)]" />
                  </div>

                  <div className="mt-6 text-[12px] font-medium tracking-tight text-[var(--color-fg-secondary)]">
                    {c.publication} · {c.date}
                  </div>

                  <h3 className="mt-2 text-[clamp(20px,2vw,26px)] font-semibold leading-[1.2] tracking-tight">
                    {c.headline}
                  </h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-fg-secondary)] sm:text-[15px]">
                    {c.excerpt}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. FULL COVERAGE LIST
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-section)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                All coverage
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(28px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
                Every mention.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 sm:mt-16">
              {COVERAGE.map((c) => (
                <a
                  key={`${c.publication}-${c.headline}`}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-[var(--color-border-light)] py-5 transition-colors hover:border-[var(--color-border)] last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex-shrink-0 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:w-32">
                        {c.date}
                      </div>
                      <div className="text-[13px] font-medium tracking-tight text-[var(--color-fg-secondary)] sm:w-48 sm:flex-shrink-0">
                        {c.publication}
                      </div>
                      <div className="truncate text-[14px] font-medium tracking-tight text-[var(--color-fg)] sm:text-[15px]">
                        {c.headline}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRightIcon className="size-4 flex-shrink-0 text-[var(--color-fg-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-fg)]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. PRESS KIT
          ═══════════════════════════════════════════════ */}
      <section id="press-kit" className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                Press kit
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                Everything you need.{" "}
                <span className="text-gradient-accent">In one place.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
                Logos, photos, fact sheets, executive bios. Free to use with attribution.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 md:gap-6">
            {PRESS_KIT.map((kit, i) => {
              const Icon = kit.icon;
              return (
                <Reveal key={kit.title} delay={0.05 + i * 0.05}>
                  <a
                    href={kit.href}
                    download
                    className="group flex h-full items-start gap-5 rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-bg-section)] p-7 transition-colors hover:border-[var(--color-fg)] sm:p-8"
                  >
                    <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-fg)]">
                      <Icon className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[clamp(18px,2vw,22px)] font-semibold leading-[1.2] tracking-tight">
                        {kit.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-fg-secondary)]">
                        {kit.desc}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[13px] font-medium text-[var(--color-link)] transition-colors group-hover:text-[var(--color-link-hover)]">
                        <ArrowDownTrayIcon className="size-4" />
                        <span>{kit.cta}</span>
                        <span className="text-[var(--color-fg-tertiary)]">· {kit.size}</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <p className="mt-10 text-center text-[13px] text-[var(--color-fg-secondary)]">
              Need something specific?{" "}
              <a
                href="mailto:press@inokim.com"
                className="text-[var(--color-link)] hover:underline"
              >
                Email our PR team
              </a>
              {" — "}
              we&apos;ll send custom assets within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. AWARDS STRIP
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-section)] px-4 py-16 text-center sm:px-6 sm:py-[80px] lg:py-[100px]">
        <Reveal>
          <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
            Recognition
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(24px,4vw,40px)] font-bold leading-[1.1] tracking-tight">
            Awarded for design.{" "}
            <span className="text-gradient-accent">Trusted by riders.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:mt-10 sm:gap-x-8">
            {AWARDS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[13px] font-semibold tracking-tight text-[var(--color-fg)] sm:text-[15px]"
                >
                  <Icon className="size-4 text-[var(--color-fg-secondary)]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════
          6. MEDIA CONTACT
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                Media contact
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
                Working on a story?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[18px]">
                Our PR team responds to all media inquiries within one business day. Interview requests, product loaners, and custom photography on request.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-3xl bg-[var(--color-bg-section)] p-8 sm:mt-16 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                    Press inquiries
                  </div>
                  <div className="mt-2 text-[clamp(20px,2vw,24px)] font-semibold tracking-tight text-[var(--color-fg)]">
                    Inokim PR Team
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--color-fg-secondary)] sm:text-[14px]">
                    Tel Aviv · Available Mon–Fri, 9:00–18:00 IDT
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-shrink-0">
                  <a
                    href="mailto:press@inokim.com"
                    className="flex items-center gap-2 rounded-full bg-[var(--color-link)] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-link-hover)]"
                  >
                    <EnvelopeIcon className="size-4" />
                    <span>press@inokim.com</span>
                  </a>
                  <a
                    href="tel:+97233741200"
                    className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-fg)]"
                  >
                    <PhoneIcon className="size-4" />
                    <span>+972 3 374 1200</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. DEALER CTA
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--color-bg-darker)] px-4 py-24 text-center text-[var(--color-fg-on-dark)] sm:px-6 sm:py-[120px] lg:py-[160px]">
        <BrandWatermark
          anchor="right-edge"
          widthClass="w-[600px] sm:w-[1000px]"
          opacityClass="opacity-[0.04]"
          toneClass="text-white"
          showWordmark={false}
          rotation={-4}
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
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
              For distributors
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(36px,7vw,96px)] font-bold leading-[0.95] tracking-display">
              Become an{" "}
              <span className="text-gradient-accent">Inokim partner</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary-on-dark)] sm:mt-6 sm:text-[19px]">
              One distributor per territory. Sixteen years of brand equity. The full 2026 lineup.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <MagneticButton href="/#dealer" variant="primary">
                Request a quote
              </MagneticButton>
              <Link
                href="/about"
                className="text-[14px] font-medium text-[var(--color-fg-on-dark)] underline-offset-4 hover:underline"
              >
                Read about Inokim ›
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}