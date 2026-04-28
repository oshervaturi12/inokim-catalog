"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds (e.g. 0.1, 0.2 — used for stagger) */
  delay?: number;
  /** Use a stronger image-style entrance (slight scale + larger Y offset) */
  variant?: "default" | "image";
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  variant = "default",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          obs.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass = variant === "image" ? "reveal-image" : "reveal";

  return (
    <div
      ref={ref}
      className={`${baseClass} ${className}`.trim()}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}