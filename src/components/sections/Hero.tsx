import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cog, Image as ImageIcon, MapPin, Send, ShieldCheck, Zap } from "lucide-react";
import { Hl } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { Button } from "@/components/ui/Button";
import { PHOTOS } from "@/constants/photos";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const PROMISES = [
  { icon: Cog, title: "Fabrication", sub: "dans notre atelier", tile: "bg-brand-50 text-brand-600" },
  { icon: ShieldCheck, title: "Qualité", sub: "professionnelle", tile: "bg-ink-cyan/10 text-[#0b6fa8]" },
  { icon: Zap, title: "Délais", sub: "rapides", tile: "bg-ink-yellow/15 text-[#8a6400]" },
  { icon: MapPin, title: "Pose", sub: "dans toute la Tunisie", tile: "bg-ink-magenta/10 text-[#b81d68]" },
];

/** Vignettes de métiers à droite du visuel : vraies photos de réalisations. */
const SHOWCASE = [
  {
    src: PHOTOS.caissonCremerie,
    alt: "Enseigne lumineuse LED ronde (caisson lumineux) réalisée pour une crèmerie",
    label: "Enseignes lumineuses",
    edge: "border-ink-cyan",
  },
  {
    src: PHOTOS.vitrineRentDrive,
    alt: "Habillage de vitrine en vinyle imprimé pour une agence de location de voitures",
    label: "Habillage vitrine",
    edge: "border-ink-magenta",
  },
  {
    src: PHOTOS.panneauEurocar,
    alt: "Panneau publicitaire en impression grand format pour Eurocar à Sayada",
    label: "Impression grand format",
    edge: "border-ink-yellow",
  },
  {
    src: PHOTOS.porteCleExpress,
    alt: "Porte-clés publicitaire personnalisé, objet gravé par SK Design",
    label: "Objets personnalisés",
    edge: "border-brand-600",
  },
];

/** Délai d'animation CSS (le contenu reste visible pendant l'animation). */
const delay = (i: number) => ({ animationDelay: `${i * 70}ms` });

/** Composant serveur : aucun JavaScript envoyé au navigateur pour le hero. */
export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-[#fbf9f9]">
      {/* Halos aux couleurs d'encre du logo */}
      <div className="pointer-events-none absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full bg-ink-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-ink-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-ink-yellow/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-14 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10 lg:px-6 lg:pb-16 lg:pt-12">
        <div>
          {/* Titre principal (h1) : mots-clés + ville, puis le slogan */}
          <h1>
            <span
              className="rise-in inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600"
              style={delay(0)}
            >
              <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />
              Impression &amp; signalétique professionnelle · {SITE.address.city}, {SITE.address.region}
            </span>
            <span
              className="rise-in mt-5 block text-balance font-[family-name:var(--font-outfit)] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl lg:text-[3.05rem] xl:text-[3.45rem]"
              style={delay(1)}
            >
              Donnez de la <Hl italic={false}>visibilité</Hl>
              <br className="hidden sm:block" /> à votre activité.
            </span>
          </h1>

          <p
            className="rise-in mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg"
            style={delay(2)}
          >
            Nous concevons, fabriquons et posons vos supports de
            communication : enseignes, habillage de vitrines, impression grand
            format, PLV et objets publicitaires.
          </p>

          <div className="rise-in mt-8 flex flex-wrap items-center gap-3" style={delay(3)}>
            <Button href="/devis" className="!px-6 !py-3.5">
              <Send className="h-4 w-4" />
              Demander un devis gratuit
            </Button>
            <Button href="/realisations" variant="ghost" className="!px-6 !py-3.5">
              <ImageIcon className="h-4 w-4" />
              Voir nos réalisations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <ul
            className="rise-in mt-10 grid max-w-xl grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-zinc-200"
            style={delay(4)}
          >
            {PROMISES.map(({ icon: Icon, title, sub, tile }) => (
              <li key={title} className="flex flex-col items-center gap-2.5 px-2 text-center">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", tile)}>
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="text-[13px] leading-snug text-zinc-700">
                  <span className="block font-semibold text-zinc-900">{title}</span>
                  {sub}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visuel : logo SK Design + vignettes de vraies réalisations */}
        <div className="rise-in relative lg:pr-36 xl:pr-40" style={delay(2)}>
          <InkSwoosh className="-bottom-16 -left-24 h-48 w-[125%] opacity-90" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-navy shadow-[0_35px_80px_-35px_rgba(9,9,11,0.6)] sm:aspect-[16/11] lg:aspect-square lg:rounded-[2.5rem] lg:rounded-tl-[7rem]">
            <Image
              src="/hero-logo-3d.jpg"
              alt="Logo SK Design en 3D, atelier d'impression et de publicité à Sayada"
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div aria-hidden className="absolute bottom-5 left-6 text-white sm:bottom-7 sm:left-8">
              <p className="font-[family-name:var(--font-outfit)] text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
                SK DESIGN
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/85">
                Impression &amp; Pub
              </p>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-56 lg:-translate-y-1/2 lg:grid-cols-1 xl:w-60">
            {SHOWCASE.map((item, i) => (
              <li key={item.label} className="fade-rise-in" style={{ animationDelay: `${350 + i * 100}ms` }}>
                <Link
                  href="/realisations"
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border-r-4 bg-white/95 p-2 pr-3 shadow-[0_18px_40px_-18px_rgba(9,9,11,0.45)] ring-1 ring-zinc-900/5 backdrop-blur transition duration-300 hover:-translate-x-1 lg:p-2.5",
                    item.edge,
                  )}
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-100 lg:h-16 lg:w-16">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="64px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-[13px] font-bold leading-tight text-zinc-900 lg:text-sm">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
