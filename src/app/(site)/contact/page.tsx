import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Location } from "@/components/sections/Location";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact : imprimerie et enseignes à Sayada, Monastir",
  description:
    "Contactez SK Design, atelier d'impression et de publicité à Sayada (Monastir) : téléphone, WhatsApp, email, horaires et plan d'accès. Enseignes LED, vitrines, impression grand format partout en Tunisie.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | SK Design, impression & publicité à Sayada",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={`Contact · ${SITE.address.city}, ${SITE.address.region}`}
        title="Contactez votre atelier"
        highlight="SK Design"
      >
        <p>
          Une question, un projet d&apos;enseigne ou d&apos;impression ?
          Appelez-nous, écrivez-nous sur WhatsApp ou passez à l&apos;atelier
          de {SITE.address.city}.{" "}
          <Link
            href="/devis"
            className="inline-flex items-center gap-1 font-semibold text-brand-600 underline-offset-4 hover:underline"
          >
            Demander un devis en ligne
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </p>
      </PageHero>
      <ContactCTA />
      <Location />
    </>
  );
}
