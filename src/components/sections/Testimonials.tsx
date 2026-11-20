"use client";

import { Star } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/constants/content";
import { ACCENTS } from "@/lib/accents";
import { cn } from "@/lib/utils";

// Rouge, cyan, jaune (ordre de la maquette) ; avatars cyan, magenta, jaune.
const CORNER = [ACCENTS[3], ACCENTS[0], ACCENTS[2]];
const AVATAR = [ACCENTS[0], ACCENTS[1], ACCENTS[2]];

function Stars() {
  return (
    <span className="flex gap-1 text-amber-400" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#fbf9f9] py-12 lg:py-16">
      <InkSwoosh className="-right-16 bottom-0 h-44 w-[45%] opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <SectionHeading align="center" eyebrow="Avis clients" title="Ils parlent de leur projet." underline />
        </AnimateIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={t.name} delay={0.08 * i} className="h-full">
              <figure className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-[0_30px_70px_-40px_rgba(9,9,11,0.35)] ring-1 ring-zinc-100">
                {/* Coin coloré en haut à gauche */}
                <span
                  aria-hidden
                  className={cn("absolute -left-12 -top-12 h-24 w-36 -rotate-[20deg] rounded-[50%]", CORNER[i % 3].bar)}
                />
                <span aria-hidden className="absolute right-7 top-5 font-serif text-7xl leading-none text-zinc-200">
                  &rdquo;
                </span>
                <div className="relative mt-3">
                  <Stars />
                </div>
                <blockquote className="relative mt-5 flex-1 text-base leading-relaxed text-zinc-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-zinc-100 pt-6">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full font-[family-name:var(--font-outfit)] text-base font-bold ring-4",
                      AVATAR[i % 3].solid,
                      AVATAR[i % 3].ring,
                    )}
                  >
                    {t.initial}
                  </span>
                  <span>
                    <span className="block font-bold text-zinc-950">{t.name}</span>
                    <span className="block text-sm text-zinc-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
