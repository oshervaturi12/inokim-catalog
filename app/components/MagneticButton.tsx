"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Variant = "primary" | "ghost-light" | "ghost-dark";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Max pixels of drift toward cursor. Default 6. */
  strength?: number;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--color-link)] text-white hover:bg-[var(--color-link-hover)] px-[22px] py-2",
  "ghost-light":
    "text-[var(--color-link-on-dark)] hover:underline px-3 py-3",
  "ghost-dark":
    "text-[var(--color-link)] hover:underline px-3 py-3",
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  onClick,
  type = "button",
  strength = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  // Skip magnetic effect on touch / coarse pointers
  const isFinePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  function onMouseMove(e: MouseEvent) {
    if (!isFinePointer) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Normalize to button half-size, scale by strength
    const dx = (x / (rect.width / 2)) * strength;
    const dy = (y / (rect.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  const baseClass =
    "inline-flex items-center justify-center gap-1.5 rounded-sm text-[16px] font-normal tracking-tight transition-[background,color,transform] duration-300 ease-out cursor-pointer";

  const props = {
    onMouseMove,
    onMouseLeave,
    className: `${baseClass} ${variantClass[variant]} ${className}`,
  };

  if (href) {
    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}