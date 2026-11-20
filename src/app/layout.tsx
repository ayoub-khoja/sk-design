import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/constants/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Chaque page donne son propre titre ; le nom de la marque est ajouté
  // automatiquement à la fin (ex. « Contact … | SK Design »).
  title: {
    default: "SK Design : imprimerie, enseignes lumineuses et publicité à Sayada, Monastir",
    template: "%s | SK Design – Impression & Publicité",
  },
  description:
    "SK Design, atelier d'impression et de publicité à Sayada (Monastir) depuis 2013 : enseignes lumineuses LED, habillage de vitrines, impression grand format, PLV, plaques et objets publicitaires. Fabrication et pose partout en Tunisie, devis gratuit.",
  applicationName: "SK Design",
  category: "Impression et publicité",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE.url,
    siteName: "SK Design – Impression & Publicité",
    title: "SK Design : imprimerie et enseignes lumineuses à Sayada, Monastir",
    description:
      "Enseignes LED, vitrines, impression grand format, PLV et objets publicitaires. Atelier à Sayada depuis 2013, pose dans toute la Tunisie.",
    locale: "fr_TN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SK Design, impression et publicité à Sayada" }],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  keywords: [
    "SK Design",
    "imprimerie Sayada",
    "imprimerie Monastir",
    "enseigne lumineuse Monastir",
    "enseigne LED Tunisie",
    "caisson lumineux",
    "lettres en relief",
    "habillage vitrine",
    "vitrophanie",
    "impression grand format Tunisie",
    "bâche publicitaire",
    "PLV roll-up beach flag",
    "plaque professionnelle plexi",
    "objets publicitaires personnalisés",
    "porte-clés personnalisés",
    "marquage véhicule",
    "publicité Sousse Monastir",
  ],
  // Icônes : src/app/icon.png (onglet) et src/app/apple-icon.png (iPhone),
  // détectées automatiquement par Next.js.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
