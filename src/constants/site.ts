export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skdesign.tn",
  name: "SK DESIGN",
  tagline: "IMPRESSION & PUB",
  taglineAr: "مطبعة رقمية",
  logo: "/logo.jpg",
  email: "contact@skdesign.tn",
  phones: ["26 986 526", "97 915 190"],
  hours: "Lundi au Samedi : 08:30 - 19:00",
  hoursNote: "Prise en charge WhatsApp 7j/7",
  sunday: "Dimanche : Fermé",
  zone: "Toute la République Tunisienne",
  location: "Tunisie • Service sur tout le territoire",
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services & Réalisations", href: "/services" },
  { label: "Tarifs & Devis", href: "/#configurateur" },
  { label: "À propos", href: "/#pourquoi" },
  { label: "Contact", href: "/#contact" },
] as const;

export const WHATSAPP_MESSAGE =
  "Bonjour SK Design, je souhaite un devis gratuit pour mon projet.";
