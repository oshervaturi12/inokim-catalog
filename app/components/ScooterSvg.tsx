interface ScooterSvgProps {
  /** Logo color tone — defaults to "auto" which uses currentColor */
  tone?: "dark" | "light" | "auto";
  /** Show "DUBAI" wordmark next to the K-logo. Default true. */
  showWordmark?: boolean;
  /** Override the wordmark text (e.g. "CARBON", "QUICK⁴"). Default "DUBAI" */
  wordmark?: string;
  className?: string;
  /** Accessible label. Pass null to mark as decorative (aria-hidden). */
  ariaLabel?: string | null;
}

/**
 * Inokim brand emblem — the iconic "K" shape + optional collection wordmark.
 * Uses currentColor so it inherits text color from parent (theme-aware).
 *
 * Examples:
 *   <ScooterSvg tone="light" />                  // for dark backgrounds
 *   <ScooterSvg tone="dark" />                   // for light backgrounds
 *   <ScooterSvg className="text-[var(--color-fg-on-dark)]" tone="auto" />
 *   <ScooterSvg wordmark="CARBON" />
 *   <ScooterSvg showWordmark={false} />          // K only
 *   <ScooterSvg ariaLabel={null} />              // decorative (e.g. watermark)
 */
export default function ScooterSvg({
  tone = "auto",
  showWordmark = true,
  wordmark = "DUBAI",
  className = "",
  ariaLabel = "Inokim",
}: ScooterSvgProps) {
  const colorClass =
    tone === "dark"
      ? "text-[#34444c]"
      : tone === "light"
        ? "text-white"
        : ""; // "auto" — inherits from parent via currentColor

  // viewBox shrinks when wordmark is hidden
  const viewBox = showWordmark ? "0 0 580 95.71" : "0 0 238.1 95.71";

  const accessibleProps =
    ariaLabel === null
      ? { "aria-hidden": true as const }
      : { role: "img" as const, "aria-label": ariaLabel };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      {...accessibleProps}
      className={`${colorClass} ${className}`.trim()}
      fill="currentColor"
    >
      <g>
        {/* Outer ring of the K */}
        <path d="M102.87,92.67c-3.9-.04-7.79-.46-11.6-1.27-22.01-4.45-42.12-11.36-67.44-21.07C2.19,62.03-.04,48.9,0,43.63c.08-9.19,6.47-17.43,16.27-21,12.07-4.38,31.5-11.22,57.76-20.33,9.35-3.24,17.73-3.09,24.9,.46,7.78,3.85,13.57,11.39,17.2,22.41l1,3.05c3.48,10.52,4.2,12.71,9.26,31.32,3.8,13.97-.05,21.86-3.94,26.01-3.3,3.52-9.2,7.12-19.58,7.12M21,35.64c-4.33,1.57-7.14,4.76-7.17,8.12-.05,4.94,5.54,10.05,14.95,13.66,24.65,9.45,44.16,16.17,65.23,20.43,8.8,1.78,15.66,1.13,18.35-1.75,2.83-3.03,1.65-9.4,.69-12.94-4.96-18.25-5.66-20.37-9.04-30.6l-1.01-3.06c-1.67-5.07-4.8-11.67-10.2-14.35-3.73-1.84-8.52-1.77-14.24,.22-26.2,9.08-45.56,15.9-57.56,20.27" />
        {/* The K letterform */}
        <path d="M234.88,3.38h-10.35c-2.5,.12-4.85,1.22-6.56,3.05l-24.01,25.4c-7.26,7.96-14.5,0-14.5,0l-24.12-25.4c-1.71-1.83-4.06-2.93-6.56-3.05h-10.6c-2.39,.05-3.02,.84-2.96,1.73,.03,.49,.2,.95,.49,1.35,.37,.64,33.5,35.9,33.5,35.9,7.37,7.82,.03,15.67,.02,15.68l-31.35,33.44c-3.96,4.22,1.83,4.22,1.83,4.22h10.48c2.25-.08,4.39-.98,6.02-2.52,.37-.32,23.26-24.62,23.26-24.62,7.22-7.96,14.44-.03,14.47,0l22.73,24.09c1.71,1.84,4.06,2.94,6.57,3.06h10.34s5.8,0,1.84-4.23l-31.25-33.43c-7.3-7.82-.06-15.7,0-15.7L236.71,7.61c3.96-4.23-1.83-4.23-1.83-4.23" />
      </g>
      {showWordmark && (
        <text
          x={520}
          y={90}
          textAnchor="end"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={64}
          fontWeight={800}
          letterSpacing={6}
        >
          {wordmark}
        </text>
      )}
    </svg>
  );
}