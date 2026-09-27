export const FEATURES_BAR = [
  { title: "100%", subtitle: "Finition Atelier Garantie" },
  { title: "UV & Eco", subtitle: "Encres Résistantes Soleils", accent: true },
  { title: "Sur Mesure", subtitle: "Découpe & Pose Sur Site" },
  { title: "Express", subtitle: "26 986 526 / 97 915 190", accent: true },
] as const;

export const CONFIG_OPTIONS = {
  support: [
    "Enseigne Lumineuse LED (Plexi)",
    "Caisson Thermoformé",
    "Totem Publicitaire",
    "Habillage Façade Alucobond",
    "Vitrophanie & Vinyle",
    "Plaque Professionnelle",
  ],
  dimensions: [
    "Standard (Façade 2m x 0.8m)",
    "Compact (1.2m x 0.6m)",
    "Grand Format (3m x 1m)",
    "Sur mesure (à préciser)",
  ],
  pose: [
    "Avec Installation sur site",
    "Livraison seule",
    "Pose Tunis & Banlieue",
    "Pose toute la Tunisie",
  ],
} as const;

export const PORTFOLIO = [
  {
    id: "enseignes",
    badge: "ENSEIGNES LUMINEUSES LED",
    badgeColor: "dark" as const,
    images: [
      {
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
        alt: "Enseigne LED MoneyGram atelier",
      },
      {
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
        alt: "Caisson lumineux Western Union",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        alt: "Pose enseigne commerciale",
      },
    ],
  },
  {
    id: "facade",
    badge: "HABILLAGE FAÇADE & VITRINE",
    badgeColor: "red" as const,
    images: [
      {
        src: "https://images.unsplash.com/photo-1441984904996-e0b692c2ad91?auto=format&fit=crop&w=900&q=80",
        alt: "Habillage vitrine commerce",
      },
      {
        src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
        alt: "Façade microperforée",
      },
      {
        src: "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=600&q=80",
        alt: "Décoration commerciale vitrine",
      },
    ],
  },
] as const;

export const SERVICE_CARDS = [
  {
    id: "caissons",
    title: "Caissons & Totems Lumineux",
    description:
      "Enseignes haute visibilité pour agences de transfert (Ria, Western Union, MoneyGram) et enseignes commerciales. Fabrication thermoformée LED conforme aux chartes franchise.",
    badges: ["LED Haute Densité", "Respect Charte Franchise", "Résistance Intempéries"],
    ctaPrompt: "Besoin d'une enseigne conforme ?",
    ctaLabel: "Demander un devis",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "vitrophanie",
    title: "Vitrophanie, Vinyle & Décoration",
    description:
      "Habillage de vitrines et façades commerciales. Films one-way vision, adhésifs polymères et découpe traceur précise pour une identité visuelle durable.",
    badges: [
      "Film One-Way Vision",
      "Adhésif Polymère Longue Durée",
      "Découpe Traceur Précise",
    ],
    ctaPrompt: "Habillage de votre boutique ?",
    ctaLabel: "Étude sur mesure",
    images: [
      "https://images.unsplash.com/photo-1441984904996-e0b692c2ad91?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "plaques",
    title: "Plaques Médicales & Signalétiques",
    description:
      "Plaques professionnelles pour cabinets médicaux, avocats et entreprises. Finitions plexi, aluminium brossé, doré et laqué sur mesure.",
    badges: ["Plexi & Aluminium", "Gravure Laser", "Pose Sur Site"],
    ctaPrompt: "Besoin d'une plaque prestige ?",
    ctaLabel: "Demander un devis",
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "edition",
    label: "ÉDITION & PAPETERIE PERSONNALISÉE",
    title: "Édition & Papeterie",
    description:
      "Carnets scolaires, agendas enseignants et fournitures personnalisées. Impression numérique haute précision et finitions atelier.",
    badges: ["Impression HD", "Reliure Professionnelle", "Personnalisation Logo"],
    ctaPrompt: "Commande papeterie ?",
    ctaLabel: "Obtenir un tarif",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
    ],
  },
] as const;

export const PRESTATIONS = [
  {
    title: "Enseignes LED & Néon",
    description:
      "Lettres 3D plexi, rétroéclairage halo et caissons étanches pour une présence nocturne maximale.",
    label: "NORME SÉCURITÉ IP65",
    icon: "lightbulb" as const,
  },
  {
    title: "Habillage & Façade Alucobond",
    description:
      "Bardage composite, cadres métalliques et habillage architectural pour façades commerciales.",
    label: "POSE TOUT CLIMAT",
    icon: "building" as const,
  },
  {
    title: "Découpe Laser & Fraisage",
    description:
      "Découpe de précision sur bois, acrylique, PVC et aluminium. Finitions millimétriques.",
    label: "FINITION MILLIMÉTRIQUE",
    icon: "scissors" as const,
  },
  {
    title: "Imprimerie Commerciale",
    description:
      "Cartes de visite, flyers, roll-ups, bâches et supports grand format offset & numérique.",
    label: "TIRAGE OFFSET & NUMÉRIQUE",
    icon: "printer" as const,
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
