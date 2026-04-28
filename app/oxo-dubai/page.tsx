import type { Metadata } from "next";
import Reveal from "@/app/components/Reveal";
import MagneticButton from "@/app/components/MagneticButton";
import OxoStorySticky from "@/app/components/Oxostorysticky";
import BrandWatermark from "@/app/components/BrandWatermark";
import { getProduct } from "@/app/lib/products";

export const metadata: Metadata = {
  title: "OXO Dubai — The flagship has arrived. | Inokim 2026",
  description:
    "2,600 watts. Two motors. 110 km of range. The most powerful Inokim ever made. Available now for global B2B distribution.",
  openGraph: {
    title: "OXO Dubai — The flagship has arrived.",
    description:
      "The most powerful Inokim ever made. 2,600W. 110 km. Ghost Shield included.",
    type: "website",
  },
};

export default function OxoDubaiStoryPage() {
  const product = getProduct("oxo-dubai")!;

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
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
              Dubai Collection 2026 · Flagship
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 text-[clamp(44px,11vw,160px)] font-bold leading-[0.95] tracking-display-tight text-gradient-dark sm:mt-5 sm:leading-[0.88]">
              <span className="block">The flagship</span>
              <span className="block">has arrived.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(16px,2.4vw,28px)] font-normal leading-snug tracking-tight text-[var(--color-fg-secondary-on-dark)] sm:mt-8">
              Two motors.{" "}
              <span className="text-gradient-accent">2,600 watts</span>. 110 km
              of range. The most powerful Inokim ever made.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <MagneticButton href="#dealer" variant="primary">
                Stock the OXO Dubai
              </MagneticButton>
              <MagneticButton href="#story" variant="ghost-light">
                See the story ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Scroll hint — hidden on small screens to avoid overlap */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[12px] uppercase tracking-[0.18em] text-[var(--color-fg-secondary-on-dark)] opacity-60 sm:block sm:bottom-12">
          Scroll to explore
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. STAT STRIP — gigantic numbers
          ═══════════════════════════════════════════════ */}
      <section
        id="story"
        className="bg-[var(--color-bg-darker)] px-4 py-20 text-center text-[var(--color-fg-on-dark)] sm:px-6 sm:py-[100px] lg:py-[140px]"
      >
        <Reveal>
          <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
            By the numbers
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
            More of everything that{" "}
            <span className="text-gradient-accent">matters.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-12">
          {[
            {
              v: "2,600",
              unit: "W",
              label: "Peak power",
              desc: "Dual motor synchronization",
            },
            {
              v: "65",
              unit: "km/h",
              label: "Top speed",
              desc: "Effortless cruising",
            },
            {
              v: "110",
              unit: "km",
              label: "Range",
              desc: "60V 26Ah lithium battery",
            },
            {
              v: "33.5",
              unit: "kg",
              label: "Build weight",
              desc: "Rated for 150 kg rider",
            },
          ].map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.05}>
              <div className="border-t border-white/10 pt-6 sm:pt-8">
                <div className="text-[clamp(48px,7vw,96px)] font-bold leading-none tracking-display">
                  {s.v}
                  <span className="ml-1 text-[clamp(16px,2vw,28px)] font-normal text-[var(--color-fg-secondary-on-dark)]">
                    {s.unit}
                  </span>
                </div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] sm:mt-4 sm:text-[14px]">
                  {s.label}
                </div>
                <div className="mt-1 text-[13px] text-[var(--color-fg-secondary-on-dark)] sm:mt-1.5 sm:text-[14px]">
                  {s.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. SCROLL-PINNED 3D — sticky scooter, features animate alongside
          ═══════════════════════════════════════════════ */}
      <OxoStorySticky />

      {/* ═══════════════════════════════════════════════
          4. DUAL MOTOR ANATOMY — stacked on mobile, schematic on tablet+
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-darker)] px-4 py-20 text-center text-[var(--color-fg-on-dark)] sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
              Dual motor anatomy
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
              Two motors.{" "}
              <span className="text-gradient-accent">Working as one.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-fg-secondary-on-dark)] sm:mt-6 sm:text-[19px]">
              Front and rear hub motors fire in perfect synchronization. 1,300W
              each. Combined, they deliver the kind of acceleration and
              climbing power that single-motor scooters can&apos;t match — even at
              twice the price.
            </p>
          </Reveal>

          {/* Mobile: stacked motor cards. Tablet+: SVG schematic. */}
          <Reveal variant="image" delay={0.2}>
            {/* Mobile-only: two motor "cards" stacked */}
            <div className="mt-12 grid grid-cols-2 gap-3 md:hidden">
              {[
                { label: "FRONT", power: "1,300W" },
                { label: "REAR", power: "1,300W" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="relative mx-auto h-20 w-20">
                    <div className="absolute inset-0 rounded-full border-2 border-white/80" />
                    <div className="absolute inset-3 rounded-full bg-[#1d1d1f]" />
                    <div className="absolute inset-[26%] animate-pulse rounded-full bg-[var(--color-accent)]" />
                  </div>
                  <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-accent)]">
                    {m.label}
                  </div>
                  <div className="mt-1 text-[18px] font-bold tracking-tight">
                    {m.power}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--color-fg-secondary-on-dark)]">
                    Hub motor
                  </div>
                </div>
              ))}
              <div className="col-span-2 mt-2 text-center text-[16px] font-bold tracking-tight">
                = 2,600W combined
              </div>
            </div>

            {/* Tablet+: full SVG schematic */}
            <div className="relative mx-auto mt-16 hidden aspect-[16/8] w-full max-w-3xl md:block">
              <svg
                viewBox="0 0 800 400"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <rect
                  x="180"
                  y="200"
                  width="440"
                  height="20"
                  fill="#3a3a3d"
                  rx="4"
                />
                <line
                  x1="220"
                  y1="80"
                  x2="250"
                  y2="200"
                  stroke="#86868B"
                  strokeWidth="3"
                />
                <line
                  x1="200"
                  y1="80"
                  x2="240"
                  y2="80"
                  stroke="#F5F5F7"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                <g>
                  <circle
                    cx="180"
                    cy="280"
                    r="55"
                    fill="none"
                    stroke="#F5F5F7"
                    strokeWidth="2.5"
                  />
                  <circle cx="180" cy="280" r="35" fill="#1d1d1f" />
                  <circle cx="180" cy="280" r="22" fill="#E63946">
                    <animate
                      attributeName="opacity"
                      values="1;0.6;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <line
                    x1="180"
                    y1="220"
                    x2="180"
                    y2="160"
                    stroke="#E63946"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="180" cy="160" r="3" fill="#E63946" />
                  <text
                    x="180"
                    y="135"
                    fill="#F5F5F7"
                    fontSize="14"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    1,300W FRONT
                  </text>
                  <text
                    x="180"
                    y="118"
                    fill="#A1A1A6"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    Hub motor
                  </text>
                </g>

                <g>
                  <circle
                    cx="620"
                    cy="280"
                    r="55"
                    fill="none"
                    stroke="#F5F5F7"
                    strokeWidth="2.5"
                  />
                  <circle cx="620" cy="280" r="35" fill="#1d1d1f" />
                  <circle cx="620" cy="280" r="22" fill="#E63946">
                    <animate
                      attributeName="opacity"
                      values="0.6;1;0.6"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <line
                    x1="620"
                    y1="220"
                    x2="620"
                    y2="160"
                    stroke="#E63946"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="620" cy="160" r="3" fill="#E63946" />
                  <text
                    x="620"
                    y="135"
                    fill="#F5F5F7"
                    fontSize="14"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    1,300W REAR
                  </text>
                  <text
                    x="620"
                    y="118"
                    fill="#A1A1A6"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    Hub motor
                  </text>
                </g>

                <text
                  x="400"
                  y="370"
                  fill="#F5F5F7"
                  fontSize="20"
                  fontWeight="700"
                  textAnchor="middle"
                  letterSpacing="-0.5"
                >
                  = 2,600W combined
                </text>
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. RANGE — visualize 110 km
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-section)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
              Range
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
              What does{" "}
              <span className="text-gradient-accent">110 kilometers</span> feel
              like?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
              A full week of commuting. Or two days of weekend exploration. Or
              the entire length of Tel Aviv to Haifa, with battery to spare.
            </p>
          </Reveal>

          <Reveal variant="image" delay={0.2}>
            <div className="mt-12 sm:mt-16">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[12px]">
                  0 km
                </div>
                <div className="relative flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-2.5 rounded-full sm:h-3"
                    style={{
                      background:
                        "linear-gradient(90deg, #E63946 0%, #FF6B6B 100%)",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="text-[14px] font-semibold tracking-tight text-[var(--color-fg)] sm:text-[16px]">
                  110 km
                </div>
              </div>

              {/* Comparison labels — single column on mobile (centered), 3-col on tablet+ */}
              <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
                {[
                  {
                    km: "20 km",
                    label: "Daily commute",
                    desc: "Round-trip downtown",
                  },
                  {
                    km: "60 km",
                    label: "Weekend ride",
                    desc: "City to suburbs and back",
                  },
                  {
                    km: "110 km",
                    label: "Full charge",
                    desc: "Tel Aviv to Haifa",
                  },
                ].map((s) => (
                  <div
                    key={s.km}
                    className="text-center sm:text-left"
                  >
                    <div className="text-[22px] font-bold tracking-tight text-[var(--color-fg)] sm:text-[24px]">
                      {s.km}
                    </div>
                    <div className="text-[14px] font-medium text-[var(--color-fg)]">
                      {s.label}
                    </div>
                    <div className="text-[13px] text-[var(--color-fg-secondary)]">
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. COMPARISON — vs OX Dubai
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                The leap
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                OX Dubai → OXO Dubai.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
                The OX is the daily-rider. The OXO is its dual-motor flagship.
                The numbers tell the story.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-8 sm:mt-16 sm:gap-10 md:grid-cols-2 md:gap-12">
              {[
                {
                  label: "Peak power",
                  ox: "1,300W",
                  oxo: "2,600W",
                  delta: "2× more",
                },
                {
                  label: "Top speed",
                  ox: "60 km/h",
                  oxo: "65 km/h",
                  delta: "+5 km/h",
                },
                {
                  label: "Range",
                  ox: "95 km",
                  oxo: "110 km",
                  delta: "+15 km",
                },
                {
                  label: "Battery",
                  ox: "60V 21Ah",
                  oxo: "60V 26Ah",
                  delta: "+24% capacity",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="border-b border-[var(--color-border-light)] pb-6 sm:pb-8"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[12px]">
                    {row.label}
                  </div>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-4 sm:gap-3">
                    <div className="text-right">
                      <div className="text-[12px] text-[var(--color-fg-tertiary)] sm:text-[13px]">
                        OX Dubai
                      </div>
                      <div className="text-[18px] font-medium tracking-tight text-[var(--color-fg-secondary)] sm:text-[24px]">
                        {row.ox}
                      </div>
                    </div>
                    <div className="text-[var(--color-fg-tertiary)]">→</div>
                    <div className="text-left">
                      <div className="text-[12px] font-medium text-[var(--color-accent)] sm:text-[13px]">
                        OXO Dubai
                      </div>
                      <div className="text-[20px] font-bold tracking-tight text-[var(--color-fg)] sm:text-[28px]">
                        {row.oxo}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-[12px] font-medium text-[var(--color-accent)]">
                    {row.delta}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. CERTIFICATIONS
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-section)] px-4 py-16 text-center sm:px-6 sm:py-[80px] lg:py-[100px]">
        <Reveal>
          <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
            Certifications
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(24px,4vw,40px)] font-bold leading-[1.1] tracking-tight">
            Engineered to global standards.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-3 sm:mt-10 sm:gap-x-8 sm:gap-y-4">
            {[
              "UL 2272",
              "CE",
              "FCC",
              "RoHS",
              "12-month warranty",
              "5-year parts",
            ].map((cert) => (
              <div
                key={cert}
                className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)] sm:text-[15px]"
              >
                {cert}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════
          8. ENGINEERING QUOTE
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <blockquote className="text-[clamp(20px,4vw,42px)] font-semibold leading-[1.3] tracking-tight sm:leading-[1.25]">
              &ldquo;The OXO Dubai isn&apos;t about more power for its own sake.
              It&apos;s about making sure that when a rider needs to climb,
              accelerate, or just enjoy the ride — the scooter never asks them
              to compromise.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 text-[13px] font-semibold tracking-tight text-[var(--color-fg)] sm:mt-8 sm:text-[14px]">
              Inokim Engineering Team
            </div>
            <div className="text-[12px] text-[var(--color-fg-secondary)] sm:text-[13px]">
              Tel Aviv · Shenzhen
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          9. DEALER CTA — direct route to product page form
          ═══════════════════════════════════════════════ */}
      <section
        id="dealer"
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
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
              For distributors
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(36px,7vw,96px)] font-bold leading-[0.95] tracking-display">
              Stock the{" "}
              <span className="text-gradient-accent">flagship</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary-on-dark)] sm:mt-6 sm:text-[19px]">
              FOB China from{" "}
              <strong className="text-[var(--color-fg-on-dark)]">$1,190</strong>.
              MSRP USD{" "}
              <strong className="text-[var(--color-fg-on-dark)]">$3,790</strong>.
              One distributor per territory.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <MagneticButton
                href="/catalog/oxo-dubai#dealer-form"
                variant="primary"
              >
                Request a quote
              </MagneticButton>
              <MagneticButton
                href="/catalog/oxo-dubai"
                variant="ghost-light"
              >
                See full specs ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}