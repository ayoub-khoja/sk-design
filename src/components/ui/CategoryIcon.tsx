import {
  Award,
  BookOpen,
  KeyRound,
  Lightbulb,
  Presentation,
  Shirt,
  Sparkles,
  Store,
  Tag,
  Tv,
} from "lucide-react";
import type { CategoryIcon as IconName } from "@/constants/categories";

const ICONS = {
  lightbulb: Lightbulb,
  store: Store,
  billboard: Tv,
  award: Award,
  presentation: Presentation,
  book: BookOpen,
  tag: Tag,
  shirt: Shirt,
  key: KeyRound,
  sparkles: Sparkles,
} as const;

export function CategoryIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
