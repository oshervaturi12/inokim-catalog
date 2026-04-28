// import Reveal from "./Reveal";
// import MagneticButton from "./MagneticButton";

// interface MegaCtaProps {
//   eyebrow?: string;
//   /** Title — supports {accent:text} for red gradient emphasis */
//   title: string;
//   subtitle?: string;
//   primaryCta: { label: string; href: string };
//   secondaryCta?: { label: string; href: string; external?: boolean };
// }

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

// export default function MegaCta({
//   eyebrow,
//   title,
//   subtitle,
//   primaryCta,
//   secondaryCta,
// }: MegaCtaProps) {
//   return (
//     <section
//       id="pricing"
//       className="relative overflow-hidden bg-[var(--color-bg-darker)] px-6 py-[160px] text-center text-[var(--color-fg-on-dark)]"
//     >
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(230,57,70,0.15), transparent 70%)",
//         }}
//       />

//       <div className="relative z-[1] mx-auto max-w-3xl">
//         {eyebrow && (
//           <Reveal>
//             <div className="text-[28px] font-semibold leading-tight tracking-tight text-[var(--color-fg-secondary-on-dark)]">
//               {eyebrow}
//             </div>
//           </Reveal>
//         )}

//         <Reveal delay={0.05}>
//           <h2 className="mt-2 text-[clamp(40px,6.5vw,80px)] font-bold leading-[1.05] tracking-tight">
//             {parseTitle(title)}
//           </h2>
//         </Reveal>

//         {subtitle && (
//           <Reveal delay={0.1}>
//             <p className="mx-auto mt-6 max-w-xl text-[clamp(17px,1.6vw,21px)] leading-relaxed text-[var(--color-fg-secondary-on-dark)]">
//               {subtitle}
//             </p>
//           </Reveal>
//         )}

//         <Reveal delay={0.15}>
//           <div className="mt-8 flex flex-wrap justify-center gap-5">
//             <MagneticButton href={primaryCta.href} variant="primary">
//               {primaryCta.label}
//             </MagneticButton>
//             {secondaryCta && (
//               <MagneticButton
//                 href={secondaryCta.href}
//                 variant="ghost-light"
//                 external={secondaryCta.external}
//               >
//                 {secondaryCta.label}
//               </MagneticButton>
//             )}
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }


import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import BrandWatermark from "./BrandWatermark";

interface MegaCtaProps {
  eyebrow?: string;
  /** Title — supports {accent:text} for red gradient emphasis */
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
}

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

export default function MegaCta({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: MegaCtaProps) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[var(--color-bg-darker)] px-6 py-[160px] text-center text-[var(--color-fg-on-dark)]"
    >
      <BrandWatermark
        anchor="right-edge"
        widthClass="w-[1000px]"
        opacityClass="opacity-[0.04]"
        toneClass="text-white"
        showWordmark={false}
        rotation={-4}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(230,57,70,0.15), transparent 70%)",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-3xl">
        {eyebrow && (
          <Reveal>
            <div className="text-[28px] font-semibold leading-tight tracking-tight text-[var(--color-fg-secondary-on-dark)]">
              {eyebrow}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <h2 className="mt-2 text-[clamp(40px,6.5vw,80px)] font-bold leading-[1.05] tracking-tight">
            {parseTitle(title)}
          </h2>
        </Reveal>

        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-[clamp(17px,1.6vw,21px)] leading-relaxed text-[var(--color-fg-secondary-on-dark)]">
              {subtitle}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap justify-center gap-5">
            <MagneticButton href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </MagneticButton>
            {secondaryCta && (
              <MagneticButton
                href={secondaryCta.href}
                variant="ghost-light"
                external={secondaryCta.external}
              >
                {secondaryCta.label}
              </MagneticButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}