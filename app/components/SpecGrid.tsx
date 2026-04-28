"use client";

import { useState } from "react";
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

export default function SpecGrid({ groups }: SpecGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (groups.length === 0) return null;
  const active = groups[activeIndex];

  // Split active group's specs into 2 columns (alternating)
  const half = Math.ceil(active.specs.length / 2);
  const col1 = active.specs.slice(0, half);
  const col2 = active.specs.slice(half);

  return (
    <section
      id="specs"
      className="bg-[var(--color-bg)] px-6 py-[120px]"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-center text-[clamp(40px,6.5vw,80px)] font-bold tracking-tight">
            Tech specs.
          </h2>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            className="mt-16 flex justify-center gap-1 overflow-x-auto border-b border-[var(--color-border-light)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {groups.map((g, i) => (
              <button
                key={g.title}
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className={`-mb-px whitespace-nowrap border-b-2 px-5 py-4 text-[14px] font-normal tracking-tight transition-colors ${
                  i === activeIndex
                    ? "border-[var(--color-fg)] font-medium text-[var(--color-fg)]"
                    : "border-transparent text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)]"
                }`}
              >
                {g.title}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active tab content — keyed so it re-animates on change */}
        <div
          key={activeIndex}
          className="mt-16 grid gap-x-16 gap-y-0 md:grid-cols-2"
        >
          {[col1, col2].map((col, ci) => (
            <div key={ci}>
              {col.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-6 border-b border-[var(--color-border-light)] py-5 last:border-b-0"
                >
                  <span className="flex-shrink-0 text-[14px] text-[var(--color-fg-secondary)]">
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}