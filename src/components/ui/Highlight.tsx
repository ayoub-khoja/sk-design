import { useId } from "react";
import { cn } from "@/lib/utils";

/** Trait dégradé jaune → magenta → cyan, dessiné à la main. */
export function InkUnderline({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-3 w-full", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="var(--ink-yellow)" />
          <stop offset="0.5" stopColor="var(--ink-magenta)" />
          <stop offset="1" stopColor="var(--ink-cyan)" />
        </linearGradient>
      </defs>
      <path
        d="M3 11 C 80 3 220 2 297 8"
        stroke={`url(#${id})`}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Mot mis en avant dans un titre : rouge, italique, souligné d'un trait
 * dégradé aux couleurs du logo.
 */
export function Hl({
  children,
  tone = "light",
  italic = true,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  italic?: boolean;
}) {
  return (
    <span className="relative inline-block whitespace-nowrap pb-1">
      <span
        className={cn(
          italic && "italic",
          tone === "dark" ? "text-[#ff3b47]" : "text-brand-600",
        )}
      >
        {children}
      </span>
      <InkUnderline className="absolute -bottom-1.5 left-[4%] w-[92%]" />
    </span>
  );
}
