import Link from "next/link";

type Variant = "primary" | "secondary" | "dark" | "link";
type Size = "sm" | "md";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  /** Render link arrow ›  */
  showArrow?: boolean;
}

const baseStyle =
  "inline-flex items-center gap-1.5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-normal";

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-link)] text-white hover:bg-[var(--color-link-hover)] rounded-md",
  secondary:
    "bg-transparent border border-[var(--color-link)] text-[var(--color-link)] hover:bg-[var(--color-link)] hover:text-white rounded-md",
  dark: "bg-[var(--color-fg)] text-white hover:bg-[#2D2D2F] rounded-md",
  link: "text-[var(--color-link)] hover:underline",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  children,
  className = "",
  showArrow = false,
}: ButtonProps) {
  const styles = `${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {showArrow && <span aria-hidden>›</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {content}
    </button>
  );
}