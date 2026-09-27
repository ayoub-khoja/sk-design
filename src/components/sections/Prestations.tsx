"use client";

import {
  Building2,
  Lightbulb,
  Printer,
  Scissors,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { PRESTATIONS } from "@/constants/content";
import { motion } from "framer-motion";

const ICONS = {
  lightbulb: Lightbulb,
  building: Building2,
  scissors: Scissors,
  printer: Printer,
};

export function Prestations() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <Badge variant="soft">Toutes Nos Prestations</Badge>
          <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Un Parc Machine Complet pour Vos Projets
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            De la modélisation 3D à la pose sur site : un atelier intégré pour
            accompagner chaque étape de votre communication visuelle.
          </p>
        </AnimateIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRESTATIONS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <AnimateIn key={item.title} delay={0.08 * i}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-6 transition hover:bg-white hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm ring-1 ring-slate-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-wide text-brand-600">
                    {item.label}
                  </p>
                </motion.article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
