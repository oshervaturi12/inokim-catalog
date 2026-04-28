"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** How many pixels the image drifts as it scrolls through the viewport. Default 60. */
  intensity?: number;
  /** Direction of parallax. "up" = image moves up faster than scroll (the common one). */
  direction?: "up" | "down";
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  intensity = 60,
  direction = "up",
  className = "",
  sizes,
  priority = false,
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = imgWrapperRef.current;
    if (!wrapper || !inner) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sign = direction === "up" ? -1 : 1;

    function update() {
      if (!wrapper || !inner || !visibleRef.current) return;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (just leaving top) → 0 (center) → 1 (just entering bottom)
      const progress =
        (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      inner.style.transform = `translate3d(0, ${clamped * intensity * sign}px, 0)`;
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    }

    // Only listen to scroll while in view
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(wrapper);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [intensity, direction]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={imgWrapperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transition: "transform 0.05s linear" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}