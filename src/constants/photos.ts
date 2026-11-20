/**
 * Photos réelles des réalisations SK Design.
 * Fichiers dans /public/realisations/<catégorie>/ — servis à /realisations/...
 */
const R = "/realisations";

export const PHOTOS = {
  // Enseignes & façades
  caissonCremerie: `${R}/enseignes/caisson-lumineux-cremerie.jpg`,
  facadeCentreFormation: `${R}/enseignes/facade-centre-formation.jpg`,
  storeRestaurant: `${R}/enseignes/store-restaurant-ouled-bacha.jpg`,
  caissonConfiserie: `${R}/enseignes/caisson-lumineux-confiserie.jpg`,
  enseigneShinePlus: `${R}/enseignes/enseigne-shine-plus.jpg`,
  enseigneJadou: `${R}/enseignes/enseigne-superette-jadou.jpg`,

  // Habillage vitrine
  vitrineRentDrive: `${R}/habillage-vitrine/vitrine-rent-drive.jpg`,
  vitrophanieSport: `${R}/habillage-vitrine/vitrophanie-salle-sport.jpg`,
  porteZrCars: `${R}/habillage-vitrine/porte-zr-cars.jpg`,
  caissonsGymhouse: `${R}/habillage-vitrine/caissons-lumineux-gymhouse.jpg`,

  // Véhicules & grand format
  utilitaireMedAmine: `${R}/covering-vehicule/utilitaire-med-amine-aluminium.jpg`,
  panneauEurocar: `${R}/grand-format/panneau-eurocar.jpg`,
  decorationMuraleSport: `${R}/grand-format/decoration-murale-club-sport.jpg`,

  // Plaques & trophées
  plaqueDentaire: `${R}/plaques-trophees/plaque-cabinet-dentaire.jpg`,
  plaqueGhouila: `${R}/plaques-trophees/plaque-ghouila-travel.jpg`,
  tropheeDoha: `${R}/plaques-trophees/trophee-ecole-tunisienne-doha.jpg`,
  tropheeDoha2: `${R}/plaques-trophees/trophee-ecole-tunisienne-doha-2.jpg`,

  // PLV
  beachFlags: `${R}/plv/beach-flags-shine.jpg`,
  silhouetteSecurite: `${R}/plv/silhouette-securite-forex.jpg`,
  presentoirAvisGoogle: `${R}/plv/presentoir-avis-google.jpg`,
  chevaletsQr: `${R}/plv/chevalets-qr-code.jpg`,
  rollUpGhouila: `${R}/plv/roll-up-ghouila.jpg`,
  silhouetteClown: `${R}/plv/silhouette-clown-forex.jpg`,

  // Édition scolaire
  cahierPreparation: `${R}/edition-scolaire/cahier-preparation-rouge.jpg`,
  cahiersCollection: `${R}/edition-scolaire/cahiers-scolaires-collection.jpg`,

  // Impression
  cartesVisite: `${R}/impression/cartes-visite-eco-bio.jpg`,
  etiquettesBsissa: `${R}/impression/etiquettes-bsissa.jpg`,
  etiquettesBocaux: `${R}/impression/etiquettes-bocaux-bsissa.jpg`,

  // Textile
  polosBigJJ: `${R}/textile/polos-big-jj.jpg`,
  sweatHandball: `${R}/textile/sweat-handball.png`,

  // Objets publicitaires
  porteCleAlarabia: `${R}/objets-publicitaires/porte-cle-alarabia.jpg`,
  porteClesMario: `${R}/objets-publicitaires/porte-cles-mario-mk.jpg`,
  porteClesGymhouse: `${R}/objets-publicitaires/porte-cles-gymhouse.jpg`,
  porteClesGuerfel: `${R}/objets-publicitaires/porte-cles-guerfel-achref.jpg`,
  porteCleExpress: `${R}/objets-publicitaires/porte-cle-express-rent-a-car.jpg`,
} as const;
