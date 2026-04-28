"use client";

import { useState } from "react";
import {
  UserIcon,
  BuildingOfficeIcon,
  CubeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  MapIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

interface DealerFormProps {
  productName: string;
  action?: string;
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  /** Layout span on desktop. "full" = full row, "half" = 1/2 of grid. Default "half". */
  span?: "half" | "full";
}

type IconType = React.ComponentType<{ className?: string }>;

interface SectionConfig {
  title: string;
  icon: IconType;
  fields: FieldConfig[];
}

// Field groups with logical sections
const SECTIONS: SectionConfig[] = [
  {
    title: "Your details",
    icon: UserIcon,
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "email", label: "Business email", type: "email", required: true },
      { name: "phone", label: "Phone (with country code)", type: "tel", required: true, span: "full" },
    ],
  },
  {
    title: "Your business",
    icon: BuildingOfficeIcon,
    fields: [
      { name: "company", label: "Company name", type: "text", required: true },
      { name: "website", label: "Company website", type: "url" },
      { name: "country", label: "Country / territory", type: "text", required: true },
      { name: "city", label: "City", type: "text" },
    ],
  },
];

const UNIT_OPTIONS = ["20", "50", "100", "200+"];

const TRUST_SIGNALS: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: ClockIcon,
    title: "24-hour response",
    desc: "Our team replies within one business day.",
  },
  {
    icon: MapIcon,
    title: "Exclusive territories",
    desc: "One distributor per market. No overlap, no race-to-the-bottom.",
  },
  {
    icon: TruckIcon,
    title: "Real terms",
    desc: "MOQ 1 × 20ft container. Lead time 35–45 days from deposit.",
  },
];

/* ─── Section header — small icon + label, repeating pattern ─── */
function SectionHeader({
  icon: Icon,
  title,
  trailing,
}: {
  icon: IconType;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <h3 className="flex items-center gap-2.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg)]">
        <Icon className="size-4 text-[var(--color-fg-secondary)]" />
        <span>{title}</span>
      </h3>
      {trailing}
    </div>
  );
}

