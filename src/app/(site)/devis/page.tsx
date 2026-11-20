import type { Metadata } from "next";
import { Clock, Mail, PencilRuler, Phone, Ruler, Truck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { WhatsAppIcon } from "@/components/ui/SocialLinks";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { getPublishedCatalog } from "@/lib/data/catalog";
import { telHref, whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Demande de devis gratuit : enseigne, impression, vitrine",
  description:
    "Demandez votre devis gratuit en ligne : enseigne lumineuse LED, habillage de vitrine, impression grand format, PLV, objets publicitaires. Atelier SK Design à Sayada, Monastir, pose dans toute la Tunisie.",
  alternates: { canonical: "/devis" },
  openGraph: {
    title: "Devis gratuit en ligne | SK Design, impression & publicité",
    url: "/devis",
  },
};

export const revalidate = 300;

const STEPS = [
  {
    icon: PencilRuler,
    title: "Vous décrivez votre projet",
    text: "Quelques lignes suffisent : le support, les dimensions, votre délai.",
  },
  {
    icon: Ruler,
    title: "Nous vous rappelons",
    text: "Conseil sur les matériaux, prise de mesures et simulation si besoin.",
  },
  {
    icon: Truck,
    title: "Fabrication et pose",
    text: "Production dans notre atelier, puis livraison ou pose partout en Tunisie.",
  },
];

export default async function DevisPage() {
  const { categories } = await getPublishedCatalog();
  const services = categories.map((c) => ({ slug: c.slug, name: c.name }));
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  return (
    <>
      <PageHero
        eyebrow="Devis gratuit · Sans engagement"
        title="Demandez votre devis"
        highlight="gratuit"
      >
        <p>
          Enseigne lumineuse, habillage de vitrine, impression grand format,
          PLV ou objets personnalisés : décrivez votre projet, notre atelier
          de {SITE.address.city} vous répond avec un prix clair.
        </p>
      </PageHero>

      <section className="bg-white pb-14 pt-10 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:px-6">
          <QuoteForm services={services} />

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[1.75rem] bg-[#fbf9f9] p-6 ring-1 ring-zinc-200/70 sm:p-8">
              <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-zinc-950">
                Comment ça marche ?
              </h2>
              <ol className="mt-5 space-y-5">
                {STEPS.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                      <Icon aria-hidden className="h-5 w-5" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold">
                        {i + 1}
                      </span>
                    </span>
                    <span>
                      <span className="block font-semibold text-zinc-900">{title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-zinc-600">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.75rem] bg-[#121018] p-6 text-white sm:p-8">
              <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold">
                Vous préférez nous parler ?
              </h2>
              <p className="mt-2 text-sm text-zinc-300">
                Envoyez une photo de votre façade sur WhatsApp ou appelez l&apos;atelier.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#15803d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#166534]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp : {SITE.phones[0]}
                </a>
                <a
                  href={telHref(SITE.phones[1])}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
                >
                  <Phone aria-hidden className="h-4 w-4" />
                  Appeler : {SITE.phones[1]}
                </a>
              </div>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <Clock aria-hidden className="h-4 w-4 text-brand-500" />
                  Lun – Sam : {SITE.openingHours.open} – {SITE.openingHours.close}
                </li>
                <li className="flex items-center gap-2">
                  <Mail aria-hidden className="h-4 w-4 text-brand-500" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-white">
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
