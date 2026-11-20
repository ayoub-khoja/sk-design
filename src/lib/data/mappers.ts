import "server-only";
import type { CategoryDoc, RealisationDoc } from "@/lib/db/mongo";
import type { Category, Realisation } from "./types";

export function toCategory(doc: CategoryDoc): Category {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    sort_order: doc.sortOrder,
  };
}

export function toRealisation(doc: RealisationDoc): Realisation {
  return {
    id: doc._id.toHexString(),
    category_id: doc.categoryId.toHexString(),
    title: doc.title,
    description: doc.description,
    is_featured: doc.isFeatured,
    is_published: doc.isPublished,
    sort_order: doc.sortOrder,
    created_at: doc.createdAt.toISOString(),
    updated_at: doc.updatedAt.toISOString(),
    images: [...doc.images]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => ({
        id: img.fileId.toHexString(),
        storage_path: img.fileId.toHexString(),
        alt: img.alt,
        sort_order: img.sortOrder,
      })),
  };
}

/** Ordre d'affichage : champ « ordre » puis plus récent d'abord. */
export const REALISATION_SORT = { sortOrder: 1, createdAt: -1 } as const;
export const CATEGORY_SORT = { sortOrder: 1, name: 1 } as const;
