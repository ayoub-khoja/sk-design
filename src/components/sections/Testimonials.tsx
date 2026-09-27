"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { TESTIMONIALS } from "@/constants/content";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/30 via-white to-white py-14 lg:py-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <AnimateIn>
            <Badge variant="soft">Confiance &amp; Avis Clients</Badge>
            <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Ce que disent nos partenaires
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1} className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <span className="flex gap-0.5 text-brand-600">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            4.9 / 5 sur chantiers livrés
          </AnimateIn>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={t.name} delay={0.1 * i}>
              <motion.blockquote
                whileHover={{ y: -4 }}
                className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5 text-brand-600">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm italic leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {t.initial}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
