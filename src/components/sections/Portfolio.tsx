"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, CheckCircle2 } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { PORTFOLIO } from "@/constants/content";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <section id="realisations" className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <AnimateIn>
            <Badge variant="gray">
              <Camera className="h-3.5 w-3.5" />
              Réalisations Authentiques d&apos;Atelier
            </Badge>
            <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Nos Métiers &amp; Chantiers Livrés
            </h2>
            <p className="arabic mt-2 text-sm text-slate-500 sm:text-base">
              أعمالنا الحقيقية: واجهات تجارية، لوحات إشهارية، وتركيبات في الموقع
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1} className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            Photos réelles de nos ateliers et poses en Tunisie
          </AnimateIn>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {PORTFOLIO.map((item, index) => (
            <AnimateIn key={item.id} delay={0.1 * index}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-[1.5rem] bg-slate-100 ring-1 ring-slate-200/80"
              >
                <span
                  className={cn(
                    "absolute left-4 top-4 z-10 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white",
                    item.badgeColor === "red" ? "bg-brand-600" : "bg-slate-900",
                  )}
                >
                  {item.badge}
                </span>

                <div className="grid grid-cols-[1.4fr_1fr] gap-1.5 p-1.5 sm:gap-2 sm:p-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] sm:aspect-[4/5]">
                    <Image
                      src={item.images[0].src}
                      alt={item.images[0].alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 60vw, 30vw"
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-1.5 sm:gap-2">
                    {item.images.slice(1).map((img) => (
                      <div
                        key={img.src}
                        className="relative overflow-hidden rounded-[1.1rem]"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 35vw, 18vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
