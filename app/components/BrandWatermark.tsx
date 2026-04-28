import ScooterSvg from "./ScooterSvg";

interface BrandWatermarkProps {
  /** Horizontal anchor */
  anchor?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "left-edge"
    | "right-edge";
  /** Tailwind opacity class — default "opacity-[0.04]" (very subtle on dark, slightly more visible on light). */
  opacityClass?: string;
  /** Tailwind text color class — sets the SVG color via currentColor */
  toneClass?: string;
  /** Width — Tailwind class. Default "w-[800px]". Use larger like "w-[1200px]" for hero sections. */
  widthClass?: string;
  /** Rotation in degrees. Default 0. Try -8 or 12 for movement. */
  rotation?: number;
  /** Show wordmark next to K. Default false (just the K-logo for cleaner watermark) */
  showWordmark?: boolean;
  /** Wordmark text */
  wordmark?: string;
}

const ANCHOR_CLASSES: Record<NonNullable<BrandWatermarkProps["anchor"]>, string> = {
  "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
  "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
  "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "left-edge": "top-1/2 left-0 -translate-x-1/3 -translate-y-1/2",
  "right-edge": "top-1/2 right-0 translate-x-1/3 -translate-y-1/2",
};

/**
 * Atmospheric brand watermark — places the Inokim K-logo as a giant faded
 * background element. Use absolutely-positioned inside a `relative` parent.
 *
 * Tip: keep opacity very low (0.03–0.06) — it should be felt, not seen.
 *
 * Example:
 *   <section className="relative overflow-hidden">
 *     <BrandWatermark anchor="bottom-right" widthClass="w-[1200px]" />
 *     <div className="relative z-10">…content…</div>
 *   </section>
 */
export default function BrandWatermark({
  anchor = "bottom-right",
  opacityClass = "opacity-[0.8]",
  toneClass = "text-[var(--color-fg)]",
  widthClass = "w-[800px]",
  rotation = 0,
  showWordmark = false,
  wordmark = "DUBAI",
}: BrandWatermarkProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${widthClass} ${opacityClass} ${toneClass} ${ANCHOR_CLASSES[anchor]}`}
      style={rotation !== 0 ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      <ScooterSvg
        showWordmark={showWordmark}
        wordmark={wordmark}
        tone="auto"
        ariaLabel={null}
      />
    </div>
  );
}