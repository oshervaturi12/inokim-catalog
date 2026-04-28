import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import MagneticButton from "@/app/components/MagneticButton";
import Scooter3DLazy from "@/app/components/Scooter3dlazy";
import OxoStorySticky from "@/app/components/Oxostorysticky";
import BrandWatermark from "@/app/components/BrandWatermark";
import { getProduct } from "@/app/lib/products";

export const metadata: Metadata = {
  title: "OXO Dubai — The flagship has arrived. | Inokim 2026",
  description:
    "2,600 watts. Two motors. 110 km of range. The most powerful Inokim ever made. Available now for global B2B distribution.",
  openGraph: {
    title: "OXO Dubai — The flagship has arrived.",
    description: "The most powerful Inokim ever made. 2,600W. 110 km. Ghost Shield included.",
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
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-darker)] px-6 text-center text-[var(--color-fg-on-dark)]">
        {/* Brand watermark — huge K-logo bottom-right, 4% opacity white */}
        <BrandWatermark
          anchor="bottom-right"
          widthClass="w-[1400px]"
          opacityClass="opacity-[0.05]"
          toneClass="text-white"
          showWordmark
          wordmark="DUBAI"
          rotation={-6}
        />

        {/* Atmospheric red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[min(1100px,90vw)] -translate-x-1/2 -translate-y-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(230,57,70,0.22), transparent 70%)",
          }}
        />

        <div className="relative z-[2] max-w-5xl">
          <Reveal>
            <div className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-secondary-on-dark)]">
              Dubai Collection 2026 · Flagship
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 text-[clamp(56px,11vw,160px)] font-bold leading-[0.88] tracking-display-tight text-gradient-dark">
              The flagship<br />has arrived.
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-8 max-w-2xl text-[clamp(20px,2.4vw,28px)] font-normal leading-snug tracking-tight text-[var(--color-fg-secondary-on-dark)]">
              Two motors. <span className="text-gradient-accent">2,600 watts</span>. 110 km of range. The most powerful Inokim ever made.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <MagneticButton href="#dealer" variant="primary">
                Stock the OXO Dubai
              </MagneticButton>
              <MagneticButton href="#story" variant="ghost-light">
                See the story ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[12px] uppercase tracking-[0.18em] text-[var(--color-fg-secondary-on-dark)] opacity-60">
          Scroll to explore
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. STAT STRIP — gigantic numbers
          ═══════════════════════════════════════════════ */}
      <section
        id="story"
        className="bg-[var(--color-bg-darker)] px-6 py-[140px] text-center text-[var(--color-fg-on-dark)]"
      >
        <Reveal>
          <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)]">
            By the numbers
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
            More of everything that <span className="text-gradient-accent">matters.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "2,600", unit: "W", label: "Peak power", desc: "Dual motor synchronization" },
            { v: "65", unit: "km/h", label: "Top speed", desc: "Effortless cruising" },
            { v: "110", unit: "km", label: "Range", desc: "60V 26Ah lithium battery" },
            { v: "33.5", unit: "kg", label: "Build weight", desc: "Rated for 150 kg rider" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.05}>
              <div className="border-t border-white/10 pt-8">
                <div className="text-[clamp(56px,7vw,96px)] font-bold leading-none tracking-display">
                  {s.v}
                  <span className="ml-1 text-[clamp(20px,2vw,28px)] font-normal text-[var(--color-fg-secondary-on-dark)]">
                    {s.unit}
                  </span>
                </div>
                <div className="mt-4 text-[14px] font-semibold uppercase tracking-[0.06em]">
                  {s.label}
                </div>
                <div className="mt-1.5 text-[14px] text-[var(--color-fg-secondary-on-dark)]">
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
          4. DUAL MOTOR ANATOMY
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-darker)] px-6 py-[140px] text-center text-[var(--color-fg-on-dark)]">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)]">
              Dual motor anatomy
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
              Two motors. <span className="text-gradient-accent">Working as one.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed text-[var(--color-fg-secondary-on-dark)]">
              Front and rear hub motors fire in perfect synchronization. 1,300W each. Combined, they deliver the kind of acceleration and climbing power that single-motor scooters can&apos;t match — even at twice the price.
            </p>
          </Reveal>

          {/* Anatomy diagram — schematic of motors on wheels */}
          <Reveal variant="image" delay={0.2}>
            <div className="relative mx-auto mt-16 aspect-[16/8] w-full max-w-3xl">
              <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                {/* Deck */}
                <rect x="180" y="200" width="440" height="20" fill="#3a3a3d" rx="4" />
                {/* Stem */}
                <line x1="220" y1="80" x2="250" y2="200" stroke="#86868B" strokeWidth="3" />
                <line x1="200" y1="80" x2="240" y2="80" stroke="#F5F5F7" strokeWidth="6" strokeLinecap="round" />

                {/* Front wheel + motor */}
                <g>
                  <circle cx="180" cy="280" r="55" fill="none" stroke="#F5F5F7" strokeWidth="2.5" />
                  <circle cx="180" cy="280" r="35" fill="#1d1d1f" />
                  <circle cx="180" cy="280" r="22" fill="#E63946">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Label */}
                  <line x1="180" y1="220" x2="180" y2="160" stroke="#E63946" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="180" cy="160" r="3" fill="#E63946" />
                  <text x="180" y="135" fill="#F5F5F7" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="Inter">
                    1,300W FRONT
                  </text>
                  <text x="180" y="118" fill="#A1A1A6" fontSize="11" textAnchor="middle" fontFamily="Inter">
                    Hub motor
                  </text>
                </g>

                {/* Rear wheel + motor */}
                <g>
                  <circle cx="620" cy="280" r="55" fill="none" stroke="#F5F5F7" strokeWidth="2.5" />
                  <circle cx="620" cy="280" r="35" fill="#1d1d1f" />
                  <circle cx="620" cy="280" r="22" fill="#E63946">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Label */}
                  <line x1="620" y1="220" x2="620" y2="160" stroke="#E63946" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="620" cy="160" r="3" fill="#E63946" />
                  <text x="620" y="135" fill="#F5F5F7" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="Inter">
                    1,300W REAR
                  </text>
                  <text x="620" y="118" fill="#A1A1A6" fontSize="11" textAnchor="middle" fontFamily="Inter">
                    Hub motor
                  </text>
                </g>

                {/* Combined label */}
                <text x="400" y="370" fill="#F5F5F7" fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="Inter" letterSpacing="-0.5">
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
      <section className="bg-[var(--color-bg-section)] px-6 py-[140px]">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
              Range
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
              What does <span className="text-gradient-accent">110 kilometers</span> feel like?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-[19px] text-[var(--color-fg-secondary)]">
              A full week of commuting. Or two days of weekend exploration. Or the entire length of Tel Aviv to Haifa, with battery to spare.
            </p>
          </Reveal>

          {/* Range bar visualization */}
          <Reveal variant="image" delay={0.2}>
            <div className="mt-16">
              <div className="flex items-center gap-4">
                <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                  0 km
                </div>
                <div className="relative flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #E63946 0%, #FF6B6B 100%)",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="text-[16px] font-semibold tracking-tight text-[var(--color-fg)]">
                  110 km
                </div>
              </div>

              {/* Comparison labels under the bar */}
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {[
                  { km: "20 km", label: "Daily commute", desc: "Round-trip downtown" },
                  { km: "60 km", label: "Weekend ride", desc: "City to suburbs and back" },
                  { km: "110 km", label: "Full charge", desc: "Tel Aviv to Haifa" },
                ].map((s) => (
                  <div key={s.km} className="text-left">
                    <div className="text-[24px] font-bold tracking-tight text-[var(--color-fg)]">
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
      <section className="bg-[var(--color-bg)] px-6 py-[140px]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                The leap
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                OX Dubai → OXO Dubai.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-[19px] text-[var(--color-fg-secondary)]">
                The OX is the daily-rider. The OXO is its dual-motor flagship. The numbers tell the story.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 grid gap-12 md:grid-cols-2">
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
                  className="border-b border-[var(--color-border-light)] pb-8"
                >
                  <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                    {row.label}
                  </div>
                  <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="text-right">
                      <div className="text-[13px] text-[var(--color-fg-tertiary)]">
                        OX Dubai
                      </div>
                      <div className="text-[24px] font-medium tracking-tight text-[var(--color-fg-secondary)]">
                        {row.ox}
                      </div>
                    </div>
                    <div className="text-[var(--color-fg-tertiary)]">→</div>
                    <div className="text-left">
                      <div className="text-[13px] font-medium text-[var(--color-accent)]">
                        OXO Dubai
                      </div>
                      <div className="text-[28px] font-bold tracking-tight text-[var(--color-fg)]">
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
      <section className="bg-[var(--color-bg-section)] px-6 py-[100px] text-center">
        <Reveal>
          <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
            Certifications
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-tight">
            Engineered to global standards.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-8">
            {["UL 2272", "CE", "FCC", "RoHS", "12-month warranty", "5-year parts"].map(
              (cert) => (
                <div
                  key={cert}
                  className="text-[15px] font-semibold tracking-tight text-[var(--color-fg)]"
                >
                  {cert}
                </div>
              ),
            )}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════
          8. ENGINEERING QUOTE
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-6 py-[140px]">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <blockquote className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.25] tracking-tight">
              &ldquo;The OXO Dubai isn&apos;t about more power for its own sake. It&apos;s about making sure that when a rider needs to climb, accelerate, or just enjoy the ride — the scooter never asks them to compromise.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 text-[14px] font-semibold tracking-tight text-[var(--color-fg)]">
              Inokim Engineering Team
            </div>
            <div className="text-[13px] text-[var(--color-fg-secondary)]">
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
        className="relative overflow-hidden bg-[var(--color-bg-darker)] px-6 py-[160px] text-center text-[var(--color-fg-on-dark)]"
      >
        <BrandWatermark
          anchor="left-edge"
          widthClass="w-[900px]"
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
            <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)]">
              For distributors
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(48px,7vw,96px)] font-bold leading-[0.95] tracking-display">
              Stock the <span className="text-gradient-accent">flagship</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-[19px] text-[var(--color-fg-secondary-on-dark)]">
              FOB China from <strong className="text-[var(--color-fg-on-dark)]">$1,190</strong>. MSRP USD <strong className="text-[var(--color-fg-on-dark)]">$3,790</strong>. One distributor per territory.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <MagneticButton href="/catalog/oxo-dubai#dealer-form" variant="primary">
                Request a quote
              </MagneticButton>
              <MagneticButton href="/catalog/oxo-dubai" variant="ghost-light">
                See full specs ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}