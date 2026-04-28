// import Image from "next/image";
// import Reveal from "./Reveal";
// import ParallaxImage from "./ParallaxImage";
// import MagneticButton from "./MagneticButton";

// interface FeatureBandProps {
//   eyebrow?: string;
//   /** Title — supports `{accent:text}` for red gradient emphasis. */
//   title: string;
//   subtitle?: string;
//   imageSrc?: string;
//   imageAlt?: string;
//   primaryCta?: { label: string; href: string };
//   secondaryCta?: { label: string; href: string };
//   theme?: "white" | "section" | "dark";
//   /** Stacked = headline above, image below. Split = side by side. SplitReverse = image left, text right. Mega = no image, just typography. */
//   layout?: "stacked" | "split" | "split-reverse" | "mega";
//   /** Use parallax on the image (only meaningful for stacked layout) */
//   parallax?: boolean;
// }

// const themes = {
//   white: {
//     bg: "bg-[var(--color-bg)]",
//     text: "text-[var(--color-fg)]",
//     eyebrow: "text-[var(--color-fg-secondary)]",
//     sub: "text-[var(--color-fg-secondary)]",
//     imageBg: "bg-[var(--color-bg-section)]",
//   },
//   section: {
//     bg: "bg-[var(--color-bg-section)]",
//     text: "text-[var(--color-fg)]",
//     eyebrow: "text-[var(--color-fg-secondary)]",
//     sub: "text-[var(--color-fg-secondary)]",
//     imageBg: "bg-white",
//   },
//   dark: {
//     bg: "bg-[var(--color-bg-darker)]",
//     text: "text-[var(--color-fg-on-dark)]",
//     eyebrow: "text-[var(--color-fg-secondary-on-dark)]",
//     sub: "text-[var(--color-fg-secondary-on-dark)]",
//     imageBg: "bg-[#1d1d1f]",
//   },
// };

// /** Parses `{accent:text}` to wrap in red gradient span. */
// function parseTitle(title: string) {
//   const parts = title.split(/(\{accent:[^}]+\})/g);
//   return parts.map((part, i) => {
//     const match = part.match(/^\{accent:([^}]+)\}$/);
//     if (match) {
//       return (
//         <span key={i} className="text-gradient-accent">
//           {match[1]}
//         </span>
//       );
//     }
//     return <span key={i}>{part}</span>;
//   });
// }

// export default function FeatureBand({
//   eyebrow,
//   title,
//   subtitle,
//   imageSrc,
//   imageAlt,
//   primaryCta,
//   secondaryCta,
//   theme = "section",
//   layout = "stacked",
//   parallax = false,
// }: FeatureBandProps) {
//   const t = themes[theme];
//   const isMega = layout === "mega";
//   const isSplit = layout === "split" || layout === "split-reverse";
//   const isReverse = layout === "split-reverse";

//   // Headline classes — bigger for stacked/mega, smaller for split
//   const headlineClass = isSplit
//     ? "text-[clamp(32px,4.5vw,56px)] font-semibold leading-[1.07] tracking-tight"
//     : "text-[clamp(40px,6.5vw,80px)] font-bold leading-[1.05] tracking-tight";

//   const ctaSection = (primaryCta || secondaryCta) && (
//     <Reveal delay={0.15}>
//       <div
//         className={`mt-7 flex flex-wrap items-center gap-5 ${
//           isSplit ? "" : "justify-center"
//         }`}
//       >
//         {primaryCta && (
//           <MagneticButton href={primaryCta.href} variant="primary">
//             {primaryCta.label}
//           </MagneticButton>
//         )}
//         {secondaryCta && (
//           <MagneticButton
//             href={secondaryCta.href}
//             variant={theme === "dark" ? "ghost-light" : "ghost-dark"}
//           >
//             {secondaryCta.label} ›
//           </MagneticButton>
//         )}
//       </div>
//     </Reveal>
//   );

//   // ─── Layout: STACKED (centered, image below) ───
//   if (layout === "stacked" && imageSrc) {
//     return (
//       <section
//         className={`relative overflow-hidden px-6 py-[120px] text-center ${t.bg} ${t.text}`}
//       >
//         <div className="mx-auto max-w-5xl">
//           {eyebrow && (
//             <Reveal>
//               <div
//                 className={`text-[28px] font-semibold leading-tight tracking-tight ${t.eyebrow}`}
//               >
//                 {eyebrow}
//               </div>
//             </Reveal>
//           )}
//           <Reveal delay={0.05}>
//             <h2 className={`mt-2 ${headlineClass}`}>{parseTitle(title)}</h2>
//           </Reveal>
//           {subtitle && (
//             <Reveal delay={0.1}>
//               <p
//                 className={`mx-auto mt-6 max-w-2xl text-[clamp(17px,1.6vw,21px)] leading-relaxed ${t.sub}`}
//               >
//                 {subtitle}
//               </p>
//             </Reveal>
//           )}
//           {ctaSection}

