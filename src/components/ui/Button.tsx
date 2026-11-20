import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "whatsapp";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200",
  ghost:
    "bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-950",
  dark: "bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur",
  whatsapp:
    "bg-[#15803d] text-white hover:bg-[#166534] shadow-lg shadow-emerald-500/20",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
