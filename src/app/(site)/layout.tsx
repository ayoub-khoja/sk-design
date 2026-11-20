import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { InkRibbon } from "@/components/ui/InkRibbon";
import { SITE, SOCIAL_LINKS } from "@/constants/site";
import { getMenuCategories } from "@/lib/data/catalog";

// Fiche entreprise pour Google (relie le site aux pages Facebook / Instagram).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SK Design",
  alternateName: "SK Design Impression & Pub",
  description:
    "Atelier d'impression numérique et de publicité à Sayada (Monastir) : enseignes lumineuses LED, habillage de vitrines, impression grand format, PLV, plaques et objets publicitaires.",
  slogan: "Donnez de la visibilité à votre activité.",
  foundingDate: String(SITE.foundedYear),
  knowsAbout: [
    "Enseignes lumineuses LED",
    "Caissons lumineux",
    "Habillage de vitrines et vitrophanie",
    "Marquage de véhicules",
    "Impression grand format",
    "PLV : roll-up, beach flags, présentoirs",
    "Plaques professionnelles et trophées",
    "Objets publicitaires personnalisés",
    "Textile personnalisé",
  ],
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  image: `${SITE.url}${SITE.logo}`,
  telephone: SITE.phones.map((p) => `+216 ${p}`),
  email: SITE.email,
  areaServed: "TN",
  address: {
    "@type": "PostalAddress",
    // Vide pour l'instant : `undefined` est omis du JSON.
    streetAddress: SITE.address.street || undefined,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postalCode,
    addressRegion: SITE.address.region,
    addressCountry: "TN",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.address.lat, longitude: SITE.address.lng },
  hasMap: SITE.address.placeUrl,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: SITE.openingHours.open,
    closes: SITE.openingHours.close,
  },
  sameAs: SOCIAL_LINKS.map((s) => s.href),
};

// Le menu « Réalisations » lit les catégories en base : rafraîchi après
// chaque modification dans /admin, et au plus tard toutes les 5 minutes.
export const revalidate = 300;

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const menuCategories = await getMenuCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <InkRibbon />
      <AnnouncementBar />
      <Header menuCategories={menuCategories} />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
