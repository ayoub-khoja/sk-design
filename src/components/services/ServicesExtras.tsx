"use client";

import { Layers, MessageCircle, Phone, Printer, Scissors, Stamp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { MACHINES, STEPS } from "@/constants/services";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { telHref, whatsappUrl } from "@/lib/utils";

const ICONS = {
  printer: Printer,
  scissors: Scissors,
  layers: Layers,
  stamp: Stamp,
};

export function MachinePark() {
  return (
    <section className="bg-[#f6f7f9] py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <AnimateIn>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">
              Équipements industriels haute précision
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Notre Parc Machine &amp; Capacités Techniques
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.08} className="max-w-sm text-sm leading-relaxed text-slate-500">
            Un atelier autonome équipé de tables numériques de pointe pour
            garantir des finitions irréprochables et des délais d&apos;exécution
            express.
          </AnimateIn>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MACHINES.map((machine, i) => {
            const Icon = ICONS[machine.icon];
            return (
              <AnimateIn key={machine.title} delay={0.06 * i}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {machine.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {machine.description}
                  </p>
                  <dl className="mt-5 space-y-2 rounded-xl bg-slate-50 px-3 py-3 text-xs">
                    {machine.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-3">
                        <dt className="text-slate-400">{spec.label}</dt>
                        <dd className="text-right font-semibold text-slate-800">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Methodology() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <div className="rounded-[1.5rem] bg-[#f4f5f7] px-5 py-8 sm:px-8">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
              Méthodologie SK Design
            </p>
            <h2 className="mt-2 text-center font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Comment se déroule votre projet publicitaire ?
            </h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                      "accent" in step && step.accent
                        ? "bg-brand-600"
                        : "bg-zinc-900"
                    }`}
                  >
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

export function ServicesBanner() {
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  return (
    <section className="bg-white pb-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <div className="rounded-[1.5rem] bg-black px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide">
                  <Zap className="h-3 w-3" />
                  Réponse en moins de 2h
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-extrabold leading-tight sm:text-4xl">
                  Un projet publicitaire ou d&apos;imprimerie en tête ?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Envoyez-nous vos dimensions, croquis ou maquettes vectorielles
                  via WhatsApp ou par téléphone pour une étude de faisabilité et
                  un chiffrage immédiat sans engagement.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C61A21] px-5 py-3.5 text-sm font-semibold transition hover:bg-[#a8161c]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contacter sur WhatsApp ({SITE.phones[0]})
                </a>
                <a
                  href={telHref(SITE.phones[1])}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-white"
                >
                  <Phone className="h-4 w-4" />
                  Appel Direct ({SITE.phones[1]})
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
