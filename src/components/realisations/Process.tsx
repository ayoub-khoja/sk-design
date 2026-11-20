"use client";

import { Factory, MonitorSmartphone, Ruler, Truck } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Hl } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STEPS } from "@/constants/services";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Ruler, MonitorSmartphone, Factory, Truck];

/** Les 4 étapes d'un projet, de la prise de cotes à la pose. */
export function Process() {
  return (
    <section className="relative overflow-hidden bg-[#fbf9f9] py-12 lg:py-16">
      <InkSwoosh className="-right-16 bottom-0 h-48 w-[55%] opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <SectionHeading
            align="center"
            eyebrow="Comment ça marche"
            title={
              <>
                De votre idée à la pose, <Hl>en 4 étapes.</Hl>
              </>
            }
          />
        </AnimateIn>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Fil qui relie les numéros (grand écran) */}
          <span aria-hidden className="ink-ribbon absolute left-[12.5%] right-[12.5%] top-0 hidden h-0.5 opacity-70 lg:block" />
          {STEPS.map((step, i) => {
            const accent = accentAt(i);
            const Icon = STEP_ICONS[i] ?? Factory;
            return (
              <AnimateIn key={step.n} delay={0.08 * i} className="h-full">
                <li className="relative h-full pt-7">
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl font-[family-name:var(--font-outfit)] text-xl font-extrabold shadow-lg ring-4 ring-white",
                      accent.solid,
                    )}
                  >
                    {step.n}
                  </span>
                  <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[1.75rem] bg-white px-6 pb-10 pt-10 text-center shadow-[0_25px_60px_-35px_rgba(9,9,11,0.35)] ring-1 ring-zinc-100">
                    <span className={cn("flex h-20 w-20 items-center justify-center rounded-[1.75rem]", accent.soft)}>
                      <Icon className={cn("h-9 w-9", accent.text)} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-6 font-[family-name:var(--font-outfit)] text-lg font-bold text-zinc-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{step.text}</p>
                    {/* Coin coloré */}
                    <span
                      aria-hidden
                      className={cn("absolute -bottom-10 -right-10 h-24 w-32 rotate-[-18deg] rounded-[50%]", accent.bar)}
                    />
                  </div>
                </li>
              </AnimateIn>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
