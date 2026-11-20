"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { deletePhotos, uploadPhoto } from "@/lib/db/media";
import { toObjectId, type ImageDoc } from "@/lib/db/mongo";
import { requireAdmin } from "@/lib/data/auth";
import {
  int,
  revalidateCatalog,
  text,
  withMessage,
} from "@/lib/data/helpers";

const LIST = "/admin/realisations";
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 Mo (compressée ensuite)
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export type SaveState = { error?: string };

export async function saveRealisation(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const { db } = await requireAdmin();

  const idText = text(formData, "id", 64);
  const existingId = idText ? toObjectId(idText) : null;
  if (idText && !existingId) return { error: "Réalisation introuvable." };

  const title = text(formData, "title", 200);
  const categoryId = toObjectId(text(formData, "category_id", 64));
  const isPublished = formData.get("is_published") === "on";

  if (!title) return { error: "Le titre est obligatoire." };
  if (!categoryId || !(await db.categories.countDocuments({ _id: categoryId }))) {
    return { error: "Choisissez une catégorie." };
  }

  const existing = existingId ? await db.realisations.findOne({ _id: existingId }) : null;
  if (existingId && !existing) return { error: "Réalisation introuvable." };

  // ── Photos ────────────────────────────────────────────────────────────
  const currentImages = existing?.images ?? [];
  const isDeleted = (img: ImageDoc) =>
    formData.get(`delete_${img.fileId.toHexString()}`) === "on";
  const kept = currentImages.filter((img) => !isDeleted(img));
  const removed = currentImages.filter(isDeleted);

  const newFiles = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  for (const file of newFiles) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return { error: `« ${file.name} » : format non accepté (JPG, PNG, WebP ou AVIF).` };
    }
    if (file.size > MAX_FILE_SIZE) return { error: `« ${file.name} » dépasse 15 Mo.` };
  }

  if (isPublished && kept.length + newFiles.length === 0) {
    return { error: "Ajoutez au moins une photo pour publier cette réalisation." };
  }

  const uploaded: ObjectId[] = [];
  try {
    for (const file of newFiles) uploaded.push(await uploadPhoto(file));
  } catch (err) {
    await deletePhotos(uploaded);
    return { error: `Envoi des photos impossible : ${(err as Error).message}` };
  }

  // Ordre : la photo « principale » d'abord, puis les autres dans l'ordre.
  const main = text(formData, "main", 64);
  const ordered = [
    ...[...kept]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => ({
        key: img.fileId.toHexString(),
        fileId: img.fileId,
        alt: text(formData, `alt_${img.fileId.toHexString()}`, 300) || title,
      })),
    ...uploaded.map((fileId, i) => ({ key: `new-${i}`, fileId, alt: title })),
  ];
  const mainIndex = ordered.findIndex((img) => img.key === main);
  if (mainIndex > 0) ordered.unshift(...ordered.splice(mainIndex, 1));

  const images: ImageDoc[] = ordered.map((img, i) => ({
    fileId: img.fileId,
    alt: img.alt,
    sortOrder: i,
  }));

  // ── Enregistrement ───────────────────────────────────────────────────
  const fields = {
    categoryId,
    title,
    description: text(formData, "description", 3000),
    isFeatured: formData.get("is_featured") === "on",
    isPublished,
    sortOrder: int(formData, "sort_order"),
    images,
    updatedAt: new Date(),
  };

  try {
    if (existingId) {
      await db.realisations.updateOne({ _id: existingId }, { $set: fields });
    } else {
      await db.realisations.insertOne({
        _id: new ObjectId(),
        ...fields,
        createdAt: new Date(),
      });
    }
  } catch (err) {
    await deletePhotos(uploaded);
    return { error: `Erreur : ${(err as Error).message}` };
  }

  await deletePhotos(removed.map((img) => img.fileId));

  revalidateCatalog();
  redirect(withMessage(LIST, "ok", `« ${title} » enregistrée.`));
}

export async function togglePublished(formData: FormData) {
  const { db } = await requireAdmin();
  const _id = toObjectId(text(formData, "id", 64));
  if (!_id) redirect(withMessage(LIST, "error", "Réalisation introuvable."));
  const publish = formData.get("publish") === "1";

  if (publish) {
    const doc = await db.realisations.findOne({ _id }, { projection: { images: 1 } });
    if (!doc?.images.length) {
      redirect(withMessage(LIST, "error", "Ajoutez au moins une photo avant de publier."));
    }
  }

  await db.realisations.updateOne(
    { _id },
    { $set: { isPublished: publish, updatedAt: new Date() } },
  );
  revalidateCatalog();
  redirect(
    withMessage(LIST, "ok", publish ? "Réalisation publiée." : "Réalisation masquée du site."),
  );
}

export async function deleteRealisation(formData: FormData) {
  const { db } = await requireAdmin();
  const _id = toObjectId(text(formData, "id", 64));
  if (!_id) redirect(withMessage(LIST, "error", "Réalisation introuvable."));

  const doc = await db.realisations.findOneAndDelete({ _id });
  if (doc) await deletePhotos(doc.images.map((img) => img.fileId));

  revalidateCatalog();
  redirect(withMessage(LIST, "ok", "Réalisation supprimée."));
}
