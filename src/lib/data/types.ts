import type { CategoryIcon } from "@/constants/categories";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
};

export type RealisationImage = {
  id: string;
  storage_path: string;
  alt: string;
  sort_order: number;
};

export type Realisation = {
  id: string;
  category_id: string;
  title: string;
  description: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  images: RealisationImage[];
};

/** Données prêtes à afficher sur la page publique /realisations. */
export type CatalogCategory = {
  id: string;
  slug: string;
  name: string;
  /** Phrase courte qui explique la catégorie au client */
  description: string;
  icon: CategoryIcon;
};

export type CatalogWork = {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  isFeatured: boolean;
  images: { src: string; alt: string }[];
};

/** Catégorie affichée dans le menu déroulant « Réalisations » de l'en-tête. */
export type MenuCategory = {
  slug: string;
  name: string;
  count: number;
  cover: { src: string; alt: string };
};

export type Catalog = {
  categories: CatalogCategory[];
  works: CatalogWork[];
};
