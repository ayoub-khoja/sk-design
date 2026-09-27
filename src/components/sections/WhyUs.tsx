"use client";

import { CheckCircle2, Clock, PenTool, Sun, UserRound, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { WHY_FEATURES } from "@/constants/content";

const ICONS = {
  clock: Clock,
  pen: PenTool,
  sun: Sun,
  user: UserRound,
};

export function WhyUs() {
  return (
    <section id="pourquoi" className="relative overflow-hidden bg-slate-50 py-14 lg:py-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-50/40 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14 lg:px-6">
        <AnimateIn>
          <Badge variant="soft">
            <Wrench className="h-3.5 w-3.5" />
            Artisanat &amp; Technologie Industrielle
          </Badge>
          <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Pourquoi les Entreprises Tunisiennes Choisissent SK Design ?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Production 100% atelier, contrôle qualité à chaque étape et suivi
            direct avec nos maîtres d&apos;atelier. Une chaîne complète de la
            conception graphique à la pose.
          </p>
          <div className="mt-6 flex gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-slate-200/80 backdrop-blur">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <p className="text-sm leading-relaxed text-slate-600">
              Garantie sur modules LED et adhésifs. Tous nos caissons
              d&apos;enseignes bénéficient d&apos;une protection étanche et
              d&apos;une finition atelier contrôlée avant livraison.
            </p>
          </div>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-2">
          {WHY_FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <AnimateIn key={feature.title} delay={0.08 * i}>
                <motion.article
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.description}
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
