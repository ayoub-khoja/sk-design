import { PHOTOS } from "./photos";

/** Les 4 grands métiers présentés sur l'accueil (la 1re photo est la principale). */
export const SERVICE_CARDS = [
  {
    id: "enseignes",
    title: "Enseignes & Caissons Lumineux",
    description:
      "Caissons LED, lettres lumineuses et enseignes de façade pour commerces, centres et agences, visibles de jour comme de nuit.",
    images: [PHOTOS.caissonCremerie, PHOTOS.facadeCentreFormation, PHOTOS.enseigneShinePlus],
  },
  {
    id: "vitrophanie",
    title: "Vitrophanie, Vinyle & Décoration",
    description:
      "Habillage de vitrines, portes et murs : adhésifs imprimés, vitrophanie et caissons rétroéclairés pour une identité visuelle durable.",
    images: [PHOTOS.vitrineRentDrive, PHOTOS.vitrophanieSport, PHOTOS.porteZrCars, PHOTOS.caissonsGymhouse],
  },
  {
    id: "plaques",
    title: "Plaques, Signalétique & Trophées",
    description:
      "Plaques professionnelles pour cabinets et entreprises, et trophées personnalisés, en plexi, aluminium ou doré miroir.",
    images: [PHOTOS.plaqueDentaire, PHOTOS.plaqueGhouila, PHOTOS.tropheeDoha],
  },
  {
    id: "edition",
    title: "Édition & Papeterie",
    description:
      "Cahiers scolaires, journaux de classe et fournitures personnalisées, imprimés en haute définition avec finitions atelier.",
    images: [PHOTOS.cahierPreparation, PHOTOS.cahiersCollection],
  },
] as const;

export const WHY_FEATURES = [
  {
    title: "Respect des Délais d'Ouverture",
    description:
      "Planning atelier calé sur vos dates d'ouverture commerciale. Fabrication express et pose coordonnée.",
    icon: "clock" as const,
  },
  {
    title: "Studio Graphique Intégré",
    description:
      "Fichiers vectoriels, simulations 3D et adaptation logo pour un rendu fidèle à votre charte.",
    icon: "pen" as const,
  },
  {
    title: "Encres Anti-UV & Durabilité",
    description:
      "Encres résistantes au soleil tunisien. Adhésifs et modules LED garantis pour l'extérieur.",
    icon: "sun" as const,
  },
  {
    title: "Conseil & Suivi Direct",
    description:
      "Échange WhatsApp avec l'atelier. Suivi de commande et photos d'avancement en temps réel.",
    icon: "user" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Enseignes LED Ria et Western Union livrées et posées dans les délais. Finition atelier impeccable.",
    name: "M. Ben Amor",
    role: "Gérant Agence de Transfert",
    initial: "M",
  },
  {
    quote:
      "Plaques plexi dorées pour notre cabinet : rendu prestige, pose soignée et suivi WhatsApp excellent.",
    name: "Karim Saafi",
    role: "Avocat — Cabinet Juridique",
    initial: "K",
  },
  {
    quote:
      "400 carnets scolaires personnalisés, impression nette et livraison express. On recommande SK Design.",
    name: "N. Trabelsi",
    role: "Directrice Établissement Scolaire",
    initial: "N",
  },
] as const;

export const FOOTER_SERVICES = [
  "Enseignes lumineuses LED & Plexiglas",
  "Habillage vitrine & Microperforé",
  "Impression numérique grand format",
  "Plaques professionnelles & Découpe laser",
  "Carnets autocopiants & Fournitures scolaires",
] as const;

/** Clients visibles sur les photos de réalisations (bandeau « Ils nous font confiance »). */
export const CLIENTS = [
  "EuroCar",
  "Oliveto",
  "Alarabia.com.tn",
  "GymHouse Sayada",
  "Med Amine Aluminium",
  "Ghouila Travel",
  "Eco-Bio Spirulina",
  "Tunisian School in Doha",
  "Rose Blanche Group",
  "Big JJ",
  "Bsissa El Kasr",
  "Fares Food",
] as const;
