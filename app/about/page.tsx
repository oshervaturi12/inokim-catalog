import type { Metadata } from "next";
import Reveal from "@/app/components/Reveal";
import MagneticButton from "@/app/components/MagneticButton";
import BrandWatermark from "@/app/components/BrandWatermark";
import {
  TrophyIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowsPointingOutIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About — Inokim 2026 | Distribution",
  description:
    "Founded 2009 in Tel Aviv. 16 years of micro-mobility R&D. Owned manufacturing in Ningbo. Red Dot Award. Why distributors choose Inokim.",
  openGraph: {
    title: "About Inokim — Built for distributors who win.",
    description:
      "16 years. One brand. Vertical integration. Exclusive territories. Real spare parts. The serious choice for serious dealers.",
    type: "website",
  },
};

/* ─── Distributor value props ─── */
const VALUE_PROPS = [
  {
    icon: MapPinIcon,
    title: "Exclusive territories",
    desc: "One distributor per market. No price-war neighbors. No grey-market disputes. Your territory is yours to build.",
  },
  {
    icon: TruckIcon,
    title: "Spare parts in stock",
    desc: "Every component on every scooter is custom-developed by us — and stocked, indefinitely. Distributors get factory-direct parts pipelines for warranty service and repair revenue.",
  },
  {
    icon: TrophyIcon,
    title: "Red Dot brand equity",
    desc: "The OX scooter holds a Red Dot Design Award. \"Inokim\" carries weight in the design press. You're not selling another commodity scooter — you're selling design heritage.",
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "R&D pipeline",
    desc: "Tel Aviv R&D ships a generation ahead of competitors. The Quick⁴ launched while rivals were still iterating Quick 3 clones. Distributors get the new platform first.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Premium positioning",
    desc: "We don't race to the bottom. MSRP $1,090–$3,790 keeps your margin healthy and your brand intact. Inokim never undercuts dealers with direct sales.",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "Retail-ready brand",
    desc: "Twelve flagship stores in Israel. INOKIM USA in NYC. Proven retail merchandising — not just a scooter on a website. We share what works.",
  },
];

/* ─── Real timeline from inokim.com ─── */
const MILESTONES = [
  {
    year: "2009",
    title: "The patent",
    desc: "Industrial designer Nimrod Sapir patents the first folding electric scooter with a brushless hub motor. Brand name: MyWay.",
  },
  {
    year: "2011",
    title: "Quick 1 ships",
    desc: "MyWay incorporates. Small-scale production begins out of a garage. The first lightweight, quick-folding aluminum e-scooter with a lithium-ion battery.",
  },
  {
    year: "2014",
    title: "MyWay → Inokim",
    desc: "Rebrand to Inokim — \"Innovation Of last Kilometer.\"",
  },
  {
    year: "2015",
    title: "Distribution scales",
    desc: "Kfir Nelly Holdings (Kfir Ben-Shooshan) becomes exclusive distributor — establishing sales channels, marketing, and flagship chain stores. Dror Ben-Shooshan launches the dedicated service network for what he termed \"micro mobility.\" Quick 3 and Light 1 launch.",
  },
  {
    year: "2018",
    title: "OX wins Red Dot",
    desc: "The OX scooter receives the Red Dot Design Award and introduces the patented adjustable dual suspension system. Inokim becomes the design-press benchmark.",
  },
  {
    year: "2019",
    title: "OXO — first dual motor",
    desc: "Inokim's first dual-motor flagship. The platform that defines the premium e-scooter segment.",
  },
  {
    year: "2020",
    title: "Quick 4 launches",
    desc: "A generation ahead of any competitor's commuter platform. Big Shopping Centers takes a 20% stake.",
  },
  {
    year: "2022",
    title: "Inokim Ltd. forms",
    desc: "MyWay and Kfir Nelly Holdings merge into INOKIM Ltd. INOKIM USA incorporates.",
  },
  {
    year: "2026",
    title: "OXO Dubai. The new flagship.",
    desc: "Two motors. 2,600 watts. Ghost Shield smart system. The most powerful Inokim ever made — and the lineup distributors take to exhibitions worldwide.",
  },
];

/* ─── Real management from inokim.com /about page ─── */
const MANAGEMENT = [
  {
    name: "Aviv Ben-Shooshan",
    role: "CEO",
    linkedin: "https://www.linkedin.com/in/kfir-ben-shooshan-b13266180",
  },
  {
    name: "Kfir Ben-Shooshan",
    role: "Founder & Chairman",
    linkedin: "https://www.linkedin.com/in/kfir-ben-shooshan-b13266180",
  },
  {
    name: "Dror Ben-Shushan",
    role: "Founder & CQO",
    linkedin: "https://www.linkedin.com/in/dror-benshushan-529803200",
  }
];

