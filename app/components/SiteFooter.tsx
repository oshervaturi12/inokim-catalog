import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",

     links : [
      { href: "/oxo-dubai", label: "OXO Dubai" },
      { href: "/collections/dubai", label: "Dubai" },
      { href: "/collections/carbon", label: "Carbon" },
      { href: "/collections/quick4", label: "Quick⁴" },
      { href: "/collections/light", label: "Light" },
      { href: "/collections/kix", label: "Kix" },
      { href: "/compare", label: "Compare" },
      { href: "/#dealer", label: "Dealers" },
    ]
  },
  {
    title: "Distribution",
    links: [
      { label: "sales@inokim.com", href: "mailto:sales@inokim.com" },
      { label: "Become a dealer", href: "/#dealer" },
      { label: "B2B terms", href: "/terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "https://instagram.com/inokim" },
      { label: "TikTok", href: "https://tiktok.com/@inokim" },
      { label: "Facebook", href: "https://facebook.com/inokim" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-section)] px-6 pb-5 pt-10 text-xs text-[var(--color-fg-secondary)]">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 border-b border-[var(--color-border)] pb-6 grid-cols-2 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-xs font-semibold text-[var(--color-fg)]">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <span>Copyright © {new Date().getFullYear()} Inokim Inc. All rights reserved.</span>
          <span>UL 2272 · CE · FCC · RoHS</span>
        </div>
      </div>
    </footer>
  );
}