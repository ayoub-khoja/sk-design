import { Hl } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";

/** En-tête des pages intérieures (Contact, Devis…) : sur-titre, h1, intro. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  children,
}: {
  eyebrow: string;
  /** Début du titre */
  title: string;
  /** Mot(s) mis en avant à la fin du titre */
  highlight: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#fbf9f9]">
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ink-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-10 h-64 w-64 rounded-full bg-ink-magenta/10 blur-3xl" />
      <InkSwoosh className="-right-10 bottom-0 h-44 w-[50%] opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 lg:px-6 lg:pb-12 lg:pt-14">
        <p className="rise-in inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
          <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />
          {eyebrow}
        </p>
        <h1
          className="rise-in mt-5 max-w-4xl text-balance font-[family-name:var(--font-outfit)] text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "70ms" }}
        >
          {title} <Hl italic={false}>{highlight}</Hl>
        </h1>
        {children && (
          <div
            className="rise-in mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