/* ─── Floating-label input ─── */
function FloatingInput({
  name,
  label,
  type,
  required,
  asTextarea = false,
}: FieldConfig & { asTextarea?: boolean }) {
  const [hasValue, setHasValue] = useState(false);
  const [focused, setFocused] = useState(false);
  const isFloating = focused || hasValue;

  const inputClasses =
    "peer w-full bg-transparent px-4 pt-6 pb-2 text-[15px] text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-fg)]";
  const containerClasses =
    "group relative rounded-sm border border-[var(--color-border)] bg-white transition-colors focus-within:border-[var(--color-fg)]";

  return (
    <div className={containerClasses}>
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          isFloating
            ? "top-2 text-[11px] text-[var(--color-fg-secondary)]"
            : "top-1/2 -translate-y-1/2 text-[15px] text-[var(--color-fg-secondary)]"
        }`}
      >
        {label}
        {required && <span className="ml-0.5 text-[var(--color-accent)]">*</span>}
      </label>

      {asTextarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={inputClasses}
        />
      )}
    </div>
  );
}

export default function DealerForm({ productName, action }: DealerFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [units, setUnits] = useState("20");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    data.set("product", productName);
    data.set("units", units);
    try {
      const res = await fetch(action ?? "/api/dealer-inquiry", {
        method: "POST",
        body: data,
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  // ─── Success state ───
  if (status === "ok") {
    return (
      <section
        id="dealer-form"
        className="bg-[var(--color-bg)] px-6 py-[120px] text-center"
      >
        <div className="mx-auto max-w-xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-bg-section)]">
            <CheckCircleIcon className="size-7 text-[var(--color-link)]" />
          </div>
          <h2 className="mt-8 text-[clamp(40px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
            Inquiry received.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[19px] text-[var(--color-fg-secondary)]">
            Our distribution team will reach out within 24–48 hours with your tailored quote and territory availability.
          </p>
        </div>
      </section>
    );
  }

  // ─── Form state ───
  return (
    <section id="dealer-form" className="bg-[var(--color-bg)] px-6 py-[120px]">
      <div className="mx-auto max-w-2xl">
        {/* Header — big like Apple's contact pages */}
        <header className="text-center">
          <div className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[var(--color-fg-secondary)]">
            Become a dealer
          </div>
          <h2 className="mt-3 text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight">
            Let&apos;s talk about{" "}
            <span className="text-gradient-accent">{productName}</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[19px] text-[var(--color-fg-secondary)]">
            Tell us about your market. We&apos;ll respond within 24 hours with a tailored quote and territory availability.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-16 space-y-12">
          {/* Field sections */}
          {SECTIONS.map((section, sectionIdx) => (
            <div key={section.title}>
              <SectionHeader
                icon={section.icon}
                title={section.title}
                trailing={
                  sectionIdx === 0 ? (
                    <span className="text-[12px] text-[var(--color-fg-tertiary)]">
                      <span className="text-[var(--color-accent)]">*</span> Required
                    </span>
                  ) : undefined
                }
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {section.fields.map((f) => (
                  <div
                    key={f.name}
                    className={f.span === "full" ? "sm:col-span-2" : ""}
                  >
                    <FloatingInput {...f} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Units */}
          <div>
            <SectionHeader
              icon={CubeIcon}
              title="Estimated initial order"
              trailing={
                <span className="text-[12px] text-[var(--color-accent)]">*</span>
              }
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {UNIT_OPTIONS.map((opt) => {
                const active = units === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setUnits(opt)}
                    aria-pressed={active}
                    className={`rounded-sm border px-5 py-2.5 text-[14px] transition-all ${
                      active
                        ? "border-[var(--color-fg)] bg-[var(--color-fg)] text-white"
                        : "border-[var(--color-border)] bg-white text-[var(--color-fg)] hover:border-[var(--color-fg-secondary)]"
                    }`}
                  >
                    {opt} units
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <SectionHeader
              icon={ChatBubbleLeftRightIcon}
              title="Tell us about your market"
            />
            <div className="mt-5">
              <FloatingInput
                name="message"
                label="What's your distribution experience? Which markets do you cover?"
                type="text"
                asTextarea
              />
            </div>
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 text-[13px] text-[var(--color-fg-secondary)]">
            <input
              type="checkbox"
              required
              name="consent"
              className="mt-0.5 size-4 cursor-pointer accent-[var(--color-link)]"
            />
            <span>
              I agree to be contacted regarding distribution opportunities and accept Inokim&apos;s{" "}
              <a href="/privacy" className="text-[var(--color-link)] hover:underline">
                privacy policy
              </a>
              .
            </span>
          </label>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-sm bg-[var(--color-link)] px-8 py-3 text-[15px] font-medium text-white transition-all hover:bg-[var(--color-link-hover)] hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {status === "submitting" ? "Sending…" : "Submit inquiry"}
            </button>

            {status === "error" && (
              <p className="text-[13px] text-[var(--color-accent)]">
                Something went wrong. Please email{" "}
                <a
                  href="mailto:sales@inokim.com"
                  className="underline hover:text-[var(--color-accent)]"
                >
                  sales@inokim.com
                </a>{" "}
                directly.
              </p>
            )}
          </div>
        </form>

        {/* Trust signals — Apple puts these AFTER the submit, not before */}
        <div className="mt-16 grid gap-8 border-t border-[var(--color-border-light)] pt-12 sm:grid-cols-3">
          {TRUST_SIGNALS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}>
                <div className="flex size-10 items-center justify-center rounded-md bg-[var(--color-bg-section)] text-[var(--color-fg)]">
                  <Icon className="size-5" />
                </div>
                <div className="mt-4 text-[14px] font-semibold tracking-tight text-[var(--color-fg)]">
                  {item.title}
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-fg-secondary)]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}