import { InkUnderline } from "@/components/ui/Highlight";
import { cn } from "@/lib/utils";

/**
 * En-tête de section commun : sur-titre (trait rouge + petites capitales),
 * titre, texte d'introduction.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  arabic,
  align = "left",
  tone = "light",
  underline = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  arabic?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Trait dégradé sous le titre */
  underline?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em]",
          dark ? "text-brand-500" : "text-brand-600",
        )}
      >
        <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />
        {eyebrow}
        {align === "center" && <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />}
      </p>
      <h2
        className={cn(
          "mt-4 text-balance font-[family-name:var(--font-outfit)] text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-zinc-950",
        )}
      >
        {title}
      </h2>
      {underline && (
        <InkUnderline
          className={cn("mt-3 h-3.5 w-56 sm:w-72", align === "center" && "mx-auto")}
        />
      )}
      {arabic && (
        <p className={cn("arabic mt-3 text-base", dark ? "text-brand-500" : "text-brand-600")}>
          {arabic}
        </p>
      )}
      {lede && (
        <p
          className={cn(
            "mt-4 text-pretty text-[15px] leading-relaxed sm:text-base",
            dark ? "text-zinc-400" : "text-zinc-500",
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
