"use client";

import Image from "next/image";
import { CheckCircle2, Clock, PenTool, Sun, UserRound } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_FEATURES } from "@/constants/content";
import { PHOTOS } from "@/constants/photos";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

const ICONS = {
  clock: Clock,
  pen: PenTool,
  sun: Sun,
  user: UserRound,
};

export function WhyUs() {
  return (
    <section id="pourquoi" className="relative scroll-mt-24 overflow-hidden bg-[#fbf9f9] py-12 lg:py-16">
      <InkSwoosh className="-right-16 bottom-0 h-44 w-[50%] opacity-60" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-6">
        {/* Photo encadrée, avec un aplat rouge incliné derrière */}
        <AnimateIn className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="absolute -right-3 -top-3 h-[92%] w-[92%] rotate-3 rounded-[2rem] bg-gradient-to-br from-brand-600 to-ink-magenta opacity-90" />
          <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[2rem] bg-zinc-200 shadow-2xl ring-4 ring-white">
            <Image
              src={PHOTOS.facadeCentreFormation}
              alt="Façade et lettres en relief réalisées par SK Design pour un centre de formation"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-2xl bg-zinc-950/85 p-4 text-white backdrop-blur">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <span className="leading-snug">
                <span className="block text-sm font-semibold">
                  Habillage de façade — Centre de formation
                </span>
                <span className="block text-xs text-white/70">
                  Lettres en relief, enseigne et signalétique, posées par notre équipe.
                </span>
              </span>
            </div>
          </div>
        </AnimateIn>

        <div>
          <AnimateIn>
            <SectionHeading
              eyebrow="Pourquoi SK Design"
              title={
                <>
                  Un seul interlocuteur,
                  <br />
                  de l&apos;idée à la pose.
                </>
              }
              underline
              lede="Production 100 % atelier, contrôle qualité à chaque étape et suivi direct avec l'équipe qui fabrique votre projet."
            />
          </AnimateIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {WHY_FEATURES.map((feature, i) => {
              const Icon = ICONS[feature.icon];
              const accent = accentAt(i);
              return (
                <AnimateIn key={feature.title} delay={0.06 * i} className="h-full">
                  <div className="relative flex h-full gap-4 rounded-2xl bg-white p-5 shadow-[0_20px_50px_-35px_rgba(9,9,11,0.35)] ring-1 ring-zinc-100">
                    <span className={cn("absolute left-5 top-0 h-1 w-12 rounded-b-full", accent.bar)} />
                    <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", accent.soft, accent.text)}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-zinc-950">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
