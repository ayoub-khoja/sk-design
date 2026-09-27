import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "red" | "soft" | "gray" | "dark" | "outline";
  className?: string;
};

const variants = {
  red: "bg-brand-50 text-brand-700 border border-brand-100",
  soft: "bg-rose-50 text-brand-600 border border-rose-100",
  gray: "bg-slate-100 text-slate-600 border border-slate-200",
  dark: "bg-slate-900 text-white border border-slate-800",
  outline: "bg-white text-slate-700 border border-slate-200",
};

export function Badge({ children, variant = "red", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
