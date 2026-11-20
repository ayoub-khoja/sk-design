import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { InkUnderline } from "@/components/ui/Highlight";
import { InkSwoosh } from "@/components/ui/InkSwoosh";
import {
  FacebookIcon,
  InstagramIcon,
  SocialLinks,
} from "@/components/ui/SocialLinks";
import { FOOTER_SERVICES } from "@/constants/content";
import { LEGAL_LINKS, NAV_LINKS, SITE, SOCIAL_LINKS } from "@/constants/site";
import { InkRibbon } from "@/components/ui/InkRibbon";
import { telHref } from "@/lib/utils";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300">
      <span aria-hidden className="ink-ribbon h-1 w-8 rounded-full" />
      {children}
    </h3>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#121018] text-zinc-400">
      <InkRibbon />
      <InkSwoosh className="-right-10 bottom-14 h-36 w-[35%] opacity-50" />
      <InkSwoosh flip className="-left-10 bottom-16 h-40 w-[35%] opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* Bandeau réseaux sociaux */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 md:flex-row md:items-center md:justify-between">
          <div className="md:border-r md:border-white/10 md:pr-10">
            <p className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white sm:text-4xl">
              Suivez nos chantiers{" "}
              <span className="relative inline-block whitespace-nowrap pb-1">
                en direct
                <InkUnderline className="absolute -bottom-2 left-0 w-full" />
              </span>
            </p>
            <p className="mt-1 text-sm">
              Nouvelles réalisations publiées chaque semaine sur nos réseaux.
            </p>
          </div>
          <SocialFollowButtons />
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.1fr_1.1fr] lg:divide-x lg:divide-white/10 [&>*]:lg:px-8 [&>*:first-child]:lg:pl-0">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl bg-white object-contain p-0.5"
              />
              <span className="leading-tight">
                <span className="block text-lg font-extrabold tracking-tight text-white">
                  {SITE.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {SITE.tagline} · {SITE.taglineAr}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Atelier de fabrication publicitaire et imprimerie numérique :
              enseignes, habillage de vitrines, signalétique, objets et
              fournitures sur mesure.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
              {SITE.address.postalCode} {SITE.address.city}, {SITE.address.region} · Pose partout en Tunisie
            </p>
            <SocialLinks tone="dark" withWhatsApp className="mt-6" />
          </div>

          <nav aria-label="Pied de page">
            <ColumnTitle>Navigation</ColumnTitle>
            <ul className="mt-5 divide-y divide-white/10 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center justify-between gap-3 py-3 text-zinc-300 transition hover:text-white">
                    {link.label}
                    <ChevronRight className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>Nos métiers</ColumnTitle>
            <ul className="mt-5 divide-y divide-white/10 text-sm">
              {FOOTER_SERVICES.map((item) => (
                <li key={item}>
                  <Link href="/realisations" className="group flex items-center justify-between gap-3 py-3 text-zinc-300 transition hover:text-white">
                    {item}
                    <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="mt-5 space-y-5 text-sm">
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/15 text-brand-500"><Phone className="h-[18px] w-[18px]" /></span>
                <span className="flex flex-col gap-1">
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="text-lg font-bold text-white transition hover:text-brand-500"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/15 text-brand-500"><Mail className="h-[18px] w-[18px]" /></span>
                <a href={`mailto:${SITE.email}`} className="transition hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/15 text-brand-500"><Clock className="h-[18px] w-[18px]" /></span>
                <span>
                  <span className="font-semibold text-white">{SITE.hours}</span>
                  <span className="mt-0.5 block text-xs text-zinc-400">
                    {SITE.sunday} · {SITE.hoursNote}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} — {SITE.taglineAr} · Imprimerie &amp; Publicité.
            Tous droits réservés.
          </p>
          <ul className="flex gap-5 [&>li+li]:border-l [&>li+li]:border-white/15 [&>li+li]:pl-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Boutons « Suivre » avec logo + nom de compte. */
function SocialFollowButtons() {
  return (
    <ul className="flex flex-wrap gap-3">
      {SOCIAL_LINKS.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 py-1.5 pl-1.5 pr-4 text-sm transition hover:border-white/40 hover:bg-white/5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-950">
              <SocialGlyph id={s.id} />
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-white">{s.label}</span>
              <span className="block text-xs text-zinc-400">{s.handle}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialGlyph({ id }: { id: (typeof SOCIAL_LINKS)[number]["id"] }) {
  return id === "facebook" ? (
    <FacebookIcon className="h-[18px] w-[18px]" />
  ) : (
    <InstagramIcon className="h-[18px] w-[18px]" />
  );
}