//           {/* Image wrapper — Reveal animates, inner div is the relative container that next/image fill needs */}
//           <Reveal variant="image" delay={0.2} className="mt-16">
//             <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl">
//               {parallax ? (
//                 <ParallaxImage
//                   src={imageSrc}
//                   alt={imageAlt ?? title}
//                   intensity={50}
//                   sizes="(max-width: 768px) 100vw, 1000px"
//                   className="absolute inset-0 h-full w-full"
//                 />
//               ) : (
//                 <Image
//                   src={imageSrc}
//                   alt={imageAlt ?? title}
//                   fill
//                   className="object-contain"
//                   sizes="(max-width: 768px) 100vw, 1000px"
//                 />
//               )}
//             </div>
//           </Reveal>
//         </div>
//       </section>
//     );
//   }

//   // ─── Layout: MEGA (no image, big typography only) ───
//   if (isMega) {
//     return (
//       <section
//         className={`relative overflow-hidden px-6 py-[160px] text-center ${t.bg} ${t.text}`}
//       >
//         <div className="mx-auto max-w-4xl">
//           {eyebrow && (
//             <Reveal>
//               <div
//                 className={`text-[28px] font-semibold leading-tight tracking-tight ${t.eyebrow}`}
//               >
//                 {eyebrow}
//               </div>
//             </Reveal>
//           )}
//           <Reveal delay={0.05}>
//             <h2 className={`mt-2 ${headlineClass}`}>{parseTitle(title)}</h2>
//           </Reveal>
//           {subtitle && (
//             <Reveal delay={0.1}>
//               <p
//                 className={`mx-auto mt-6 max-w-2xl text-[clamp(17px,1.6vw,21px)] leading-relaxed ${t.sub}`}
//               >
//                 {subtitle}
//               </p>
//             </Reveal>
//           )}
//           {ctaSection}
//         </div>
//       </section>
//     );
//   }

//   // ─── Layout: SPLIT or SPLIT-REVERSE ───
//   if (isSplit && imageSrc) {
//     return (
//       <section className={`relative overflow-hidden px-6 py-[120px] ${t.bg} ${t.text}`}>
//         <div className="mx-auto grid max-w-6xl items-center gap-12 md:gap-20 md:grid-cols-[5fr_6fr]">
//           {/* Text */}
//           <div className={isReverse ? "md:order-2" : ""}>
//             {eyebrow && (
//               <Reveal>
//                 <div
//                   className={`text-[28px] font-semibold leading-tight tracking-tight ${t.eyebrow}`}
//                 >
//                   {eyebrow}
//                 </div>
//               </Reveal>
//             )}
//             <Reveal delay={0.05}>
//               <h2 className={`mt-1.5 ${headlineClass}`}>{parseTitle(title)}</h2>
//             </Reveal>
//             {subtitle && (
//               <Reveal delay={0.1}>
//                 <p
//                   className={`mt-4 text-[clamp(17px,1.6vw,21px)] leading-relaxed ${t.sub}`}
//                 >
//                   {subtitle}
//                 </p>
//               </Reveal>
//             )}
//             {ctaSection}
//           </div>

//           {/* Image — Reveal wraps, inner div is the relative+sized container next/image needs */}
//           <Reveal
//             variant="image"
//             delay={0.15}
//             className={isReverse ? "md:order-1" : ""}
//           >
//             <div
//               className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl ${t.imageBg}`}
//             >
//               <Image
//                 src={imageSrc}
//                 alt={imageAlt ?? title}
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//               />
//             </div>
//           </Reveal>
//         </div>
//       </section>
//     );
//   }

//   // ─── Fallback if image is missing for split/stacked ───
//   return null;
// }


import Image from "next/image";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import MagneticButton from "./MagneticButton";
import Tilt3D from "./Tilt3d";

interface FeatureBandProps {
  eyebrow?: string;
  /** Title — supports `{accent:text}` for red gradient emphasis. */
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  theme?: "white" | "section" | "dark";
  /** Stacked = headline above, image below. Split = side by side. SplitReverse = image left, text right. Mega = no image, just typography. */
  layout?: "stacked" | "split" | "split-reverse" | "mega";
  /** Use parallax on the image (only meaningful for stacked layout) */
  parallax?: boolean;
}

const themes = {
  white: {
    bg: "bg-[var(--color-bg)]",
    text: "text-[var(--color-fg)]",
    eyebrow: "text-[var(--color-fg-secondary)]",
    sub: "text-[var(--color-fg-secondary)]",
    imageBg: "bg-[var(--color-bg-section)]",
  },
  section: {
    bg: "bg-[var(--color-bg-section)]",
    text: "text-[var(--color-fg)]",
    eyebrow: "text-[var(--color-fg-secondary)]",
    sub: "text-[var(--color-fg-secondary)]",
    imageBg: "bg-white",
  },
  dark: {
    bg: "bg-[var(--color-bg-darker)]",
    text: "text-[var(--color-fg-on-dark)]",
    eyebrow: "text-[var(--color-fg-secondary-on-dark)]",
    sub: "text-[var(--color-fg-secondary-on-dark)]",
    imageBg: "bg-[#1d1d1f]",
  },
};

