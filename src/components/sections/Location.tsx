"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, ExternalLink, Map as MapIcon, MapPin, Navigation, Phone } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Hl } from "@/components/ui/Highlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/constants/site";
import { telHref } from "@/lib/utils";

/**
 * Carte de l'atelier. Google Maps n'est chargé qu'après un clic : aucun
 * contenu ni cookie Google tant que le visiteur ne le demande pas.
 */
export function Location() {
  const [showMap, setShowMap] = useState(false);
  const a = SITE.address;
  const addressLine = [a.street, `${a.postalCode} ${a.city}`, a.region].filter(Boolean).join(", ");
  const position = `${a.lat},${a.lng}`;
  const embedUrl = `https://www.google.com/maps?q=${position}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position}`;

  return (
    <section id="localisation" className="scroll-mt-24 bg-[#fbf9f9] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Nous trouver"
            title={
              <>
                Notre atelier à <Hl>{a.city}</Hl>
              </>
            }
          />
          <p className="inline-flex items-center gap-2 text-sm text-zinc-600 sm:text-base">
            <MapPin className="h-4 w-4 shrink-0 text-brand-600" />
            {addressLine}
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#eef1f4] shadow-[0_30px_70px_-40px_rgba(9,9,11,0.45)] ring-1 ring-zinc-200/80 sm:aspect-[16/9] lg:aspect-[21/8]">
            <AnimatePresence mode="wait">
              {showMap ? (
                <motion.iframe
                  key="map"
                  src={embedUrl}
                  title={`Carte Google Maps : atelier SK Design à ${a.city}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  className="absolute inset-0"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FakeMap />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <motion.span
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-600 shadow-[0_15px_35px_-12px_rgba(9,9,11,0.35)]"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MapPin className="h-7 w-7" />
                    </motion.span>
                    <p className="max-w-xs rounded-xl bg-zinc-900/85 px-4 py-2.5 text-sm leading-snug text-white backdrop-blur">
                      Cliquez pour afficher la carte interactive Google Maps
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowMap(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700"
                    >
                      <MapIcon className="h-4 w-4" />
                      Afficher la carte
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-600">
            <li className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" />
              Lun – Sam : {SITE.openingHours.open} – {SITE.openingHours.close}
            </li>
            <li>
              <a
                href={telHref(SITE.phones[0])}
                className="inline-flex items-center gap-2 transition hover:text-brand-600"
              >
                <Phone className="h-4 w-4 text-brand-600" />
                {SITE.phones[0]}
              </a>
            </li>
            <li>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-zinc-900 transition hover:text-brand-600"
              >
                <Navigation className="h-4 w-4 text-brand-600" />
                Itinéraire
              </a>
            </li>
            <li>
              <a
                href={a.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-zinc-900 transition hover:text-brand-600"
              >
                <ExternalLink className="h-4 w-4 text-brand-600" />
                Voir la fiche Google Maps
              </a>
            </li>
          </ul>
        </AnimateIn>
      </div>
    </section>
  );
}

/** Plan flouté purement décoratif, affiché avant le chargement de Google Maps. */
function FakeMap() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden blur-[3px]">
      {/* Îlots et parcs */}
      <div className="absolute left-[4%] top-[8%] h-[30%] w-[20%] rounded-xl bg-[#dfeadb]" />
      <div className="absolute left-[30%] top-[52%] h-[28%] w-[22%] rounded-xl bg-white/80" />
      <div className="absolute right-[6%] top-[10%] h-[34%] w-[24%] rounded-xl bg-[#e3ecdf]" />
      <div className="absolute right-[18%] top-[56%] h-[26%] w-[18%] rounded-xl bg-white/80" />
      <div className="absolute left-[58%] top-[14%] h-[22%] w-[14%] rounded-xl bg-[#f1ede6]" />
      {/* Mer */}
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-[#d6e6f2]" />
      {/* Routes */}
      <div className="absolute inset-x-0 top-[40%] h-3 bg-[#fbe7c6]" />
      <div className="absolute inset-x-0 top-[72%] h-2.5 -rotate-3 bg-white" />
      <div className="absolute inset-y-0 left-[26%] w-3 rotate-6 bg-white" />
      <div className="absolute inset-y-0 left-[54%] w-2.5 bg-white" />
      <div className="absolute inset-y-0 right-[14%] w-3 -rotate-12 bg-white" />
    </div>
  );
}
