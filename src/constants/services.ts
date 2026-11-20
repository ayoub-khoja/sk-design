import { PHOTOS } from "./photos";

export type WorkCategory =
  | "enseignes"
  | "habillage"
  | "grand-format"
  | "plaques"
  | "plv"
  | "edition"
  | "impression"
  | "textile"
  | "objets";

export const WORK_CATEGORIES: { id: WorkCategory; label: string }[] = [
  { id: "enseignes", label: "Enseignes Lumineuses & Façades" },
  { id: "habillage", label: "Habillage Vitrine & Véhicules" },
  { id: "grand-format", label: "Bâches & Grand Format" },
  { id: "plaques", label: "Plaques & Trophées" },
  { id: "plv", label: "PLV & Présentoirs" },
  { id: "edition", label: "Édition & Scolaire Sur-Mesure" },
  { id: "impression", label: "Cartes, Étiquettes & Stickers" },
  { id: "textile", label: "Textile Personnalisé" },
  { id: "objets", label: "Porte-clés, Tampons & Objets" },
];

type Photo = { src: string; alt: string };

export type Work = {
  id: string;
  category: WorkCategory;
  title: string;
  description: string;
  /** Mis en avant en tête de sa catégorie */
  featured?: boolean;
  /** La première photo est la photo principale */
  images: readonly Photo[];
};

/**
 * Catalogue par défaut : affiché tant que la base n'est pas branchée,
 * et importé dans MongoDB par scripts/seed.mjs.
 */
