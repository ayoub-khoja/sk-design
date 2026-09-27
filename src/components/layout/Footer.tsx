"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Clock, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { FOOTER_SERVICES } from "@/constants/content";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { telHref, whatsappUrl } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <AnimateIn className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={SITE.logo}
              alt={`${SITE.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl object-contain"
            />
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
              {SITE.name}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Atelier de fabrication publicitaire et imprimerie numérique haute
            précision. Concepteur d&apos;enseignes architecturales, habillage
            vitrine, signalétique d&apos;entreprise et fournitures sur mesure.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-brand-600" />
            {SITE.location}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700">
            Services &amp; Spécialités
          </h4>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_SERVICES.map((item) => (
              <li key={item}>
                <Link
                  href="/services"
                  className="text-sm text-slate-500 transition hover:text-brand-600"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700">
            Contact &amp; Horaires
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                <a href={telHref(SITE.phones[0])} className="hover:text-brand-600">
                  {SITE.phones[0]}
                </a>
                {" · "}
                <a href={telHref(SITE.phones[1])} className="hover:text-brand-600">
                  {SITE.phones[1]}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                {SITE.hours}
                <span className="mt-0.5 block text-xs text-slate-400">
                  {SITE.sunday}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-600">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700">
            Canaux &amp; Réseaux
          </h4>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Suivez nos dernières réalisations d&apos;ateliers et projets
            d&apos;enseignes sur nos plateformes :
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { icon: Globe, href: "#", label: "Site" },
              { icon: Camera, href: "#", label: "Instagram" },
              { icon: MessageCircle, href: wa, label: "WhatsApp" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-brand-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </AnimateIn>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center lg:px-6">
          <p>
            © {year} SK Design ({SITE.taglineAr} - Imprimerie &amp; Publicité).
            Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-800">
              Mentions Légales
            </Link>
            <Link href="#" className="hover:text-slate-800">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
