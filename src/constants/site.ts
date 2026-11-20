export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skdesign.tn",
  name: "SK DESIGN",
  tagline: "IMPRESSION & PUB",
  taglineAr: "مطبعة رقمية",
  logo: "/logo.png",
  /** Année de création de l'atelier (mise en avant dans « À propos ») */
  foundedYear: 2013,
  email: "Sk.Design11@outlook.com",
  phones: ["26 986 526", "97 915 190"],
  hours: "Lundi au Samedi : 08:30 - 19:00",
  hoursNote: "Prise en charge WhatsApp 7j/7",
  sunday: "Dimanche : Fermé",
  zone: "Toute la République Tunisienne",
  location: "Tunisie • Service sur tout le territoire",
  /**
   * Adresse de l'atelier (carte de l'accueil + fiche Google).
   * `lat` / `lng` : position exacte de la fiche Google Maps « SK Design ».
   */
  address: {
    street: "",
    city: "Sayada",
    postalCode: "5035",
    region: "Monastir",
    lat: 35.672509,
    lng: 10.888548,
    /** Fiche Google Maps de l'atelier (avis, photos, horaires) */
    placeUrl: "https://maps.google.com/?cid=8016093428422101061",
  },
  /** Horaires d'ouverture (heure de Tunis), utilisés pour « Ouvert / Fermé ». */
  openingHours: { days: [1, 2, 3, 4, 5, 6], open: "08:30", close: "19:00" },
} as const;

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    handle: "skdesign1",
    href: "https://www.facebook.com/skdesign1",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@sk_design_printing_services",
    href: "https://www.instagram.com/sk_design_printing_services/",
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
] as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/#pourquoi" },
  { label: "Contact", href: "/contact" },
] as const;

export const WHATSAPP_MESSAGE =
  "Bonjour SK Design, je souhaite un devis gratuit pour mon projet.";
