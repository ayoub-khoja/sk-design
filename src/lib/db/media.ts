import "server-only";
import { GridFSBucket, type ObjectId } from "mongodb";
import sharp from "sharp";
import { PHOTO_BUCKET } from "./config";
import { getDb } from "./mongo";

async function bucket() {
  return new GridFSBucket(await getDb(), { bucketName: PHOTO_BUCKET });
}

/** Taille maximale (en pixels) du plus grand côté d'une photo stockée. */
const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 80;

/**
 * Compresse une photo avant stockage : redressée selon l'orientation de
 * l'appareil, réduite à 1920 px max, convertie en WebP et débarrassée des
 * métadonnées (dont la position GPS). Une photo de téléphone de 3 à 8 Mo
 * passe en général sous 400 Ko, sans perte visible.
 */
export async function optimizeImage(input: Buffer) {
  return sharp(input)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();
}

/** Compresse puis enregistre une photo dans GridFS ; renvoie son identifiant. */
export async function uploadPhoto(file: File): Promise<ObjectId> {
  const b = await bucket();
  const data = await optimizeImage(Buffer.from(await file.arrayBuffer()));
  const name = file.name.replace(/\.[^.]+$/, "") + ".webp";

  return new Promise((resolve, reject) => {
    const upload = b.openUploadStream(name, {
      metadata: { contentType: "image/webp", originalSize: file.size },
    });
    upload.once("error", reject);
    upload.once("finish", () => resolve(upload.id as ObjectId));
    upload.end(data);
  });
}

/** Supprime des photos (les identifiants inconnus sont ignorés). */
export async function deletePhotos(ids: ObjectId[]) {
  if (ids.length === 0) return;
  const b = await bucket();
  for (const id of ids) {
    try {
      await b.delete(id);
    } catch {
      // Déjà supprimée : rien à faire.
    }
  }
}

/** Ouvre une photo en lecture, ou null si elle n'existe pas. */
export async function openPhoto(id: ObjectId) {
  const b = await bucket();
  const [file] = await b.find({ _id: id }).limit(1).toArray();
  if (!file) return null;

  return {
    contentType:
      (file.metadata?.contentType as string | undefined) ?? "application/octet-stream",
    length: file.length,
    stream: b.openDownloadStream(id),
  };
}
