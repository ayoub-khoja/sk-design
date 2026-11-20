import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Rubans d'encre (magenta, jaune, cyan) qui rappellent le logo.
 * Décoration à placer en absolu dans une section `relative overflow-hidden`.
 */
export function InkSwoosh({
  className,
  flip = false,
}: {
  className?: string;
  /** Miroir horizontal (ruban qui part vers la gauche) */
  flip?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const ribbons = [
    { color: "var(--ink-magenta)", d: "M0 300 C 260 290 470 230 600 30", w: 26 },
    { color: "var(--ink-yellow)", d: "M70 300 C 320 290 500 235 600 95", w: 22 },
    { color: "var(--ink-cyan)", d: "M150 300 C 380 292 530 255 600 160", w: 18 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", flip && "-scale-x-100", className)}
    >
      <defs>
        {ribbons.map((r, i) => (
          <linearGradient key={i} id={`${id}-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={r.color} stopOpacity="0" />
            <stop offset="0.55" stopColor={r.color} stopOpacity="0.55" />
            <stop offset="1" stopColor={r.color} stopOpacity="0.95" />
          </linearGradient>
        ))}
      </defs>
      {ribbons.map((r, i) => (
        <path
          key={i}
          d={r.d}
          stroke={`url(#${id}-${i})`}
          strokeWidth={r.w}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </svg>
  );
}
