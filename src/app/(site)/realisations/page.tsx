import type { Metadata } from "next";
import { Box, Camera, Image as ImageIcon, Layers } from "lucide-react";
import { Process } from "@/components/realisations/Process";
import { RealisationsGallery } from "@/components/realisations/RealisationsGallery";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { InkUnderline } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { accentAt } from "@/lib/accents";
import { getPublishedCatalog } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos Réalisations & Services | SK Design",
  description:
    "Galerie photo des réalisations et services SK Design : enseignes lumineuses, habillage de vitrines, covering, plaques, PLV, textile et objets personnalisés en Tunisie.",
  alternates: { canonical: "/realisations" },
};

// Régénérée immédiatement après chaque modification dans /admin,
// et au plus tard toutes les 5 minutes.
export const revalidate = 300;

export default async function RealisationsPage() {
  const catalog = await getPublishedCatalog();
  const works = catalog.works.filter((w) => w.images.length > 0);
  const photoCount = works.reduce((n, w) => n + w.images.length, 0);
  const categoryCount = new Set(works.map((w) => w.categoryId)).size;

  const stats = [
    { value: works.length, label: "Projets livrés", icon: Box },
    { value: photoCount, label: "Photos réelles", icon: ImageIcon },
    { value: categoryCount, label: "Métiers", icon: Layers },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#fbf9f9]">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ink-cyan/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-10 h-64 w-64 rounded-full bg-ink-magenta/10 blur-3xl" />
        <InkSwoosh className="-right-10 bottom-0 h-56 w-[55%] opacity-80" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 lg:px-6 lg:pb-12 lg:pt-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-600">
                <Camera className="h-3.5 w-3.5" />
                Photos réelles de nos chantiers
              </span>
              <h1 className="mt-5 font-[family-name:var(--font-outfit)] text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                Nos{" "}
                <span className="relative inline-block pb-2">
                  <span className="bg-gradient-to-r from-brand-600 via-ink-magenta to-ink-cyan bg-clip-text text-transparent">
                    Réalisations
                  </span>
                  <InkUnderline className="absolute -bottom-2 left-[8%] w-[84%]" />
                </span>
              </h1>
              <p className="arabic mt-5 text-lg text-brand-600 sm:text-xl">
                أعمالنا الحقيقية: واجهات، لافتات مضيئة، مطبوعات وهدايا إشهارية
              </p>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-lg">
                Enseignes, vitrines, véhicules, plaques, PLV, textile… Chaque
                photo est un projet fabriqué dans notre atelier et livré à un
                client en Tunisie. Choisissez un métier ci-dessous, puis cliquez
                sur un projet pour voir toutes ses photos en grand.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-5 sm:items-center lg:items-end">
              <div className="grid grid-cols-3 divide-x divide-zinc-100 rounded-3xl bg-white px-2 py-6 shadow-[0_30px_70px_-35px_rgba(9,9,11,0.35)] ring-1 ring-zinc-100">
                {stats.map(({ value, label, icon: Icon }, i) => (
                  <div key={label} className="flex flex-col items-center px-5 text-center sm:px-8">
                    <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", accentAt(i).soft, accentAt(i).text)}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className={cn("mt-3 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tabular-nums", accentAt(i).text)}>
                      {value}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="galerie" className="scroll-mt-24 bg-white pb-12 pt-10 lg:pb-16 lg:pt-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <RealisationsGallery catalog={catalog} />

          <div className="relative mt-12 flex flex-col items-center gap-4 overflow-hidden rounded-[1.75rem] bg-zinc-50 px-6 py-10 text-center ring-1 ring-zinc-200/70 sm:flex-row sm:justify-between sm:text-left lg:px-10">
            <div>
              <p className="font-[family-name:var(--font-outfit)] text-xl font-bold text-zinc-950 sm:text-2xl">
                Encore plus de réalisations sur nos réseaux
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Nouveaux chantiers, coulisses de l&apos;atelier et vidéos de pose.
              </p>
            </div>
            <SocialLinks />
          </div>
        </div>
      </section>

      <Process />
      <ContactCTA />
    </>
  );
}
