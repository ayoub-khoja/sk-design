import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";
import { SITE, SOCIAL_LINKS } from "@/constants/site";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions légales | SK Design",
  description: "Mentions légales du site SK Design — Impression & Publicité.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updated="novembre 2026" current="/mentions-legales">
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>{SITE.url.replace(/^https?:\/\//, "")}</strong> est
          édité par <strong>SK Design</strong> ({SITE.taglineAr}), atelier
          d&apos;impression numérique et de fabrication publicitaire en Tunisie.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Téléphone :{" "}
            {SITE.phones.map((p, i) => (
              <span key={p}>
                {i > 0 && " / "}
                <a href={telHref(p)} className="font-medium text-zinc-900 underline-offset-4 hover:underline">
                  {p}
                </a>
              </span>
            ))}
          </li>
          <li>
            Email :{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-zinc-900 underline-offset-4 hover:underline">
              {SITE.email}
            </a>
          </li>
          <li>Zone d&apos;intervention : {SITE.zone}</li>
        </ul>
      </LegalSection>

      <LegalSection title="Activité">
        <p>
          Conception et fabrication d&apos;enseignes lumineuses, habillage de
          vitrines et de véhicules, impression grand format, plaques et
          trophées, PLV, édition scolaire, textile et objets publicitaires
          personnalisés.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les textes, la mise en page et les photographies de réalisations
          publiés sur ce site appartiennent à SK Design. Toute reproduction sans
          autorisation écrite est interdite.
        </p>
        <p>
          Les logos et marques visibles sur les photos de réalisations
          appartiennent à leurs propriétaires respectifs, clients de
          l&apos;atelier. Ils sont présentés uniquement pour illustrer les
          travaux réalisés.
        </p>
      </LegalSection>

      <LegalSection title="Liens externes">
        <p>
          Le site renvoie vers des services tiers (WhatsApp,{" "}
          {SOCIAL_LINKS.map((s) => s.label).join(", ")}). SK Design n&apos;est
          pas responsable du contenu ni des pratiques de ces services.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Les informations du site (prestations, délais, matériaux) sont
          données à titre indicatif. Seul le devis remis par l&apos;atelier
          engage SK Design.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
