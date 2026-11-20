import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité | SK Design",
  description: "Comment SK Design traite vos données lorsque vous utilisez le site.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updated="novembre 2026"
      current="/confidentialite"
    >
      <LegalSection title="En résumé">
        <p>
          Ce site ne vous demande pas de créer de compte et ne contient pas de
          formulaire qui enregistre vos données. Il n&apos;utilise ni publicité
          ni outil de suivi.
        </p>
      </LegalSection>

      <LegalSection title="Quand vous nous contactez">
        <p>
          Les boutons « WhatsApp », « Appeler » et l&apos;adresse email ouvrent
          directement l&apos;application concernée sur votre appareil. Les
          informations que vous nous envoyez (nom, numéro, photos, dimensions…)
          servent uniquement à établir votre devis et à réaliser votre
          commande. Elles ne sont ni vendues ni cédées à des tiers.
        </p>
        <p>
          Les échanges par WhatsApp sont aussi soumis à la politique de
          confidentialité de WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Le site public ne dépose aucun cookie publicitaire ni de mesure
          d&apos;audience. Un seul cookie technique est utilisé, uniquement
          dans l&apos;espace d&apos;administration réservé à l&apos;équipe SK
          Design, pour garder la session de connexion.
        </p>
        <p>
          La carte Google Maps de la page d&apos;accueil n&apos;est chargée
          que si vous cliquez sur « Afficher la carte ». Google peut alors
          déposer ses propres cookies, selon sa politique de confidentialité.
        </p>
      </LegalSection>

      <LegalSection title="Réseaux sociaux">
        <p>
          Les liens vers Facebook et Instagram sont de simples liens : aucun
          module de ces réseaux n&apos;est chargé sur le site tant que vous ne
          cliquez pas dessus.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous pouvez demander à consulter, corriger ou supprimer les
          informations que vous nous avez transmises en écrivant à{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-zinc-900 underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>{" "}
          ou en appelant le {SITE.phones[0]}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
