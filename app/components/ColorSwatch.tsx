"use client";

import { useState } from "react";

interface Color {
  name: string;
  hex: string;
}

interface ColorSwatchProps {
  colors: Color[];
  defaultColor?: string;
  onSelect?: (name: string) => void;
}

export default function ColorSwatch({ colors, defaultColor, onSelect }: ColorSwatchProps) {
  const [selected, setSelected] = useState(defaultColor ?? colors[0]?.name);

  const handle = (name: string) => {
    setSelected(name);
    onSelect?.(name);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-fg-secondary)]">
        Color — {selected}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {colors.map((c) => {
          const isSelected = selected === c.name;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => handle(c.name)}
              aria-label={c.name}
              aria-pressed={isSelected}
              className={`size-8 rounded-md border transition-transform hover:scale-110 ${
                isSelected
                  ? "ring-2 ring-[var(--color-fg)] ring-offset-2 ring-offset-[var(--color-bg)]"
                  : "border-[var(--color-border)]"
              }`}
              style={{ background: c.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}