"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Hl } from "@/components/ui/Highlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { ZoomablePhoto } from "@/components/ui/ZoomablePhoto";
import { SERVICE_CARDS } from "@/constants/content";
import { accentAt } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function ServiceCards() {
  const [open, setOpen] = useState<{ items: LightboxItem[]; index: number } | null>(null);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <AnimateIn>
            <SectionHeading
              eyebrow="Nos métiers"
              title={
                <>
                  Ce que nous <Hl>fabriquons</Hl> pour vous.
                </>
              }
              lede="Quatre spécialités, un même niveau d'exigence. Cliquez sur une photo pour la voir en grand."
            />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-950"
            >
              Toutes nos réalisations
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-white transition group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </AnimateIn>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {SERVICE_CARDS.map((card, index) => {
            const photos = photosOf(card);
            const accent = accentAt(index);
            return (
              <AnimateIn key={card.id} delay={0.08 * index} className="h-full">
                <article className="group/card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-zinc-50 ring-1 ring-zinc-200/70 transition duration-300 hover:bg-white hover:shadow-[0_30px_80px_-40px_rgba(9,9,11,0.35)]">
                  <span className={cn("absolute inset-x-0 top-0 z-10 h-1", accent.bar)} />
                  <div className="grid grid-cols-[1.4fr_1fr] gap-1.5 p-1.5">
                    {photos.slice(0, 2).map((photo, i) => (
                      <ZoomablePhoto
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        onOpen={() => setOpen({ items: photos, index: i })}
                        sizes="(max-width: 1024px) 55vw, 28vw"
                        className="aspect-[4/3] h-full rounded-[1.35rem]"
                      />
                    ))}
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className={cn("inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums", accent.soft, accent.text)}>0{index + 1}</p>
                    <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-extrabold tracking-tight text-zinc-950">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zinc-600">
                      {card.description}
                    </p>

                  </div>
                </article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
      <Lightbox
        items={open?.items ?? []}
        index={open?.index ?? null}
        onIndexChange={(i) => setOpen(i === null || !open ? null : { ...open, index: i })}
      />
    </section>
  );
}

type Card = (typeof SERVICE_CARDS)[number];

function photosOf(card: Card): LightboxItem[] {
  return card.images.map((src) => ({ src, alt: card.title, title: card.title }));
}