/** Parses `{accent:text}` to wrap in red gradient span. */
function parseTitle(title: string) {
  const parts = title.split(/(\{accent:[^}]+\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{accent:([^}]+)\}$/);
    if (match) {
      return (
        <span key={i} className="text-gradient-accent">
          {match[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function FeatureBand({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
  theme = "section",
  layout = "stacked",
  parallax = false,
}: FeatureBandProps) {
  const t = themes[theme];
  const isMega = layout === "mega";
  const isSplit = layout === "split" || layout === "split-reverse";
  const isReverse = layout === "split-reverse";

  // Headline classes — bigger for stacked/mega, smaller for split
  const headlineClass = isSplit
    ? "text-[clamp(32px,4.5vw,56px)] font-semibold leading-[1.07] tracking-tight"
    : "text-[clamp(40px,6.5vw,80px)] font-bold leading-[1.05] tracking-tight";

  const ctaSection = (primaryCta || secondaryCta) && (
    <Reveal delay={0.15}>
      <div
        className={`mt-7 flex flex-wrap items-center gap-5 ${
          isSplit ? "" : "justify-center"
        }`}
      >
        {primaryCta && (
          <MagneticButton href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </MagneticButton>
        )}
        {secondaryCta && (
          <MagneticButton
            href={secondaryCta.href}
            variant={theme === "dark" ? "ghost-light" : "ghost-dark"}
          >
            {secondaryCta.label} ›
          </MagneticButton>
        )}
      </div>
    </Reveal>
  );

  // ─── Layout: STACKED (centered, image below) ───
  if (layout === "stacked" && imageSrc) {
    return (
      <section
        className={`relative overflow-hidden px-6 py-[120px] text-center ${t.bg} ${t.text}`}
      >
        <div className="mx-auto max-w-5xl">
          {eyebrow && (
            <Reveal>
              <div
                className={`text-[28px] font-semibold leading-tight tracking-tight ${t.eyebrow}`}
              >
                {eyebrow}
              </div>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2 className={`mt-2 ${headlineClass}`}>{parseTitle(title)}</h2>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p
                className={`mx-auto mt-6 max-w-2xl text-[clamp(17px,1.6vw,21px)] leading-relaxed ${t.sub}`}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
          {ctaSection}

          {/* Image wrapper — Reveal animates, inner div is the relative container that next/image fill needs */}
          <Reveal variant="image" delay={0.2} className="mt-16">
            <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl">
              {parallax ? (
                <ParallaxImage
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  intensity={50}
                  sizes="(max-width: 768px) 100vw, 1000px"
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ─── Layout: MEGA (no image, big typography only) ───
  if (isMega) {
    return (
      <section
        className={`relative overflow-hidden px-6 py-[160px] text-center ${t.bg} ${t.text}`}
      >
        <div className="mx-auto max-w-4xl">
          {eyebrow && (
            <Reveal>
              <div
                className={`text-[28px] font-semibold leading-tight tracking-tight ${t.eyebrow}`}
              >
                {eyebrow}
              </div>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2 className={`mt-2 ${headlineClass}`}>{parseTitle(title)}</h2>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p
                className={`mx-auto mt-6 max-w-2xl text-[clamp(17px,1.6vw,21px)] leading-relaxed ${t.sub}`}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
          {ctaSection}
        </div>
      </section>
    );
  }

  // ─── Layout: SPLIT or SPLIT-REVERSE ───
  if (isSplit && imageSrc) {
    return (
      <section className={`relative overflow-hidden px-6 py-[120px] ${t.bg} ${t.text}`}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:gap-20 md:grid-cols-[5fr_6fr]">
          {/* Text */}
          <div className={isReverse ? "md:order-2" : ""}>
            {eyebrow && (
              <Reveal>
                <div
                  className={`text-[28px] font-semibold leading-tight tracking-tight ${t.eyebrow}`}
                >
                  {eyebrow}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h2 className={`mt-1.5 ${headlineClass}`}>{parseTitle(title)}</h2>
            </Reveal>
            {subtitle && (
              <Reveal delay={0.1}>
                <p
                  className={`mt-4 text-[clamp(17px,1.6vw,21px)] leading-relaxed ${t.sub}`}
                >
                  {subtitle}
                </p>
              </Reveal>
            )}
            {ctaSection}
          </div>

          {/* Image — Reveal wraps, inner div is the relative+sized container next/image needs */}
          <Reveal
            variant="image"
            delay={0.15}
            className={isReverse ? "md:order-1" : ""}
          >
            <div
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl ${t.imageBg}`}
            >
              <Tilt3D intensity={6} lift={12} className="h-full w-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Tilt3D>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ─── Fallback if image is missing for split/stacked ───
  return null;
}