export const WORKS: readonly Work[] = [
  {
    id: "caisson",
    category: "enseignes",
    title: "Caissons Lumineux LED & Enseignes de Façade",
    description:
      "Caissons en plexiglas opale avec modules LED étanches, pour une visibilité de jour comme de nuit, et lettres découpées en relief pour les façades.",
    featured: true,
    images: [
      { src: PHOTOS.caissonCremerie, alt: "Caisson lumineux LED rond pour une crèmerie" },
      { src: PHOTOS.facadeCentreFormation, alt: "Façade et lettres en relief — Centre de formation" },
      { src: PHOTOS.caissonConfiserie, alt: "Caisson lumineux intérieur pour une confiserie" },
    ],
  },
  {
    id: "enseignes-boutiques",
    category: "enseignes",
    title: "Enseignes Lumineuses de Boutiques",
    description:
      "Enseignes de devanture éclairées pour commerces et supérettes : lettres lumineuses, logo et coordonnées bien visibles depuis la rue.",
    images: [
      { src: PHOTOS.enseigneShinePlus, alt: "Enseigne lumineuse de la boutique Shine Plus" },
      { src: PHOTOS.enseigneJadou, alt: "Enseigne en lettres lumineuses et bâche imprimée — Supérette Jadou" },
    ],
  },
  {
    id: "vitrine",
    category: "habillage",
    title: "Habillage de Vitrines & Portes",
    description:
      "Vitrophanie, adhésifs imprimés et caissons rétroéclairés pour transformer vitrines, portes et murs intérieurs en supports publicitaires.",
    featured: true,
    images: [
      { src: PHOTOS.vitrineRentDrive, alt: "Habillage de vitrine pour ZR Cars, agence de location de voitures" },
      { src: PHOTOS.porteZrCars, alt: "Porte vitrée habillée pour ZR Cars" },
      { src: PHOTOS.vitrophanieSport, alt: "Vitrophanie rétroéclairée pour une salle de sport" },
      { src: PHOTOS.caissonsGymhouse, alt: "Caissons lumineux muraux pour GymHouse Sayada" },
    ],
  },
  {
    id: "vehicules",
    category: "habillage",
    title: "Marquage & Covering de Véhicules Utilitaires",
    description:
      "Habillage adhésif de véhicules professionnels : logo, coordonnées et visuels imprimés en haute définition, pour une publicité qui circule partout.",
    images: [
      { src: PHOTOS.utilitaireMedAmine, alt: "Marquage adhésif d'un utilitaire — Med Amine Aluminium" },
    ],
  },
  {
    id: "grand-format",
    category: "grand-format",
    title: "Panneaux Publicitaires, Bâches & Stores Imprimés",
    description:
      "Impression grand format pour panneaux d'affichage, bâches tendues et stores de façade. Couleurs éclatantes et encres résistantes au soleil.",
    images: [
      { src: PHOTOS.panneauEurocar, alt: "Panneau publicitaire grand format pour EuroCar" },
      { src: PHOTOS.storeRestaurant, alt: "Store imprimé pour le restaurant Ouled El Bacha" },
    ],
  },
  {
    id: "decoration-murale",
    category: "grand-format",
    title: "Décoration Murale Grand Format",
    description:
      "Impressions murales grand format pour salles de sport, commerces et espaces d'accueil, mises en valeur par un éclairage LED.",
    images: [
      { src: PHOTOS.decorationMuraleSport, alt: "Décoration murale imprimée avec contour LED — Club de sport Sayada" },
    ],
  },
  {
    id: "plaques",
    category: "plaques",
    title: "Plaques de Cabinets, Agences & Bureaux",
    description:
      "Plaques en plexiglas miroir doré ou acrylique imprimé, avec entretoises inox, pour cabinets médicaux, agences et entreprises.",
    images: [
      { src: PHOTOS.plaqueDentaire, alt: "Lettres plexi doré miroir pour un cabinet dentaire" },
      { src: PHOTOS.plaqueGhouila, alt: "Plaque acrylique avec entretoises pour Ghouila Travel" },
    ],
  },
  {
    id: "trophees",
    category: "plaques",
    title: "Trophées & Plaques Commémoratives",
    description:
      "Trophées en acrylique et verre imprimés en couleur pour écoles, olympiades et événements, personnalisés avec logos et textes.",
    images: [
      { src: PHOTOS.tropheeDoha, alt: "Trophée de participation — École Tunisienne de Doha" },
      { src: PHOTOS.tropheeDoha2, alt: "Trophée imprimé — vue de détail" },
    ],
  },
  {
    id: "beach-flags",
    category: "plv",
    title: "Beach Flags & Drapeaux Publicitaires",
    description:
      "Drapeaux en tissu imprimé avec mât aluminium et socle lesté, pour signaler votre commerce, vos événements et vos ouvertures.",
    images: [
      { src: PHOTOS.beachFlags, alt: "Beach flags imprimés pour Shine" },
    ],
  },
  {
    id: "roll-ups",
    category: "plv",
    title: "Roll-ups & Kakémonos",
    description:
      "Bannières enroulables imprimées, faciles à transporter et à installer, pour salons, accueils et événements.",
    images: [
      { src: PHOTOS.rollUpGhouila, alt: "Roll-up imprimé pour Ghouila Travel et Nizar Ghouila Photography" },
    ],
  },
  {
    id: "silhouettes",
    category: "plv",
    title: "Silhouettes & Personnages Découpés en Forex",
    description:
      "Personnages et panneaux découpés à la forme, imprimés en couleur sur PVC Forex, pour l'accueil, les événements ou la sensibilisation sécurité.",
    images: [
      { src: PHOTOS.silhouetteClown, alt: "Personnage clown découpé en Forex avec plateau" },
      { src: PHOTOS.silhouetteSecurite, alt: "Silhouette sécurité découpée en Forex" },
    ],
  },
  {
    id: "presentoirs",
    category: "plv",
    title: "Présentoirs Acryliques & Chevalets QR Code",
    description:
      "Présentoirs de comptoir pour avis Google, menus et paiements, et chevalets de table avec QR code imprimé.",
    images: [
      { src: PHOTOS.presentoirAvisGoogle, alt: "Présentoir avis Google pour le restaurant Oliveto" },
      { src: PHOTOS.chevaletsQr, alt: "Chevalets de table acryliques avec QR code" },
    ],
  },
  {
    id: "journaux",
    category: "edition",
    title: "Journaux de Classe & Registres Personnalisés",
    description:
      "Journaux et cahiers de préparation pour enseignants, avec couverture personnalisée et reliure spirale renforcée.",
    images: [
      { src: PHOTOS.cahierPreparation, alt: "Cahier de préparation des cours personnalisé" },
    ],
  },
  {
    id: "cahiers",
    category: "edition",
    title: "Cahiers Scolaires Personnalisés",
    description:
      "Collections de cahiers pour écoles et instituts : كراس التمارين، دفتر إعداد الدروس, avec logos et charte graphique sur mesure.",
    images: [
      { src: PHOTOS.cahiersCollection, alt: "Collection de cahiers scolaires personnalisés" },
    ],
  },
  {
    id: "cartes-visite",
    category: "impression",
    title: "Cartes de Visite Personnalisées",
    description:
      "Conception et impression de cartes de visite recto-verso, avec QR code, logo et finitions soignées.",
    images: [
      { src: PHOTOS.cartesVisite, alt: "Cartes de visite pour Eco-Bio Spirulina" },
    ],
  },
  {
    id: "etiquettes",
    category: "impression",
    title: "Étiquettes & Stickers en Rouleaux",
    description:
      "Étiquettes adhésives imprimées et découpées en rouleaux pour vos produits, emballages et bocaux.",
    images: [
      { src: PHOTOS.etiquettesBocaux, alt: "Bocaux Bsissa El Kasr avec étiquettes et opercules imprimés" },
      { src: PHOTOS.etiquettesBsissa, alt: "Étiquettes adhésives en rouleaux pour Bsissa El Kasr" },
    ],
  },
  {
    id: "textile",
    category: "textile",
    title: "T-shirts, Polos & Sweats Personnalisés",
    description:
      "Impression de logos et visuels sur polos, t-shirts et sweats pour équipes, commerces, clubs et cadeaux personnalisés.",
    images: [
      { src: PHOTOS.polosBigJJ, alt: "Polos personnalisés pour Big JJ" },
      { src: PHOTOS.sweatHandball, alt: "Sweat à capuche imprimé — handball" },
    ],
  },
  {
    id: "porte-cles",
    category: "objets",
    title: "Porte-clés Personnalisés",
    description:
      "Porte-clés en acrylique ou PVC souple à l'image de votre marque, découpés à la forme de votre logo.",
    images: [
      { src: PHOTOS.porteCleExpress, alt: "Porte-clé PVC Express Rent a Car" },
      { src: PHOTOS.porteClesGuerfel, alt: "Porte-clés acryliques Guerfel Achref Rent a Car" },
      { src: PHOTOS.porteCleAlarabia, alt: "Porte-clé PVC pour Alarabia.com.tn" },
      { src: PHOTOS.porteClesMario, alt: "Porte-clés acryliques Mario et MK Superette" },
      { src: PHOTOS.porteClesGymhouse, alt: "Porte-clés acryliques GymHouse Sayada" },
    ],
  },
];

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
