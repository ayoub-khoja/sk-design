"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, MessageCircle, Phone } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { telHref, whatsappUrl } from "@/lib/utils";

const INFO = [
  {
    label: "Téléphones Directs",
    value: `${SITE.phones[0]}  •  ${SITE.phones[1]}`,
  },
  {
    label: "Email Professionnel",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    label: "Horaires de Travail",
    value: SITE.hours,
    note: SITE.hoursNote,
  },
  {
    label: "Zone d'Intervention",
    value: SITE.zone,
    icon: true,
  },
] as const;

export function ContactCTA() {
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  return (
    <section id="contact" className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <div className="overflow-hidden rounded-[1.75rem] bg-[#141414] p-7 shadow-2xl shadow-black/20 sm:p-10 lg:rounded-[2rem] lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex rounded-full bg-[#C61A21] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white sm:text-[11px]">
                  Lancement de Projet Immédiat
                </span>

                <h2 className="mt-5 max-w-xl font-[family-name:var(--font-outfit)] text-[1.85rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
                  Donnez à Votre Entreprise la Visibilité Qu&apos;elle Mérite
                </h2>

                <p className="arabic mt-4 text-[15px] leading-relaxed text-[#C61A21] sm:text-base">
                  اتصل بنا الآن لتحصل على عرض أسعار فوري واستشارة مجانية لتنفيذ
                  مشروعك
                </p>

                <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-zinc-400 sm:text-[15px]">
                  Discutez directement avec nos maîtres d&apos;atelier. Envoyez
                  vos dimensions ou photos de façade sur WhatsApp pour obtenir
                  une simulation et un devis sans engagement.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <motion.a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#C61A21] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a8161c]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Atelier : {SITE.phones[0]}
                  </motion.a>

                  <motion.a
                    href={telHref(SITE.phones[1])}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#2a2a2a] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#333]"
                  >
                    <Phone className="h-4 w-4" />
                    Appeler : {SITE.phones[1]}
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.5rem] bg-white p-5 shadow-xl sm:p-6 lg:rounded-[1.75rem]"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-[#C61A21]" strokeWidth={2.25} />
                  <h3 className="text-base font-bold text-zinc-900 sm:text-lg">
                    Coordonnées de l&apos;Atelier
                  </h3>
                </div>

                <div className="mt-5 space-y-2.5">
                  {INFO.map((row) => (
                    <div
                      key={row.label}
                      className="relative rounded-xl bg-[#F4F5F7] px-4 py-3.5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                        {row.label}
                      </p>
                      {"href" in row && row.href ? (
                        <a
                          href={row.href}
                          className="mt-1 block text-sm font-semibold text-zinc-800 transition hover:text-[#C61A21]"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          {row.value}
                        </p>
                      )}
                      {"note" in row && row.note && (
                        <p className="mt-0.5 text-xs text-zinc-400">{row.note}</p>
                      )}
                      {"icon" in row && row.icon && (
                        <span className="absolute bottom-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#C61A21]/10 text-[#C61A21]">
                          <Compass className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
