type Variant = "default" | "premium" | "neon";

interface CollectionBadgeProps {
  label: string;
  year?: string | number;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  default: "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]",
  premium: "border-[var(--color-accent-amber)]/40 text-[var(--color-accent-amber)]",
  neon: "border-[var(--color-inokim-red)]/40 text-[var(--color-inokim-red)]",
};

export default function CollectionBadge({
  label,
  year,
  variant = "default",
  className = "",
}: CollectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${variants[variant]} ${className}`}
    >
      <span className="size-1 rounded-md bg-current opacity-60" />
      {label}
      {year ? <span className="opacity-60">· {year}</span> : null}
    </span>
  );
}