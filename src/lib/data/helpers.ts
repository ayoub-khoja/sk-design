import "server-only";
import { revalidatePath } from "next/cache";

/** "Enseignes & Façades" → "enseignes-facades" */
export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Rafraîchit le site public et l'espace admin après une modification. */
export function revalidateCatalog() {
  // Toutes les pages du site : le menu « Réalisations » de l'en-tête
  // affiche les catégories sur chaque page.
  revalidatePath("/", "layout");
  revalidatePath("/realisations");
  revalidatePath("/admin", "layout");
}

/** URL avec un message ?ok= ou ?error= pour l'afficher après redirection. */
export function withMessage(
  path: string,
  kind: "ok" | "error",
  message: string,
) {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${kind}=${encodeURIComponent(message)}`;
}

export function text(formData: FormData, key: string, max = 2000) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

export function int(formData: FormData, key: string) {
  const n = Number.parseInt(String(formData.get(key) ?? ""), 10);
  return Number.isFinite(n) ? n : 0;
}
