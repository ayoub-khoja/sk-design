"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Cog, Image as ImageIcon, MapPin, Send, ShieldCheck, Zap } from "lucide-react";
import { Hl } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { Button } from "@/components/ui/Button";
import { CLIENTS } from "@/constants/content";
import { PHOTOS } from "@/constants/photos";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { cn, whatsappUrl } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease },
  }),
};

const PROMISES = [
  { icon: Cog, title: "Fabrication", sub: "dans notre atelier", tile: "bg-brand-50 text-brand-600" },
  { icon: ShieldCheck, title: "Qualité", sub: "professionnelle", tile: "bg-ink-cyan/10 text-ink-cyan" },
  { icon: Zap, title: "Délais", sub: "rapides", tile: "bg-ink-yellow/15 text-[#b07f00]" },
  { icon: MapPin, title: "Pose", sub: "dans toute la Tunisie", tile: "bg-ink-magenta/10 text-ink-magenta" },
];

/** Vignettes de métiers à droite du visuel : vraies photos de réalisations. */
const SHOWCASE = [
  {
    src: PHOTOS.caissonCremerie,
    alt: "Caisson lumineux LED rond pour une crèmerie",
    label: "Enseignes lumineuses",
    edge: "border-ink-cyan",
  },
  {
    src: PHOTOS.vitrineRentDrive,
    alt: "Habillage de vitrine pour une agence de location de voitures",
    label: "Habillage vitrine",
    edge: "border-ink-magenta",
  },
  {
    src: PHOTOS.panneauEurocar,
    alt: "Panneau grand format imprimé pour Eurocar",
    label: "Impression grand format",
    edge: "border-ink-yellow",
  },
  {
    src: PHOTOS.porteCleExpress,
    alt: "Porte-clés personnalisé, gravé SK Design",
    label: "Objets personnalisés",
    edge: "border-brand-600",
  },
];

export function Hero() {
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  return (
    <section id="accueil" className="relative overflow-hidden bg-[#fbf9f9]">
      {/* Halos aux couleurs d'encre du logo */}
      <div className="pointer-events-none absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full bg-ink-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-ink-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-ink-yellow/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-14 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10 lg:px-6 lg:pb-16 lg:pt-12">
        <div>
          <motion.p
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />
            Impression &amp; signalétique professionnelle
          </motion.p>

          <motion.h1
            className="mt-5 text-balance font-[family-name:var(--font-outfit)] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl lg:text-[3.05rem] xl:text-[3.45rem]"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Donnez de la <Hl italic={false}>visibilité</Hl>
            <br className="hidden sm:block" /> à votre activité.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Nous concevons, fabriquons et posons vos supports de
            communication : enseignes, habillage de vitrines, impression grand
            format, PLV et objets publicitaires.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Button href={wa} target="_blank" rel="noopener noreferrer" className="!px-6 !py-3.5">
              <Send className="h-4 w-4" />
              Demander un devis gratuit
            </Button>
            <Button href="/realisations" variant="ghost" className="!px-6 !py-3.5">
              <ImageIcon className="h-4 w-4" />
              Voir nos réalisations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.ul
            className="mt-10 grid max-w-xl grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-zinc-200"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {PROMISES.map(({ icon: Icon, title, sub, tile }) => (
              <li key={title} className="flex flex-col items-center gap-2.5 px-2 text-center">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", tile)}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[13px] leading-snug text-zinc-700">
                  <span className="block font-semibold text-zinc-900">{title}</span>
                  {sub}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visuel : logo SK Design + vignettes de vraies réalisations */}
        <motion.div
          className="relative lg:pr-36 xl:pr-40"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <InkSwoosh className="-bottom-16 -left-24 h-48 w-[125%] opacity-90" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-navy shadow-[0_35px_80px_-35px_rgba(9,9,11,0.6)] sm:aspect-[16/11] lg:aspect-square lg:rounded-[2.5rem] lg:rounded-tl-[7rem]">
            <Image
              src="/hero-logo-3d.jpg"
              alt="Logo SK Design en 3D"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-6 text-white sm:bottom-7 sm:left-8">
              <p className="font-[family-name:var(--font-outfit)] text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
                SK DESIGN
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                Impression &amp; Pub
              </p>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-56 lg:-translate-y-1/2 lg:grid-cols-1 xl:w-60">
            {SHOWCASE.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease }}
              >
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
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Ils nous font confiance */}
      <div className="relative bg-white py-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          Ils nous ont confié leur image
        </p>
        <div className="group relative mt-5 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            >
              {CLIENTS.map((client) => (
                <li
                  key={client}
                  className="whitespace-nowrap font-[family-name:var(--font-outfit)] text-xl font-bold tracking-tight text-zinc-300 transition hover:text-zinc-900"
                >
                  {client}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
