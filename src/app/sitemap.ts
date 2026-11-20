import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getPublishedCatalog } from "@/lib/data/catalog";

/**
 * Plan du site pour Google (/sitemap.xml) : liste des pages publiques et
 * photos des réalisations (pour Google Images).
 * Régénéré au plus tard toutes les heures.
 */
export const revalidate = 3600;

const abs = (path: string) => new URL(path, SITE.url).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { works } = await getPublishedCatalog();
  const photos = works.flatMap((w) => w.images.map((img) => abs(img.src)));
  const now = new Date();

  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1, images: [abs("/hero-logo-3d.jpg")] },
    { url: abs("/realisations"), lastModified: now, changeFrequency: "weekly", priority: 0.9, images: photos },
    { url: abs("/devis"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: abs("/mentions-legales"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/confidentialite"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
