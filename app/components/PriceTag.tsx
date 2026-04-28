interface PriceTagProps {
  fob: number | number[];
  msrp: number | number[];
  variants?: string[];
  /** Hide FOB price (show only MSRP for end-customer view) */
  hideFob?: boolean;
}

function fmt(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default function PriceTag({ fob, msrp, variants, hideFob = false }: PriceTagProps) {
  const fobArr = Array.isArray(fob) ? fob : [fob];
  const msrpArr = Array.isArray(msrp) ? msrp : [msrp];

  return (
    <div className="flex flex-col gap-1 text-center">
      <div className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] md:text-4xl">
        {msrpArr.length > 1 && (
          <span className="text-base font-normal text-[var(--color-fg-secondary)]">
            From{" "}
          </span>
        )}
        {msrpArr.map((p, i) => (
          <span key={i}>
            {fmt(p)}
            {variants?.[i] && (
              <span className="ml-1 text-sm font-normal text-[var(--color-fg-secondary)]">
                {variants[i]}
              </span>
            )}
            {i < msrpArr.length - 1 && (
              <span className="mx-2 text-[var(--color-fg-tertiary)]">·</span>
            )}
          </span>
        ))}
      </div>
      <div className="text-xs uppercase tracking-wider text-[var(--color-fg-secondary)]">
        MSRP USD
      </div>

      {!hideFob && (
        <div className="mt-3 text-sm text-[var(--color-fg-secondary)]">
          FOB China{" "}
          {fobArr.map((p, i) => (
            <span key={i} className="text-[var(--color-fg)]">
              {fmt(p)}
              {variants?.[i] && (
                <span className="ml-1 text-xs text-[var(--color-fg-secondary)]">
                  {variants[i]}
                </span>
              )}
              {i < fobArr.length - 1 && (
                <span className="mx-1.5 text-[var(--color-fg-tertiary)]">·</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}