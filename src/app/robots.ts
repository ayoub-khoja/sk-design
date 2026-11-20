import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

/** Consignes pour les robots des moteurs de recherche (/robots.txt). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Espace admin : jamais indexé.
      disallow: ["/admin"],
    },
    sitemap: new URL("/sitemap.xml", SITE.url).toString(),
    host: SITE.url,
  };
}
