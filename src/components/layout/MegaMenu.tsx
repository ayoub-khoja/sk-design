"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { accentAt } from "@/lib/accents";
import type { MenuCategory } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Lien vers la galerie, catégorie déjà sélectionnée. */
export function categoryHref(slug: string) {
  return `/realisations?categorie=${encodeURIComponent(slug)}#galerie`;
}

export function projectCount(n: number) {
  return `${n} projet${n > 1 ? "s" : ""}`;
}

/**
 * Menu déroulant « Réalisations » (ordinateur) : une carte photo par
 * catégorie, avec la vraie photo d'une réalisation.
 */
export function MegaMenu({
  id,
  categories,
  onNavigate,
}: {
  id: string;
  categories: MenuCategory[];
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease }}
      className="absolute inset-x-0 top-full border-t border-zinc-200/70 bg-white shadow-[0_30px_60px_-30px_rgba(9,9,11,0.35)]"
    >
      <div className="mx-auto max-w-7xl px-6 pb-7 pt-6">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
              <span aria-hidden className="ink-ribbon h-1 w-6 rounded-full" />
              Nos réalisations
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-outfit)] text-xl font-bold tracking-tight text-zinc-950">
              Découvrez nos métiers en photos
            </p>
          </div>
          <Link
            href="/realisations"
            onClick={onNavigate}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition hover:text-brand-600"
          >
            Voir toutes les réalisations
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className={cn("grid gap-4", categories.length > 10 ? "grid-cols-6" : "grid-cols-5")}>
          {categories.map((cat, i) => (
            <li key={cat.slug}>
              <Link
                href={categoryHref(cat.slug)}
                onClick={onNavigate}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/5"
              >
                <Image
                  src={cat.cover.src}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span aria-hidden className={cn("absolute left-3 top-3 h-1 w-8 rounded-full", accentAt(i).bar)} />
                <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                  <span className="min-w-0 text-white">
                    <span className="block text-sm font-bold leading-tight">{cat.name}</span>
                    <span className="mt-0.5 block text-xs text-white/75">{projectCount(cat.count)}</span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900 shadow transition group-hover:bg-brand-600 group-hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
