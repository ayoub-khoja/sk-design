import "server-only";
import { cache } from "react";
import { WORK_CATEGORIES, WORKS } from "@/constants/services";
import { categoryMeta } from "@/constants/categories";
import { isDbConfigured, publicImageUrl } from "@/lib/db/config";
import { collections } from "@/lib/db/mongo";
import { CATEGORY_SORT, REALISATION_SORT } from "./mappers";
import type { Catalog, CatalogWork, MenuCategory } from "./types";

/**
 * Catalogue public (/realisations) : réalisations publiées + catégories.
 * Sans base configurée (ou si elle est injoignable), renvoie le catalogue
 * statique de services.ts pour que le site reste en ligne.
 * Mis en cache pour la requête : le menu et la page partagent un seul appel.
 */
export const getPublishedCatalog = cache(loadPublishedCatalog);

/**
 * Catégories du menu « Réalisations » : seulement celles qui ont des photos,
 * illustrées par la 1re photo d'une réalisation à la une (sinon la première).
 */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const { categories, works } = await getPublishedCatalog();
  return categories.flatMap((cat) => {
    const list = works.filter((w) => w.categoryId === cat.id && w.images.length > 0);
    if (list.length === 0) return [];
    const cover = (list.find((w) => w.isFeatured) ?? list[0]).images[0];
    return [{ slug: cat.slug, name: cat.name, count: list.length, cover }];
  });
}

async function loadPublishedCatalog(): Promise<Catalog> {
  if (!isDbConfigured) return staticCatalog();

  try {
    const db = await collections();
    const [cats, works] = await Promise.all([
      db.categories.find().sort(CATEGORY_SORT).toArray(),
      db.realisations
        .find({ isPublished: true })
        .sort(REALISATION_SORT)
        .toArray(),
    ]);
    const nameOf = new Map(cats.map((c) => [c._id.toHexString(), c.name]));

    return {
      categories: cats.map((c) => {
        const meta = categoryMeta(c.slug, c.description);
        return {
          id: c._id.toHexString(),
          slug: c.slug,
          name: c.name,
          description: meta.description,
          icon: meta.icon,
        };
      }),
      works: works.map((r) => ({
        id: r._id.toHexString(),
        categoryId: r.categoryId.toHexString(),
        categoryName: nameOf.get(r.categoryId.toHexString()) ?? "",
        title: r.title,
        description: r.description,
        isFeatured: r.isFeatured,
        images: [...r.images]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((img) => ({
            src: publicImageUrl(img.fileId.toHexString()),
            // Texte alternatif descriptif (référencement Google Images)
            alt: img.alt || `${r.title} – ${nameOf.get(r.categoryId.toHexString()) ?? "réalisation"} par SK Design, Sayada`,
          })),
      })),
    };
  } catch (err) {
    console.error("Catalogue MongoDB indisponible", err);
    return staticCatalog();
  }
}

function staticCatalog(): Catalog {
  const categories = WORK_CATEGORIES.map((cat) => {
    const meta = categoryMeta(cat.id);
    return { id: cat.id, slug: cat.id, name: cat.label, description: meta.description, icon: meta.icon };
  });
  const nameOf = (id: string) => categories.find((cat) => cat.id === id)?.name ?? "";

  const works: CatalogWork[] = WORKS.map((w) => ({
    id: w.id,
    categoryId: w.category,
    categoryName: nameOf(w.category),
    title: w.title,
    description: w.description,
    isFeatured: Boolean(w.featured),
    images: [...w.images],
  }));

  return { categories, works };
}
