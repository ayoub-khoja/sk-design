"use client";

import { useSyncExternalStore } from "react";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const TZ = "Africa/Tunis";

function minutesOf(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** true si l'atelier est ouvert maintenant (heure de Tunis). */
function isOpenNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const now = Number(get("hour")) * 60 + Number(get("minute"));
  const { days, open, close } = SITE.openingHours;
  return (days as readonly number[]).includes(day) && now >= minutesOf(open) && now < minutesOf(close);
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/**
 * Pastille « Atelier ouvert / fermé » calculée sur l'heure de Tunis.
 * Côté serveur (et avant hydratation), affiche simplement les horaires.
 */
export function OpenStatus({ className }: { className?: string }) {
  const open = useSyncExternalStore(subscribe, isOpenNow, () => null);
  const { open: from, close: to } = SITE.openingHours;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            open === null ? "bg-zinc-500" : open ? "bg-emerald-400" : "bg-zinc-500",
          )}
        />
      </span>
      <span>
        {open === null
          ? `Lun – Sam · ${from} – ${to}`
          : open
            ? `Atelier ouvert · jusqu'à ${to}`
            : `Atelier fermé · Lun – Sam ${from} – ${to}`}
      </span>
    </span>
  );
}
