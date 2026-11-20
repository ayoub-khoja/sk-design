/**
 * Présentation des catégories de réalisations : icône + phrase courte qui
 * explique au client ce que contient la catégorie.
 * Les catégories créées dans /admin sont reconnues par mots-clés ; sinon
 * elles reçoivent l'icône par défaut et leur propre description.
 */
export type CategoryIcon =
  | "lightbulb"
  | "store"
  | "billboard"
  | "award"
  | "presentation"
  | "book"
  | "tag"
  | "shirt"
  | "key"
  | "sparkles";

type Meta = { icon: CategoryIcon; description: string };

const BY_SLUG: Record<string, Meta> = {
  enseignes: {
    icon: "lightbulb",
    description: "Caissons lumineux LED, lettres en relief et enseignes de façade.",
  },
  habillage: {
    icon: "store",
    description: "Vitrines, vitrophanie et marquage de véhicules utilitaires.",
  },
  "grand-format": {
    icon: "billboard",
    description: "Panneaux publicitaires, bâches et stores imprimés en grand.",
  },
  plaques: {
    icon: "award",
    description: "Plaques de cabinets et d'agences, trophées et distinctions.",
  },
  plv: {
    icon: "presentation",
    description: "Beach flags, silhouettes, présentoirs et chevalets QR code.",
  },
  edition: {
    icon: "book",
    description: "Cahiers, journaux de classe et registres personnalisés.",
  },
  impression: {
    icon: "tag",
    description: "Cartes de visite, étiquettes et stickers en rouleaux.",
  },
  textile: {
    icon: "shirt",
    description: "T-shirts, polos et sweats imprimés à votre logo.",
  },
  objets: {
    icon: "key",
    description: "Porte-clés, tampons et objets publicitaires personnalisés.",
  },
};

const KEYWORDS: [RegExp, CategoryIcon][] = [
  [/enseigne|lumin|led|facade/, "lightbulb"],
  [/vitrine|vehicule|covering|habillage/, "store"],
  [/bache|grand-format|panneau|affich/, "billboard"],
  [/plaque|troph|signal/, "award"],
  [/plv|present|flag|stand/, "presentation"],
  [/edition|scolaire|cahier|livre/, "book"],
  [/carte|etiquet|sticker|impression/, "tag"],
  [/textile|tshirt|t-shirt|polo|sweat/, "shirt"],
  [/porte|cle|tampon|objet|goodies/, "key"],
];

export function categoryMeta(slug: string, description?: string): Meta {
  const known = BY_SLUG[slug];
  const icon =
    known?.icon ?? KEYWORDS.find(([re]) => re.test(slug))?.[1] ?? "sparkles";
  return {
    icon,
    description: description?.trim() || known?.description || "",
  };
}
