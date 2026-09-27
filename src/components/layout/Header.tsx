"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, Phone, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { telHref, whatsappUrl } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const wa = whatsappUrl(SITE.phones[0], WHATSAPP_MESSAGE);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
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

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telHref(SITE.phones[0])}
            className="hidden items-center gap-1.5 text-sm font-semibold text-slate-800 2xl:flex"
          >
            <Phone className="h-4 w-4 text-brand-600" />
            {SITE.phones[0]} / {SITE.phones[1]}
          </a>
          <Button href={wa} variant="secondary" className="!px-3 !py-2.5" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button href="/#contact" className="!px-4 !py-2.5 whitespace-nowrap">
            Demander un Devis Gratuit
          </Button>
          <button
            type="button"
            aria-label="Compte"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <User className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
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
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <Button href={wa} variant="secondary" className="mt-2" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button href="/#contact" className="w-full">
                Demander un Devis Gratuit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
