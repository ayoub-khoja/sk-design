// Réglages partagés (utilisables partout, y compris dans proxy.ts).

export const MONGODB_URI = process.env.MONGODB_URI ?? "";
export const MONGODB_DB = process.env.MONGODB_DB || "skdesign";
export const SESSION_SECRET = process.env.SESSION_SECRET ?? "";

/** Nom du bucket GridFS qui contient les photos des réalisations. */
export const PHOTO_BUCKET = "photos";

/** false tant que MONGODB_URI et SESSION_SECRET ne sont pas renseignés. */
export const isDbConfigured = Boolean(MONGODB_URI && SESSION_SECRET);

/** URL publique d'une photo : /media/<id> (GridFS) ou chemin local /… */
export function publicImageUrl(fileIdOrPath: string) {
  if (!fileIdOrPath) return "";
  if (fileIdOrPath.startsWith("/") || fileIdOrPath.startsWith("http")) {
    return fileIdOrPath;
  }
  return `/media/${fileIdOrPath}`;
}
