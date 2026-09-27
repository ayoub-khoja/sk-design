export type WorkCategory =
  | "enseignes"
  | "habillage"
  | "plaques"
  | "edition"
  | "tampons";

export const WORK_FILTERS: { id: "all" | WorkCategory; label: string }[] = [
  { id: "all", label: "Tous nos travaux" },
  { id: "enseignes", label: "Enseignes Lumineuses & Caissons" },
  { id: "habillage", label: "Habillage Vitrine & Façade" },
  { id: "plaques", label: "Plaques & Signalétique" },
  { id: "edition", label: "Édition & Scolaire Sur-Mesure" },
  { id: "tampons", label: "Tampons & Objets" },
];

const IMG = {
  signs:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  store:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  facade:
    "https://images.unsplash.com/photo-1441984904996-e0b692c2ad91?auto=format&fit=crop&w=1200&q=80",
  shop:
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
  office:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
  notebook:
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
  school:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
} as const;

export const FEATURED_WORKS = [
  {
    id: "caisson",
    category: "enseignes" as const,
    chips: ["Caisson Lumineux LED", "Plexiglas Diffusant"],
    images: [
      { src: IMG.signs, alt: "Caissons lumineux Western Union et MoneyGram" },
      { src: IMG.store, alt: "Pose enseigne lumineuse en vitrine" },
    ],
    kicker: "Enseigne institutionnelle • Agences de transfert",
    title: "Caisson Lumineux Multi-Réseaux : Western Union, Ria & MoneyGram",
    description:
      "Fabrication complète sur mesure en plexiglas opale thermoformé avec profilé laqué noir mat et châssis aluminium. Éclairage haute puissance modules LED Samsung étanches IP65 pour une visibilité jour/nuit infaillible.",
    tags: [
      "Plexi 4mm Coulé",
      "Adhésif Translucide Avery",
      "Pose murale sécurisée",
      "Garantie 2 ans",
    ],
    reference: "#EN-2024-WU",
    cta: "Devis Immédiat",
    ctaVariant: "red" as const,
  },
  {
    id: "vitrine",
    category: "habillage" as const,
    chips: ["Vitrophanie Intégrale", "Vinyle Polymère"],
    images: [
      { src: IMG.facade, alt: "Habillage vitrine commerce" },
      { src: IMG.shop, alt: "Vinyle microperforé façade" },
    ],
    kicker: "Habillage commercial • Façades & vitrines",
    title: "Habillage Vitrine & Façade en Vinyle Polymère",
    description:
      "Transformation complète de devantures : films one-way vision, adhésifs polymères longue durée et découpe traceur précise. Impression éco-solvant 1440 DPI avec lamination anti-UV pour une tenue extérieure durable.",
    tags: [
      "Lamination Anti-UV",
      "Impression Éco-Solvant 1440 DPI",
      "Pose Pro Garantie",
    ],
    reference: "#VIT-2024-ALK",
    cta: "Habiller ma Vitrine",
    ctaVariant: "dark" as const,
  },
] as const;

export const GRID_WORKS = [
  {
    id: "plaques",
    category: "plaques" as const,
    kicker: "Cabinets & Cérémonies",
    title: "Plaques Cabinets, Portes de Bureau & Trophées d'Honneur",
    description:
      "Gamme prestige en plexiglas miroir doré et fond bois verni. Réalisation de plaques de cabinets médicaux, notaires et distinctions de reconnaissance.",
    tags: ["Plexi Or Miroir", "Découpe Laser Micron", "Entretoises Inox"],
    note: "Personnalisable à l'unité",
    cta: "Commander",
    ctaVariant: "red" as const,
    image: IMG.office,
    imageAlt: "Plaques professionnelles de cabinet",
  },
  {
    id: "journaux",
    category: "edition" as const,
    kicker: "Pédagogie • Enseignants",
    title: "Journaux de Classe Enseignants & Registres Personnalisés",
    description:
      "Conception graphique individualisée pour professeurs. Couverture rigide plastifiée mat ou brillant, reliure spirale métallique renforcée et intercalaires par matière.",
    tags: ["Papier 90g Blanc Satiné", "Couverture Rembordée", "Format A4 / B5"],
    note: "Tarifs dégressifs écoles",
    cta: "Devis Lot",
    ctaVariant: "dark" as const,
    image: IMG.notebook,
    imageAlt: "Journal de classe personnalisé",
  },
  {
    id: "cahiers",
    category: "edition" as const,
    kicker: "Fournitures • Écoles & Instituts",
    title: "Cahiers de Préparation Pédagogique & Feuilles de TD",
    description:
      "Édition complète de collections scolaires : كراس التمارين، دفتر إعداد الدروس d'établissements avec logos et charte graphique sur mesure.",
    tags: ["Pliage Métal / Spirale", "Impression Recto-Verso", "Grille personnalisée"],
    note: "Livraison toute Tunisie",
    cta: "Télécharger Modèles",
    ctaVariant: "ghost" as const,
    image: IMG.school,
    imageAlt: "Cahiers scolaires personnalisés",
  },
] as const;

export const MACHINES = [
  {
    icon: "printer" as const,
    title: "Traceurs Éco-Solvant & UV",
    description:
      "Laize jusqu'à 320 cm. Résolution photographique 1440 DPI. Idéal pour bâches tendues, vinyles vitrine, posters rétroéclairés et textiles publicitaires.",
    specs: [
      { label: "Capacité", value: "450 m²/jour" },
      { label: "Encres", value: "Résistantes UV & intempéries" },
    ],
  },
  {
    icon: "scissors" as const,
    title: "Découpe CNC & Laser CO2",
    description:
      "Table 1300×2500 mm avec broche haute fréquence. Découpe au micron sur Plexiglas, Forex, Alucobond, MDF et gravure de plaques laiton/acrylique.",
    specs: [
      { label: "Épaisseur max", value: "Plexi 20mm / Bois 30mm" },
      { label: "Chant", value: "Poli flamme & laser" },
    ],
  },
  {
    icon: "layers" as const,
    title: "Lamination & Pelliculage",
    description:
      "Laminateur à rouleaux chauffants 1600 mm. Protection anti-UV, anti-rayures, finition mate antireflet ou brillante miroir pour panneaux et véhicules.",
    specs: [
      { label: "Tenue extérieure", value: "Jusqu'à 7 ans" },
      { label: "Films", value: "Monomère / Coulé 3D" },
    ],
  },
  {
    icon: "stamp" as const,
    title: "Tampons Express Colop & Trodat",
    description:
      "Gravure optique directe pour timbres de sociétés, sceaux juridiques, dateurs et numéroteurs. Prêts en 30 minutes directement à l'atelier.",
    specs: [
      { label: "Délai fabrication", value: "30 minutes" },
      { label: "Marques", value: "Trodat Printy & Colop" },
    ],
  },
] as const;

export const STEPS = [
  {
    n: "1",
    title: "Prise de Cotes & Fichiers",
    text: "Envoi de vos dimensions ou visite technique sur place par notre métreur.",
  },
  {
    n: "2",
    title: "Simulation 3D & BAT",
    text: "Création graphique réaliste intégrée directement sur la photo de votre façade.",
  },
  {
    n: "3",
    title: "Façonnage en Atelier",
    text: "Découpe, fraisage, câblage LED, impression numérique et contrôle qualité.",
  },
  {
    n: "4",
    title: "Pose ou Expédition Express",
    text: "Équipe d'installateurs qualifiés avec nacelle ou livraison sécurisée partout en Tunisie.",
    accent: true,
  },
] as const;
