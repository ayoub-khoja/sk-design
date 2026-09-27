"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Check, Eye, Phone, Play, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FEATURES_BAR } from "@/constants/content";
import { SITE } from "@/constants/site";
import { telHref } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,30,30,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.04),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-6 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-6 lg:pt-14">
        <div>
          <motion.div
            className="flex flex-wrap gap-2"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Badge variant="soft">Atelier Certifié • Impression &amp; Publicité</Badge>
            <Badge variant="gray">🇹🇳 Service National</Badge>
          </motion.div>

          <motion.h1
            className="mt-5 font-[family-name:var(--font-outfit)] text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Votre Image de Marque en{" "}
            <span className="text-brand-600">Grand Format</span> &amp; Haute
            Définition
          </motion.h1>

          <motion.p
            className="arabic mt-4 text-base text-brand-600 sm:text-lg"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            حلول الطباعة الرقمية، الواجهات الإشهارية وتجهيز المحلات التجارية
          </motion.p>

          <motion.p
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Atelier tunisien spécialisé dans la fabrication d&apos;enseignes
            lumineuses pour banques et agences (Ria, Western Union, MoneyGram),
            habillage de façades, plaques prestige et papeterie personnalisée.
            Devis gratuit, fabrication express et pose sur tout le territoire.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Button href="#contact">
              <Play className="h-4 w-4 fill-current" />
              Demander un devis immédiat
            </Button>
            <Button href="/services" variant="ghost">
              <Eye className="h-4 w-4" />
              Explorer nos réalisations
            </Button>
            <a
              href={telHref(SITE.phones[0])}
              className="inline-flex items-center gap-2 px-2 text-sm font-semibold text-slate-700 transition hover:text-brand-600"
            >
              <Phone className="h-4 w-4 text-brand-600" />
              Appel direct atelier
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/80"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85"
                alt="Enseignes lumineuses LED atelier SK Design"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-2 top-4 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:right-4 sm:top-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Truck className="h-4 w-4" />
            </span>
            Livraison &amp; Pose Toute la Tunisie
          </motion.div>

          <motion.div
            className="absolute -bottom-4 left-3 right-3 z-10 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:left-6 sm:right-6 sm:p-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="min-w-0 flex-1">
              <span className="inline-block rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                Enseigne Caisson Lumineux
              </span>
              <p className="mt-1.5 truncate text-sm font-bold text-slate-900">
                Ria • MoneyGram • Western Union
              </p>
              <p className="text-xs text-slate-500">
                Fabrication thermoformée LED haute visibilité
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-10 border-t border-slate-100 bg-slate-50/80">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {FEATURES_BAR.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center sm:text-left"
            >
              <p
                className={`text-lg font-extrabold ${
                  "accent" in item && item.accent
                    ? "text-brand-600"
                    : "text-slate-900"
                }`}
              >
                {item.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
