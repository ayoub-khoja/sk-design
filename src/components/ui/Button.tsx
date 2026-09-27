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
    "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
  ghost:
    "bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50",
  dark: "bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-lg shadow-emerald-500/20",
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
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
