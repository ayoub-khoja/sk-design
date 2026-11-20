"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxItem = {
  src: string;
  alt: string;
  /** Titre affiché sous la photo (ex. nom de la réalisation) */
  title?: string;
  /** Petit texte au-dessus du titre (ex. catégorie) */
  eyebrow?: string;
  /** Description du projet affichée sous le titre */
  description?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  /** Index de la photo ouverte, ou null quand la visionneuse est fermée */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /** Bouton d'action optionnel (ex. devis WhatsApp) */
  cta?: { label: string; href: string };
};

const SWIPE_THRESHOLD = 60;
const noopSubscribe = () => () => {};

/**
 * Visionneuse plein écran : flèches, clavier (← → Échap), glisser sur mobile,
 * miniatures. Rendue dans <body> pour ne pas être gênée par les animations
 * des sections parentes.
 */
export function Lightbox({ items, index, onIndexChange, cta }: LightboxProps) {
  // true seulement côté navigateur (le portail a besoin de document.body).
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {index !== null && items[index] && (
        <LightboxDialog
          items={items}
          index={index}
          onIndexChange={onIndexChange}
          cta={cta}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}

function LightboxDialog({
  items,
  index,
  onIndexChange,
  cta,
}: Omit<LightboxProps, "index"> & { index: number }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const item = items[index];
  const many = items.length > 1;

  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  const go = useCallback(
    (delta: number) => {
      if (!many) return;
      setDirection(delta);
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, many, onIndexChange],
  );

  // Clavier, blocage du défilement et retour du focus à la fermeture.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Garde le focus dans la visionneuse.
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href]",
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [close, go]);

  // Garde la miniature active visible.
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? item.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-zinc-950/95 text-white backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Barre du haut */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <span className="text-sm font-medium tabular-nums text-white/70" aria-live="polite">
          {many ? `${index + 1} / ${items.length}` : ""}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Photo */}
      <div
        className="relative min-h-0 flex-1"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={item.src}
            custom={direction}
            className="absolute inset-0 mx-auto max-w-6xl px-2 sm:px-16"
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority
              quality={90}
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="pointer-events-none select-none object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {many && (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* Légende + miniatures */}
      <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {item.eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
                {item.eyebrow}
              </p>
            )}
            <p className="mt-0.5 text-base font-semibold leading-snug sm:text-lg">
              {item.title ?? item.alt}
            </p>
            {item.description ? (
              <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-relaxed text-white/65 sm:line-clamp-none">
                {item.description}
              </p>
            ) : (
              item.title &&
              item.alt !== item.title && <p className="mt-0.5 text-sm text-white/60">{item.alt}</p>
            )}
          </div>
          {cta && (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
            >
              <MessageCircle className="h-4 w-4" />
              {cta.label}
            </a>
          )}
        </div>

        {many && (
          <div
            ref={thumbsRef}
            className="mx-auto mt-4 flex max-w-6xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
          >
            {items.map((thumb, i) => (
              <button
                key={thumb.src}
                type="button"
                data-index={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  onIndexChange(i);
                }}
                aria-label={`Photo ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-24",
                  i === index
                    ? "opacity-100 ring-white"
                    : "opacity-50 ring-transparent hover:opacity-90",
                )}
              >
                <Image src={thumb.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Photo précédente" : "Photo suivante"}
      className={cn(
        "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white sm:flex",
        side === "left" ? "left-3 lg:left-6" : "right-3 lg:right-6",
      )}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
