/**
 * Palette d'accents tirée du logo (encres CMJN + rouge de marque).
 * Les classes sont écrites en entier pour que Tailwind les détecte.
 * Le jaune n'est jamais utilisé pour du texte sur fond blanc (contraste).
 */
export const ACCENTS = [
  {
    name: "cyan",
    soft: "bg-ink-cyan/10",
    text: "text-ink-cyan",
    solid: "bg-ink-cyan text-white",
    ring: "ring-ink-cyan/30",
    bar: "bg-ink-cyan",
  },
  {
    name: "magenta",
    soft: "bg-ink-magenta/10",
    text: "text-ink-magenta",
    solid: "bg-ink-magenta text-white",
    ring: "ring-ink-magenta/30",
    bar: "bg-ink-magenta",
  },
  {
    name: "yellow",
    soft: "bg-ink-yellow/15",
    text: "text-[#b07f00]",
    solid: "bg-ink-yellow text-zinc-950",
    ring: "ring-ink-yellow/40",
    bar: "bg-ink-yellow",
  },
  {
    name: "red",
    soft: "bg-brand-600/10",
    text: "text-brand-600",
    solid: "bg-brand-600 text-white",
    ring: "ring-brand-600/30",
    bar: "bg-brand-600",
  },
] as const;

export type Accent = (typeof ACCENTS)[number];

/** Couleur d'accent pour la position i (cycle cyan → magenta → jaune → rouge). */
export function accentAt(i: number): Accent {
  return ACCENTS[((i % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];
}

