"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import {
  FEATURED_WORKS,
  GRID_WORKS,
  WORK_FILTERS,
  type WorkCategory,
} from "@/constants/services";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { cn, telHref, whatsappUrl } from "@/lib/utils";

type FilterId = "all" | WorkCategory;

function CtaLink({
  label,
  variant,
  message,
}: {
  label: string;
  variant: "red" | "dark" | "ghost";
  message: string;
}) {
  const href = whatsappUrl(SITE.phones[0], message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5",
        variant === "red" && "bg-[#C61A21] text-white hover:bg-[#a8161c]",
        variant === "dark" && "bg-zinc-900 text-white hover:bg-zinc-800",
        variant === "ghost" &&
          "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
      )}
    >
      {label}
    </a>
  );
}

export function ServicesCatalog() {
  const [filter, setFilter] = useState<FilterId>("all");
  const wa = whatsappUrl(
    SITE.phones[0],
    `${WHATSAPP_MESSAGE} Je souhaite un devis instantané.`,
  );

  const featured = useMemo(
    () =>
      FEATURED_WORKS.filter((w) => filter === "all" || w.category === filter),
    [filter],
  );
  const grid = useMemo(
    () => GRID_WORKS.filter((w) => filter === "all" || w.category === filter),
    [filter],
  );
  const total = FEATURED_WORKS.length + GRID_WORKS.length;
  const visible = featured.length + grid.length;

  return (
    <section className="bg-white pb-6 pt-8 lg:pt-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-brand-600">
              Atelier &amp; Fabrication Tunisie
            </span>
            <span className="text-slate-300">•</span>
            <span>Catalogue &amp; Galerie Réelle</span>
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Services &amp; Réalisations d&apos;Atelier
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Découvrez nos productions concrètes sorties directement de nos
                machines d&apos;impression numérique, gravure laser et atelier
                de métallerie publicitaire.
              </p>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200"
            >
              <span className="text-right">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  Devis instantané
                </span>
                <span className="block text-sm font-bold text-slate-900">
                  {SITE.phones[0]} / {SITE.phones[1]}
                </span>
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
            </a>
          </div>
        </AnimateIn>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {WORK_FILTERS.map((item) => {
            const active = filter === item.id;
            const count =
              item.id === "all"
                ? total
                : FEATURED_WORKS.filter((w) => w.category === item.id).length +
                  GRID_WORKS.filter((w) => w.category === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-zinc-900 text-white"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                {item.label}
                {item.id === "all" ? ` (${count})` : ""}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {visible === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                <p className="text-base font-semibold text-slate-800">
                  Fabrication express sur commande
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Tampons Colop &amp; Trodat, sceaux et objets gravés : prêts
                  en 30 minutes à l&apos;atelier. Envoyez votre logo sur
                  WhatsApp.
                </p>
                <a
                  href={telHref(SITE.phones[0])}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                >
                  <Phone className="h-4 w-4" />
                  Appeler l&apos;atelier
                </a>
              </div>
            ) : (
              <>
                {featured.length > 0 && (
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {featured.map((work) => (
                      <article
                        key={work.id}
                        className="overflow-hidden rounded-[1.4rem] bg-zinc-950"
                      >
                        <div className="relative grid grid-cols-[1.35fr_0.9fr] gap-1.5 p-1.5">
                          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-1.5">
                            {work.chips.map((chip, i) => (
                              <span
                                key={chip}
                                className={cn(
                                  "rounded-md px-2 py-1 text-[10px] font-semibold text-white",
                                  i === 0 ? "bg-black/70" : "bg-brand-600",
                                )}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                          {work.images.map((img) => (
                            <div
                              key={img.src}
                              className="relative aspect-[4/3] overflow-hidden rounded-xl first:aspect-auto first:min-h-[220px]"
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 50vw, 28vw"
                              />
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {featured.length > 0 && (
                  <div
                    className={cn(
                      "mt-4 grid gap-4",
                      featured.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1",
                    )}
                  >
                    {featured.map((work) => (
                      <article
                        key={`${work.id}-detail`}
                        className="rounded-[1.4rem] border border-slate-200/80 bg-white p-5 sm:p-6"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                          {work.kicker}
                        </p>
                        <h2 className="mt-2 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                          {work.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {work.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {work.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-400">
                            Référence : {work.reference}
                          </span>
                          <CtaLink
                            label={work.cta}
                            variant={work.ctaVariant}
                            message={`${WHATSAPP_MESSAGE}\nRéférence ${work.reference} — ${work.title}`}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {grid.length > 0 && (
                  <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {grid.map((work) => (
                      <article
                        key={work.id}
                        className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white"
                      >
                        <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900">
                          <Image
                            src={work.image}
                            alt={work.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 30vw"
                          />
                        </div>
                        <div className="flex flex-1 flex-col px-5 pb-5">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                            {work.kicker}
                          </p>
                          <h2 className="mt-2 text-base font-extrabold leading-snug text-slate-900">
                            {work.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            {work.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {work.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                            <span className="text-xs text-slate-400">
                              {work.note}
                            </span>
                            <CtaLink
                              label={work.cta}
                              variant={work.ctaVariant}
                              message={`${WHATSAPP_MESSAGE}\n${work.title}`}
                            />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
