"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface Tilt3DProps {
  children: ReactNode;
  /** Max degrees of tilt on each axis. Default 10. */
  intensity?: number;
  /** How much the inner content "lifts" toward the cursor. Default 0 (no lift). */
  lift?: number;
  /** Glare highlight on hover */
  glare?: boolean;
  className?: string;
}

export default function Tilt3D({
  children,
  intensity = 10,
  lift = 0,
  glare = false,
  className = "",
}: Tilt3DProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  function handleMouseMove(e: MouseEvent) {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // Skip on touch / coarse pointers
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;   // 0 → 1
    const rotateY = (x - 0.5) * intensity * 2;        // -intensity → +intensity
    const rotateX = -(y - 0.5) * intensity * 2;
    const translateZ = lift > 0 ? lift : 0;

    content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;

    if (glare && glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15), transparent 50%)`;
      glareRef.current.style.opacity = "1";
    }
  }

  function handleMouseLeave() {
    const content = contentRef.current;
    if (content) {
      content.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={contentRef}
        className="relative h-full w-full will-change-transform"
        style={{
          transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );
}