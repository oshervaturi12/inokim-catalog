"use client";

import { useEffect, useRef } from "react";

/**
 * Adds an `is-revealed` class to the element when it enters the viewport.
 * Pair with CSS that translates/fades-in the .reveal class and settles on .is-revealed.
 *
 * Once revealed, the observer disconnects so the animation only plays once.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal">…</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — reveal immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
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
        ...options,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}