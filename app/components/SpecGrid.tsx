"use client";

import { useState, useRef, useLayoutEffect } from "react";
import {
  BoltIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  TruckIcon,
  // Spec-row icons
  BoltIcon as PowerIcon,
  Battery100Icon,
  ArrowTrendingUpIcon,
  MapIcon,
  ScaleIcon,
  Squares2X2Icon,
  HandRaisedIcon,
  ArrowsPointingInIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  SignalIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  TagIcon,
  CubeIcon,
  ClockIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Reveal from "./Reveal";

export interface Spec {
  label: string;
  value: string;
  unit?: string;
  secondary?: string;
}

export interface SpecGroup {
  title: string;
  specs: Spec[];
}

interface SpecGridProps {
  groups: SpecGroup[];
}

type IconType = React.ComponentType<{ className?: string }>;

// ─── Group-level icons (next to tab labels) ──────────────────
const GROUP_ICONS: Record<string, IconType> = {
  Performance: BoltIcon,
  "Power & Performance": BoltIcon,
  Build: Cog6ToothIcon,
  Smart: CpuChipIcon,
  "Smart Features": CpuChipIcon,
  B2B: TruckIcon,
  "B2B / Logistics": TruckIcon,
  "B2B & Logistics": TruckIcon,
};

// ─── Spec-row icons by label fragment ────────────────────────
// Order matters — first match wins. Lowercase comparison.
const SPEC_ICON_RULES: { match: string[]; icon: IconType }[] = [
  { match: ["peak power", "power"], icon: PowerIcon },
  { match: ["battery"], icon: Battery100Icon },
  { match: ["top speed", "speed"], icon: ArrowTrendingUpIcon },
  { match: ["range"], icon: MapIcon },
  { match: ["climb", "angle"], icon: ArrowTrendingUpIcon },
  { match: ["charge time", "charging"], icon: ClockIcon },
  { match: ["weight"], icon: ScaleIcon },
  { match: ["frame", "chassis"], icon: CubeIcon },
  { match: ["tire"], icon: Squares2X2Icon },
  { match: ["brake"], icon: HandRaisedIcon },
  { match: ["folded size", "folded", "fold"], icon: ArrowsPointingInIcon },
  { match: ["suspension"], icon: Cog6ToothIcon },
  { match: ["ghost shield", "shield"], icon: ShieldCheckIcon },
  { match: ["carplay", "apple"], icon: DevicePhoneMobileIcon },
  { match: ["gps", "nfc", "alarm"], icon: SignalIcon },
  { match: ["display"], icon: ComputerDesktopIcon },
  { match: ["app store", "ready"], icon: CheckCircleIcon },
  { match: ["fob"], icon: CurrencyDollarIcon },
  { match: ["msrp"], icon: TagIcon },
  { match: ["container", "40hq"], icon: CubeIcon },
  { match: ["lead time"], icon: CalendarDaysIcon },
  { match: ["payment"], icon: CreditCardIcon },
  { match: ["incoterm"], icon: GlobeAltIcon },
  { match: ["moq"], icon: ClipboardDocumentListIcon },
  { match: ["daily ready"], icon: CheckCircleIcon },
];

function iconForSpec(label: string): IconType {
  const lc = label.toLowerCase();
  for (const rule of SPEC_ICON_RULES) {
    if (rule.match.some((m) => lc.includes(m))) {
      return rule.icon;
    }
  }
  return CheckCircleIcon; // fallback
}

export default function SpecGrid({ groups }: SpecGridProps) {
  // Filter out empty groups before any rendering
  const validGroups = groups.filter((g) => g.specs.length > 0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sliding underline — measure each tab's offset/width
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeIndex, validGroups.length]);

  if (validGroups.length === 0) return null;
  const active = validGroups[activeIndex];

  // Split active group's specs into 2 columns
  const half = Math.ceil(active.specs.length / 2);
  const col1 = active.specs.slice(0, half);
  const col2 = active.specs.slice(half);

  return (
    <section id="specs" className="bg-[var(--color-bg)] px-6 py-[120px]">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-[clamp(40px,6.5vw,80px)] font-bold tracking-tight">
            Tech specs.
          </h2>
        </Reveal>

        {/* Tabs with sliding underline */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            className="relative mt-16 flex justify-center gap-1 overflow-x-auto border-b border-[var(--color-border-light)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {validGroups.map((g, i) => {
              const GroupIcon = GROUP_ICONS[g.title];
              const isActive = i === activeIndex;
              return (
                <button
                  key={g.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(i)}
                  className={`relative inline-flex items-center gap-2 whitespace-nowrap px-5 py-4 text-[14px] tracking-tight transition-colors ${
                    isActive
                      ? "font-medium text-[var(--color-fg)]"
                      : "font-normal text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {GroupIcon && <GroupIcon className="size-4" />}
                  <span>{g.title}</span>
                </button>
              );
            })}

            {/* Sliding underline */}
            <span
              aria-hidden
              className="absolute bottom-0 h-[2px] bg-[var(--color-fg)] transition-all duration-300 ease-out"
              style={{
                left: `${underline.left}px`,
                width: `${underline.width}px`,
              }}
            />
          </div>
        </Reveal>

        {/* Active tab content — keyed so each tab fades in */}
        <div
          key={activeIndex}
          className="mt-16 grid animate-[fadeUp_0.4s_ease-out] gap-x-16 gap-y-0 md:grid-cols-2"
          style={
            {
              "--tw-animate-fadeUp":
                "@keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }",
            } as React.CSSProperties
          }
        >
          {[col1, col2].map((col, ci) => (
            <div key={ci}>
              {col.map((s) => {
                const Icon = iconForSpec(s.label);
                return (
                  <div
                    key={s.label}
                    className="group flex items-center gap-4 border-b border-[var(--color-border-light)] py-5 transition-colors last:border-b-0 hover:border-[var(--color-border)]"
                  >
                    {/* Icon — subtle, picks up secondary color, brightens on hover */}
                    <span className="flex size-10 flex-shrink-0  items-center justify-center rounded-md bg-[var(--color-bg-section)] text-[var(--color-fg-secondary)] transition-colors group-hover:bg-[var(--color-fg)] group-hover:text-white">
                      <Icon className="size-5" />
                    </span>

                    {/* Label + value, baseline-aligned */}
                    <div className="flex flex-1 items-baseline justify-between gap-4 min-w-0">
                      <span className="text-[14px] text-[var(--color-fg-secondary)] truncate">
                        {s.label}
                      </span>
                      <span className="text-right">
                        <span className="text-[17px] font-medium tracking-tight text-[var(--color-fg)]">
                          {s.value}
                          {s.unit && (
                            <span className="ml-1 font-normal text-[var(--color-fg-secondary)]">
                              {s.unit}
                            </span>
                          )}
                        </span>
                        {s.secondary && (
                          <span className="ml-2 text-[13px] text-[var(--color-fg-tertiary)]">
                            {s.secondary}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}