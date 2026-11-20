"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, SquarePen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { categoryHref, MegaMenu } from "@/components/layout/MegaMenu";
import { Button } from "@/components/ui/Button";
import { SocialLinks, WhatsAppIcon } from "@/components/ui/SocialLinks";
import type { MenuCategory } from "@/lib/data/types";
import { cn, telHref, whatsappUrl } from "@/lib/utils";

const MEGA_ID = "menu-realisations";

export function Header({ menuCategories }: { menuCategories: MenuCategory[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Menu déroulant « Réalisations » : ouvert au survol ou au clavier.
  // Petit délai à la fermeture pour passer du lien au panneau sans le perdre.
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(false);
  };
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };
  const hasMega = menuCategories.length > 0;
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);
  // Les liens avec ancre (/#contact…) ne sont jamais marqués « actifs ».
  const isActive = (href: string) =>
    !href.includes("#") &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/90 shadow-[0_8px_30px_-20px_rgba(9,9,11,0.25)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={SITE.logo}
            alt={`${SITE.name} logo`}
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-xl object-contain"
          />
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              {SITE.name}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {SITE.tagline} · {SITE.taglineAr}
            </span>
          </span>
        </Link>

        <span aria-hidden className="hidden h-8 w-px bg-zinc-200 xl:block" />

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const withMega = hasMega && link.href === "/realisations";
            const navLink = (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                aria-expanded={withMega ? megaOpen : undefined}
                aria-controls={withMega && megaOpen ? MEGA_ID : undefined}
                onClick={withMega ? closeMega : undefined}
                className={cn(
                  "relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-50 hover:text-slate-900",
                  active || (withMega && megaOpen) ? "text-slate-900" : "text-slate-600",
                )}
              >
                {link.label}
                {withMega && (
                  <ChevronDown
                    aria-hidden
                    className={cn("h-3.5 w-3.5 transition-transform duration-200", megaOpen && "rotate-180")}
                  />
                )}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-brand-600"
                  />
                )}
              </Link>
            );
            if (!withMega) return navLink;

            // Le panneau est dans le même bloc que le lien : le survol et la
            // tabulation passent de l'un à l'autre sans fermer le menu.
            return (
              <div
                key={link.href}
                onMouseEnter={openMega}
                onMouseLeave={closeMegaSoon}
                onFocus={openMega}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMega();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeMega();
                }}
              >
                {navLink}
                <AnimatePresence>
                  {megaOpen && (
                    <MegaMenu id={MEGA_ID} categories={menuCategories} onNavigate={closeMega} />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <a
            href={telHref(SITE.phones[0])}
            className="hidden items-center gap-1.5 text-sm font-semibold text-slate-800 2xl:flex"
          >
            <Phone className="h-4 w-4 text-brand-600" />
            {SITE.phones[0]} / {SITE.phones[1]}
          </a>
          <Button href={wa} variant="ghost" className="!px-4 !py-2.5" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            WhatsApp
          </Button>
          <Button href="/#contact" className="!px-4 !py-2.5 whitespace-nowrap">
            <SquarePen className="h-4 w-4" />
            Demander un Devis Gratuit
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white xl:hidden"
          >
            {/* Défile si le menu dépasse la hauteur de l'écran (en-tête collant) */}
            <div className="flex max-h-[calc(100dvh-5.5rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-50",
                      isActive(link.href)
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700",
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.href === "/realisations" && hasMega && (
                    <ul className="mb-2 ml-3 grid grid-cols-2 gap-1 border-l border-zinc-100 pl-3">
                      {menuCategories.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={categoryHref(cat.slug)}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[13px] text-zinc-600 hover:bg-slate-50 hover:text-zinc-900"
                          >
                            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                              <Image src={cat.cover.src} alt="" fill sizes="28px" className="object-cover" />
                            </span>
                            <span className="line-clamp-2 leading-tight">{cat.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <Button href={wa} variant="secondary" className="mt-2" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </Button>
              <Button href="/#contact" className="w-full">
                Demander un Devis Gratuit
              </Button>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                <span className="text-xs font-medium text-zinc-500">Suivez-nous</span>
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
