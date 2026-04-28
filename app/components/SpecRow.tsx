interface SpecRowProps {
  label: string;
  value: string;
  unit?: string;
  /** Secondary value, shown muted next to primary */
  secondary?: string;
}

export default function SpecRow({ label, value, unit, secondary }: SpecRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border-light)] py-4 last:border-b-0">
      <span className="text-sm text-[var(--color-fg-secondary)]">{label}</span>
      <span className="text-right">
        <span className="text-base font-medium text-[var(--color-fg)]">
          {value}
          {unit && (
            <span className="ml-1 font-normal text-[var(--color-fg-secondary)]">
              {unit}
            </span>
          )}
        </span>
        {secondary && (
          <span className="ml-2 text-sm text-[var(--color-fg-tertiary)]">
            {secondary}
          </span>
        )}
      </span>
    </div>
  );
}