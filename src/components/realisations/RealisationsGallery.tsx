"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Images, LayoutGrid } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { accentAt, type Accent } from "@/lib/accents";
import type { Catalog, CatalogCategory, CatalogWork } from "@/lib/data/types";
import { cn, whatsappUrl } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Galerie des réalisations, organisée par catégorie :
 * - filtres avec icône, couleur et nombre de projets ;
 * - « Tous les projets » affiche chaque catégorie avec son titre et sa description ;
 * - un clic sur un projet ouvre toutes ses photos en grand.
 */
/** Sélectionne la catégorie indiquée dans l'URL, à l'arrivée et à chaque changement. */
function CategoryFromUrl({
  categories,
  onSelect,
}: {
  categories: CatalogCategory[];
  onSelect: (id: string) => void;
}) {
  const slug = useSearchParams().get("categorie");
  useEffect(() => {
    const match = slug ? categories.find((c) => c.slug === slug) : undefined;
    if (match) onSelect(match.id);
  }, [slug, categories, onSelect]);
  return null;
}

export function RealisationsGallery({ catalog }: { catalog: Catalog }) {
  const works = useMemo(
    () => catalog.works.filter((w) => w.images.length > 0),
    [catalog],
  );

  // Catégories non vides, chacune avec sa couleur d'encre.
  const groups = useMemo(
    () =>
      catalog.categories
        .map((category, i) => ({
          category,
          accent: accentAt(i),
          // Les réalisations « à la une » en premier dans leur catégorie.
          works: works
            .filter((w) => w.categoryId === category.id)
            .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)),
        }))
        .filter((g) => g.works.length > 0),
    [catalog, works],
  );

  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<{ work: CatalogWork; index: number } | null>(null);
  const visibleGroups = groups.filter((g) => filter === "all" || g.category.id === filter);

  const lightboxItems: LightboxItem[] = open
    ? open.work.images.map((img) => ({
        src: img.src,
        alt: img.alt,
        title: open.work.title,
        eyebrow: open.work.categoryName,
        description: open.work.description,
      }))
    : [];

  return (
    <>
      {/* ?categorie=<slug> (liens du menu « Réalisations ») : présélection.
          Dans un Suspense pour que la galerie reste pré-rendue côté serveur. */}
      <Suspense fallback={null}>
        <CategoryFromUrl
          categories={catalog.categories}
          onSelect={setFilter}
        />
      </Suspense>

      {/* Choix de la catégorie */}
      <nav aria-label="Catégories de réalisations">
        <p className="mb-3 text-sm font-semibold text-zinc-700">
          Choisissez un métier pour voir nos projets :
        </p>
        <div className="relative">
          <ul className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
            <li className="shrink-0">
              <CategoryChip
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="Tous les projets"
                count={works.length}
                icon={<LayoutGrid className="h-4 w-4" />}
                activeClass="bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                iconClass="text-brand-600"
              />
            </li>
            {groups.map(({ category, accent, works: list }) => (
              <li key={category.id} className="shrink-0">
                <CategoryChip
                  active={filter === category.id}
                  onClick={() => setFilter(category.id)}
                  label={category.name}
                  count={list.length}
                  icon={<CategoryIcon name={category.icon} className="h-4 w-4" />}
                  activeClass={cn(accent.solid, "shadow-lg")}
                  iconClass={accent.text}
                />
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute inset-y-0 -right-4 w-12 bg-gradient-to-l from-white lg:hidden" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease }}
          className="mt-8 space-y-10"
        >
          {visibleGroups.map(({ category, accent, works: list }) => (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <CategoryHeader category={category} accent={accent} count={list.length} />
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((work) => (
                  <li key={work.id}>
                    <ProjectCard
                      work={work}
                      category={category}
                      accent={accent}
                      onOpen={() => setOpen({ work, index: 0 })}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {visibleGroups.length === 0 && (
            <p className="text-center text-sm text-zinc-500">
              Aucune réalisation dans cette catégorie pour le moment.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        items={lightboxItems}
        index={open?.index ?? null}
        onIndexChange={(i) => setOpen(i === null || !open ? null : { ...open, index: i })}
        cta={
          open
            ? {
                label: "Un projet similaire ?",
                href: whatsappUrl(
                  SITE.phones[0],
                  `${WHATSAPP_MESSAGE}\nJe suis intéressé(e) par un projet comme : ${open.work.title}`,
                ),
              }
            : undefined
        }
      />
    </>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  count,
  icon,
  activeClass,
  iconClass,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon: React.ReactNode;
  activeClass: string;
  iconClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200",
        active
          ? activeClass
          : "bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-300",
      )}
    >
      <span className={cn(active ? "text-current" : iconClass)}>{icon}</span>
      {label}
      <span
        className={cn(
          "rounded-md px-1.5 py-0.5 text-[11px] font-bold tabular-nums",
          active ? "bg-black/25" : "bg-zinc-100 text-zinc-600",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function CategoryHeader({
  category,
  accent,
  count,
}: {
  category: CatalogCategory;
  accent: Accent;
  count: number;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-zinc-200 pb-5">
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm",
          accent.solid,
        )}
      >
        <CategoryIcon name={category.icon} className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <h2
          id={`cat-${category.id}`}
          className="font-[family-name:var(--font-outfit)] text-xl font-extrabold tracking-tight text-zinc-950 sm:text-2xl"
        >
          {category.name}
        </h2>
        {category.description && (
          <p className="mt-1 text-sm leading-relaxed text-zinc-500 sm:text-[15px]">
            {category.description}
          </p>
        )}
      </div>
      <span
        className={cn(
          "hidden shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:inline-block",
          accent.soft,
          accent.text,
        )}
      >
        {count} projet{count > 1 ? "s" : ""}
      </span>
    </div>
  );
}

function ProjectCard({
  work,
  category,
  accent,
  onOpen,
}: {
  work: CatalogWork;
  category: CatalogCategory;
  accent: Accent;
  onOpen: () => void;
}) {
  const cover = work.images[0];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Voir les photos : ${work.title}`}
      className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[1.4rem] bg-zinc-900 text-left shadow-[0_20px_50px_-30px_rgba(9,9,11,0.6)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(9,9,11,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {work.images.length > 1 && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Images className="h-3.5 w-3.5" />
          {work.images.length} photos
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <span className="min-w-0">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
              accent.solid,
            )}
          >
            <CategoryIcon name={category.icon} className="h-3 w-3" />
            {category.name}
          </span>
          <span className="mt-2.5 block font-[family-name:var(--font-outfit)] text-xl font-bold leading-tight text-white">
            {work.title}
          </span>
          <span
            aria-hidden
            className="ink-ribbon mt-3 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-20"
          />
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition group-hover:border-white group-hover:bg-white group-hover:text-zinc-950">
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </button>
  );
}
