"use client";

import Image from "next/image";
import {
  Droplet,
  Film,
  Layers,
  Maximize2,
  Printer,
  Scissors,
  ShieldCheck,
  Sparkle,
  Stamp,
  Tag,
  Timer,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Hl } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/constants/photos";
import { MACHINES } from "@/constants/services";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

const ICONS = { printer: Printer, scissors: Scissors, layers: Layers, stamp: Stamp };

/** Photo réelle d'un travail réalisé avec chaque machine (null = illustration). */
const MACHINE_PHOTOS: ({ src: string; alt: string } | null)[] = [
  { src: PHOTOS.panneauEurocar, alt: "Panneau grand format imprimé pour EuroCar" },
  { src: PHOTOS.plaqueDentaire, alt: "Lettres en plexi doré découpées au laser" },
  { src: PHOTOS.utilitaireMedAmine, alt: "Marquage de véhicule laminé anti-UV" },
  null,
];

const SPEC_ICONS = [
  [Maximize2, Droplet],
  [Layers, Sparkle],
  [ShieldCheck, Film],
  [Timer, Tag],
];

/** Parc machine de l'atelier, avec les capacités techniques. */
export function Atelier() {
  return (
    <section className="relative overflow-hidden bg-[#14121c] py-12 text-white lg:py-16">
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-ink-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-ink-magenta/15 blur-3xl" />
      <InkSwoosh className="-right-10 bottom-0 h-56 w-[60%] opacity-80" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <AnimateIn>
            <SectionHeading
              tone="dark"
              eyebrow="Notre atelier"
              title={
                <>
                  Un parc machine complet,
                  <br />
                  sous <Hl tone="dark">un même toit.</Hl>
                </>
              }
            />
          </AnimateIn>
          <AnimateIn
            delay={0.08}
            className="max-w-sm text-[15px] leading-relaxed text-white/65 lg:border-l lg:border-white/15 lg:pl-8"
          >
            Impression, découpe, lamination et gravure : tout est fabriqué
            chez nous, pour des finitions maîtrisées et des délais courts.
          </AnimateIn>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {MACHINES.map((machine, i) => {
            const Icon = ICONS[machine.icon];
            const accent = accentAt(i);
            const photo = MACHINE_PHOTOS[i];
            return (
              <AnimateIn key={machine.title} delay={0.06 * i} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white/[0.05] ring-1 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]",
                    accent.ring,
                  )}
                >
                  <span className={cn("absolute inset-x-0 top-0 z-10 h-1", accent.bar)} />
                  <div className="relative h-40 overflow-hidden">
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(232,49,138,0.45),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(30,155,224,0.45),transparent_55%)]">
                        <Icon className="h-16 w-16 text-white/80" strokeWidth={1.2} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a26] via-[#1c1a26]/30 to-transparent" />
                  </div>

                  <div className="relative -mt-7 flex flex-1 flex-col px-6 pb-6">
                    <span className={cn("flex h-12 w-12 items-center justify-center rounded-xl shadow-lg", accent.solid)}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-outfit)] text-lg font-bold">
                      {machine.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                      {machine.description}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                      {machine.specs.map((spec, s) => {
                        const SpecIcon = SPEC_ICONS[i]?.[s] ?? Sparkle;
                        return (
                          <div key={spec.label} className={cn(s === 1 && "border-l border-white/10 pl-4")}>
                            <SpecIcon className="h-4 w-4 text-white/50" />
                            <dt className="mt-2 text-[11px] text-white/45">{spec.label}</dt>
                            <dd className="mt-0.5 text-sm font-bold leading-snug">{spec.value}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                </article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