/* ─── B2B program terms ─── */
const TERMS = [
  { icon: CubeIcon, label: "MOQ", value: "1 × 20ft container" },
  { icon: ClockIcon, label: "Lead time", value: "35–45 days from deposit" },
  { icon: CurrencyDollarIcon, label: "Payment", value: "30% deposit / 70% before shipment" },
  { icon: GlobeAltIcon, label: "Incoterm", value: "FOB China (Shanghai port)" },
];

const STATS = [
  { v: "2009", label: "Founded" },
  { v: "16+", label: "Years of R&D" },
  { v: "30+", label: "Countries served" },
  { v: "1", label: "Red Dot Award" },
];

export default function AboutPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          1. HERO — distributor-focused
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
              About Inokim · For distributors
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-4 text-[clamp(36px,7vw,96px)] font-bold leading-[0.95] tracking-display sm:mt-5">
              Built for{" "}
              <span className="text-gradient-accent">distributors</span>{" "}
              who win.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(17px,2.2vw,24px)] font-normal leading-snug tracking-tight text-[var(--color-fg-secondary)] sm:mt-8">
              Sixteen years of R&D. Owned manufacturing. A Red Dot Award. Exclusive territories. This is the page where you decide whether Inokim is the brand you stake your warehouse on.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <MagneticButton href="/#dealer" variant="primary">
                Become a distributor
              </MagneticButton>
              <MagneticButton href="#program" variant="ghost-dark">
                See the program ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. STATS STRIP
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-16 sm:px-6 sm:py-[80px] lg:py-[100px]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.05 + i * 0.05}>
              <div className="text-center">
                <div className="text-[clamp(40px,5vw,72px)] font-bold leading-none tracking-display text-[var(--color-fg)]">
                  {s.v}
                </div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:mt-4 sm:text-[14px]">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. WHY DISTRIBUTORS CHOOSE US
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                Why distributors choose Inokim
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                Six reasons your{" "}
                <span className="text-gradient-accent">P&L will thank you</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
                Most e-scooter brands assemble parts from different factories, slap a logo on the result, and sell it to anyone with an open PO. We don&apos;t. Here&apos;s the difference.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={0.1 + i * 0.05}>
                  <div className="h-full rounded-3xl bg-[var(--color-bg-section)] p-8 sm:p-9">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-white text-[var(--color-fg)]">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-6 text-[clamp(20px,2vw,24px)] font-semibold leading-[1.2] tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-fg-secondary)] sm:text-[15px]">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. ORIGIN — vertical integration story
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-section)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
              The vertical-integration advantage
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
              One factory. One quality standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-[var(--color-fg-secondary)] sm:mt-10 sm:text-[18px]">
              <p>
                Most e-scooter brands you compete against are the same scooter underneath. They buy a frame from one supplier, a motor from another, a battery from a third — slap a brand on it, and ship.
              </p>
              <p>
                <span className="font-medium text-[var(--color-fg)]">
                  Inokim doesn&apos;t.
                </span>{" "}
                Every component on every Inokim scooter is custom-developed and tested by us. Wheels, batteries, motors, controllers, frames, software — designed in Tel Aviv, manufactured in our own factory in Ningbo.
              </p>
              <p>
                For your customers: a scooter that&apos;s actually engineered, not assembled. For you: a single supplier for every spare part, every warranty claim, every accessory. No chasing third-party manufacturers when something needs replacing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. MILESTONES — real timeline from inokim.com
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                Sixteen years. One brand.
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                The{" "}
                <span className="text-gradient-accent">track record</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
                A history of shipping — not just announcing.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-16 sm:mt-20">
            <div
              aria-hidden
              className="absolute left-[30px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--color-border)] sm:left-[88px]"
            />

            <div className="space-y-10 sm:space-y-12">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} delay={0.05 + i * 0.04}>
                  <div className="relative grid grid-cols-[60px_1fr] gap-6 sm:grid-cols-[120px_1fr] sm:gap-8">
                    {/* Year column with dot */}
                    <div className="relative">
                      <div
                        aria-hidden
                        className="absolute left-[24px] top-7 md:top-2 size-3 rounded-full bg-[var(--color-accent)] sm:left-[82px]"
                      />
                      <div className="text-[clamp(22px,2.5vw,32px)] font-bold leading-tight tracking-tight text-[var(--color-fg)]">
                        {m.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pl-2 sm:pl-4">
                      <h3 className="text-[clamp(18px,2vw,22px)] font-semibold tracking-tight">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-fg-secondary)] sm:text-[15px]">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. PHILOSOPHY QUOTE
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-section)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <blockquote className="text-[clamp(22px,4vw,42px)] font-semibold leading-[1.25] tracking-tight">
              &ldquo;A 1.5-ton car carrying one person through slow traffic — that&apos;s a complete waste of resources. Our job is to make sure the alternative is{" "}
              <span className="text-gradient-accent">better than the car.</span>&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 text-[13px] font-semibold tracking-tight text-[var(--color-fg)] sm:mt-8 sm:text-[14px]">
              Inokim philosophy
            </div>
            <div className="text-[12px] text-[var(--color-fg-secondary)] sm:text-[13px]">
              Tel Aviv · Since 2009
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. TWO CITIES
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-darker)] px-4 py-20 text-[var(--color-fg-on-dark)] sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)] sm:text-[14px]">
                Two cities. One company.
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                Tel Aviv. China.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] text-[var(--color-fg-secondary-on-dark)] sm:mt-6 sm:text-[19px]">
                Two specialized teams, one company, one quality standard. Israeli engineering rigor meets Chinese manufacturing precision — under one corporate roof.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 md:gap-8">
            <Reveal delay={0.15}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <CubeIcon className="size-6" />
                </div>
                <div className="mt-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-accent)]">
                  Design & Engineering
                </div>
                <h3 className="mt-2 text-[clamp(28px,3vw,40px)] font-bold tracking-tight">
                  Tel Aviv, Israel
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-fg-secondary-on-dark)] sm:text-[15px]">
                  Industrial designers, mechanical engineers, electronics engineers, and software developers. Every product starts here. Every patent is filed here. Every prototype gets ridden through Tel Aviv traffic before it gets approved.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <WrenchScrewdriverIcon className="size-6" />
                </div>
                <div className="mt-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-accent)]">
                  Manufacturing
                </div>
                <h3 className="mt-2 text-[clamp(28px,3vw,40px)] font-bold tracking-tight">
                   China
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-fg-secondary-on-dark)] sm:text-[15px]">
                  Our own factory — not a contract assembler. Wheels, batteries, motors, controllers, frames, and final assembly all under one roof. Quality control sits next to the production line, not in an audit office overseas.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. MANAGEMENT
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                Inokim leadership
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                The people behind the brand.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
                Founders still run R&D. Distributors talk to operators, not handlers.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
            {MANAGEMENT.map((p, i) => (
              <Reveal key={p.name} delay={0.05 + i * 0.04}>
                <div className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-section)] p-5 sm:p-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-white text-[14px] font-bold tracking-tight text-[var(--color-fg)]">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="mt-4 text-[15px] font-semibold leading-tight tracking-tight text-[var(--color-fg)] sm:text-[16px]">
                    {p.name}
                  </div>
                  <div className="mt-1 text-[12px] text-[var(--color-fg-secondary)] sm:text-[13px]">
                    {p.role}
                  </div>
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[12px] text-[var(--color-link)] hover:underline sm:text-[13px]"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          9. THE PROGRAM — terms in plain English
          ═══════════════════════════════════════════════ */}
      <section
        id="program"
        className="bg-[var(--color-bg-section)] px-4 py-20 sm:px-6 sm:py-[100px] lg:py-[140px]"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Reveal>
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)] sm:text-[14px]">
                The program
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-[clamp(32px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
                Real terms.{" "}
                <span className="text-gradient-accent">No fine print.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-fg-secondary)] sm:mt-6 sm:text-[19px]">
                The four numbers every distributor needs before the call.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5">
            {TERMS.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.label} delay={0.1 + i * 0.04}>
                  <div className="flex items-center gap-5 rounded-2xl border border-[var(--color-border-light)] bg-white p-6 sm:p-7">
                    <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-section)] text-[var(--color-fg)]">
                      <Icon className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
                        {t.label}
                      </div>
                      <div className="mt-1 text-[16px] font-medium tracking-tight text-[var(--color-fg)] sm:text-[18px]">
                        {t.value}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          10. AWARDS
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg)] px-4 py-16 text-center sm:px-6 sm:py-[80px] lg:py-[100px]">
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
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:mt-10 sm:gap-x-8">
            {[
              { icon: TrophyIcon, label: "Red Dot Design Award" },
              { icon: ShieldCheckIcon, label: "UL 2272 Certified" },
              { icon: GlobeAltIcon, label: "30+ Countries" },
              { icon: ArrowsPointingOutIcon, label: "Patented OSAP Suspension" },
            ].map((item) => {
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
          11. DEALER CTA
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
              One distributor per territory. Sixteen years of brand equity. The full 2026 lineup. Let&apos;s talk.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-5">
              <MagneticButton href="/#dealer" variant="primary">
                Request a quote
              </MagneticButton>
              <MagneticButton href="/compare" variant="ghost-light">
                Compare the lineup ›
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}