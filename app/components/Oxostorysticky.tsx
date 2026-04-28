"use client";

import { useEffect, useRef, useState } from "react";
import Scooter3DLazy from "./Scooter3dlazy";

const FEATURES = [
  {
    eyebrow: "Dual motor",
    title: "Two motors. {accent:Working as one.}",
    description:
      "Front and rear hub motors fire in perfect synchronization. 1,300W each. Combined: 2,600W of pure force.",
  },
  {
    eyebrow: "Range",
    title: "110 km on a single charge.",
    description:
      "60V 26Ah lithium battery. The kind of range that turns a daily commute into a weekly habit.",
  },
  {
    eyebrow: "Hydraulic precision",
    title: "Stops on a coin.",
    description:
      "Front and rear hydraulic disc brakes — the kind you'd find on a downhill mountain bike. They don't fade.",
  },
  {
    eyebrow: "Ghost Shield",
    title: "Smart by default.",
    description:
      "GPS tracking, NFC unlock, alarm system. Your scooter is never really alone — even when you walk away.",
  },
];

function parseAccent(text: string) {
  const parts = text.split(/(\{accent:[^}]+\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{accent:([^}]+)\}$/);
    if (m)
      return (
        <span key={i} className="text-gradient-accent">
          {m[1]}
        </span>
      );
    return <span key={i}>{part}</span>;
  });
}

export default function OxoStorySticky() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which feature panel is in the viewport
  useEffect(() => {
    const panels = containerRef.current?.querySelectorAll<HTMLElement>(
      "[data-feature-index]",
    );
    if (!panels || panels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry most centered in the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute("data-feature-index"));
          setActiveIndex(idx);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-30% 0px -30% 0px",
      },
    );

    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--color-bg-darker)] text-[var(--color-fg-on-dark)]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          {/* ─── Left: sticky 3D scooter ─── */}
          <div className="relative">
            <div className="sticky top-12 flex h-screen items-center justify-center">
              <div className="relative aspect-square w-full max-w-xl">
                <Scooter3DLazy toneMode="dark" />
              </div>
            </div>
          </div>

          {/* ─── Right: scrolling feature panels ─── */}
          <div>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                data-feature-index={i}
                className="flex min-h-screen flex-col justify-center py-16"
              >
                <div
                  className={`transition-opacity duration-500 ${
                    activeIndex === i ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary-on-dark)]">
                    0{i + 1} · {f.eyebrow}
                  </div>
                  <h3 className="mt-4 text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
                    {parseAccent(f.title)}
                  </h3>
                  <p className="mt-6 max-w-md text-[clamp(17px,1.6vw,21px)] leading-relaxed text-[var(--color-fg-secondary-on-dark)]">
                    {f.description}
                  </p>

                  {/* Progress dots */}
                  <div className="mt-10 flex items-center gap-2">
                    {FEATURES.map((_, j) => (
                      <div
                        key={j}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          j === activeIndex
                            ? "w-8 bg-[var(--color-accent)]"
                            : "w-4 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}