"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { SERVICE_CARDS } from "@/constants/content";

export function ServiceCards() {
  return (
    <section id="services" className="bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICE_CARDS.map((card, index) => (
            <AnimateIn key={card.id} delay={0.08 * index}>
              <motion.article
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7"
              >
                {"label" in card && card.label && (
                  <Badge variant="soft" className="mb-4 w-fit">
                    {card.label}
                  </Badge>
                )}

                {"heroImage" in card && card.heroImage && (
                  <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl">
                    <Image
                      src={card.heroImage}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                )}

                <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold tracking-tight text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {card.images.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes="(max-width: 1024px) 45vw, 22vw"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <span className="text-sm text-slate-500">{card.ctaPrompt}</span>
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:underline"
                  >
                    {card.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
