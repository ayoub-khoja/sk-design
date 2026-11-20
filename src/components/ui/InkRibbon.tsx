import { cn } from "@/lib/utils";

/** Fine bande 4 couleurs (jaune, magenta, cyan, rouge) rappelant le logo. */
export function InkRibbon({ className }: { className?: string }) {
  return <div aria-hidden className={cn("ink-ribbon h-1 w-full", className)} />;
}
