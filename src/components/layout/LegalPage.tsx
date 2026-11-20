import Link from "next/link";
import { LEGAL_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

/** Mise en page sobre des pages légales. */
export function LegalPage({
  title,
  updated,
  current,
  children,
}: {
  title: string;
  updated: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-[200px_1fr] lg:px-6 lg:py-20">
        <nav aria-label="Pages légales" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-2 lg:flex-col">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === current ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition",
                    link.href === current
                      ? "bg-zinc-950 font-semibold text-white"
                      : "text-zinc-600 hover:bg-zinc-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="legal max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
            Informations légales
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-zinc-950">
            {title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">Dernière mise à jour : {updated}</p>
          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-zinc-600">
            {children}
          </div>
        </article>
      </div>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-zinc-950">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
