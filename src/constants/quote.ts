/** Options du formulaire de demande de devis (page /devis). */

export const QUOTE_OTHER_SERVICE = "Autre / je ne sais pas encore";

export const QUOTE_DEADLINES = [
  "Urgent (moins d'une semaine)",
  "Dans 2 à 3 semaines",
  "Dans un mois ou plus",
  "Pas de date précise",
] as const;

export const QUOTE_INSTALLATION = [
  "Oui, avec pose",
  "Non, livraison seulement",
  "Je ne sais pas",
] as const;

/** Libellés des statuts dans l'espace admin. */
export const QUOTE_STATUS_LABELS = {
  nouveau: "Nouveau",
  "en-cours": "En cours",
  traite: "Traité",
} as const;

export type QuoteFormState = {
  ok?: boolean;
  error?: string;
  /** Erreurs par champ (nom du champ → message) */
  fields?: Record<string, string>;
  /** Valeurs saisies, pour ne rien perdre en cas d'erreur */
  values?: Record<string, string>;
  /** Récapitulatif prêt à envoyer sur WhatsApp */
  summary?: string;
};
