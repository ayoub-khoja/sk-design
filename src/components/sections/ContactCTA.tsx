"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Hl } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import { SocialLinks, WhatsAppIcon } from "@/components/ui/SocialLinks";
import { SITE, SOCIAL_LINKS, WHATSAPP_MESSAGE } from "@/constants/site";
import { telHref, whatsappUrl } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactCTA() {
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  const info = [
    {
      icon: Phone,
      label: "Téléphones",
      content: (
        <span className="flex flex-wrap gap-x-3">
          {SITE.phones.map((p) => (
            <a key={p} href={telHref(p)} className="transition hover:text-brand-600">
              {p}
            </a>
          ))}
        </span>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      content: (
        <a href={`mailto:${SITE.email}`} className="transition hover:text-brand-600">
          {SITE.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: "Horaires",
      content: `Lun – Sam : ${SITE.openingHours.open} – ${SITE.openingHours.close}`,
      note: SITE.hoursNote,
    },
    {
      icon: MapPin,
      label: "Zone d'intervention",
      content: SITE.zone,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          {/* Bordure lumineuse aux couleurs d'encre */}
          <div className="rounded-[2.1rem] bg-gradient-to-br from-brand-600/70 via-ink-magenta/30 to-ink-cyan/60 p-px shadow-[0_40px_100px_-40px_rgba(200,30,30,0.45)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#121018] p-7 sm:p-10 lg:p-14">
            <InkSwoosh className="-right-6 bottom-0 h-56 w-[60%] opacity-90" />
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-ink-cyan/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-ink-magenta/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="flex items-center gap-3">
                  <Image src={SITE.logo} alt="" width={44} height={44} className="h-11 w-11 rounded-xl bg-white object-contain p-0.5" />
                  <span className="leading-tight">
                    <span className="block text-lg font-extrabold text-white">{SITE.name}</span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                      Impression &amp; publicité · <span className="text-brand-500">Tunisie</span>
                    </span>
                  </span>
                </div>
                <p className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-500">
                  <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />
                  Contactez-nous
                </p>
                <h2 className="mt-5 max-w-xl text-balance font-[family-name:var(--font-outfit)] text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Donnez à votre entreprise la <Hl tone="dark">visibilité</Hl> qu&apos;elle mérite.
                </h2>
                <p className="arabic mt-4 text-base leading-relaxed text-brand-500">
                  اتصل بنا الآن لتحصل على عرض أسعار فوري واستشارة مجانية لتنفيذ مشروعك
                </p>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-zinc-400">
                  Envoyez vos dimensions ou une photo de votre façade sur
                  WhatsApp : notre atelier vous répond avec une simulation et
                  un devis gratuit, sans engagement.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe57]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp : {SITE.phones[0]}
                  </a>
                  <a
                    href={telHref(SITE.phones[1])}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/5"
                  >
                    <Phone className="h-4 w-4" />
                    Appeler : {SITE.phones[1]}
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <SocialLinks tone="dark" />
                  <p className="text-sm text-zinc-400">
                    Suivez-nous :{" "}
                    {SOCIAL_LINKS.map((s, i) => (
                      <span key={s.id}>
                        {i > 0 && " · "}
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-white underline-offset-4 hover:underline"
                        >
                          {s.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="divide-y divide-zinc-100 rounded-[1.5rem] bg-white p-2 shadow-2xl"
              >
                {info.map(({ icon: Icon, label, content, note }) => (
                  <div key={label} className="flex items-start gap-4 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-zinc-900">{content}</dd>
                      {note && <dd className="mt-0.5 text-xs text-zinc-500">{note}</dd>}
                    </div>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
