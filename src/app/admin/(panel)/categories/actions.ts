"use server";

import { MongoServerError, ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { toObjectId } from "@/lib/db/mongo";
import { requireAdmin } from "@/lib/data/auth";
import {
  int,
  revalidateCatalog,
  slugify,
  text,
  withMessage,
} from "@/lib/data/helpers";

const PAGE = "/admin/categories";

function errorMessage(err: unknown) {
  if (err instanceof MongoServerError && err.code === 11000) {
    return "Une catégorie avec ce nom existe déjà.";
  }
  return `Erreur : ${err instanceof Error ? err.message : String(err)}`;
}

export async function createCategory(formData: FormData) {
  const { db } = await requireAdmin();
  const name = text(formData, "name", 120);
  const slug = slugify(name);
  if (!name || !slug) redirect(withMessage(PAGE, "error", "Le nom est obligatoire."));

  let failure: string | null = null;
  try {
    await db.categories.insertOne({
      _id: new ObjectId(),
      slug,
      name,
      description: text(formData, "description", 500),
      sortOrder: int(formData, "sort_order"),
      createdAt: new Date(),
    });
  } catch (err) {
    failure = errorMessage(err);
  }
  if (failure) redirect(withMessage(PAGE, "error", failure));

  revalidateCatalog();
  redirect(withMessage(PAGE, "ok", `Catégorie « ${name} » créée.`));
}

export async function updateCategory(formData: FormData) {
  const { db } = await requireAdmin();
  const _id = toObjectId(text(formData, "id", 64));
  const name = text(formData, "name", 120);
  const slug = slugify(name);
  if (!_id || !name || !slug) {
    redirect(withMessage(PAGE, "error", "Le nom est obligatoire."));
  }

  let failure: string | null = null;
  try {
    await db.categories.updateOne(
      { _id },
      {
        $set: {
          name,
          slug,
          description: text(formData, "description", 500),
          sortOrder: int(formData, "sort_order"),
        },
      },
    );
  } catch (err) {
    failure = errorMessage(err);
  }
  if (failure) redirect(withMessage(PAGE, "error", failure));

  revalidateCatalog();
  redirect(withMessage(PAGE, "ok", `Catégorie « ${name} » enregistrée.`));
}

export async function deleteCategory(formData: FormData) {
  const { db } = await requireAdmin();
  const _id = toObjectId(text(formData, "id", 64));
  if (!_id) redirect(withMessage(PAGE, "error", "Catégorie introuvable."));

  const count = await db.realisations.countDocuments({ categoryId: _id });
  if (count > 0) {
    redirect(
      withMessage(
        PAGE,
        "error",
        `Impossible de supprimer : cette catégorie contient encore ${count} réalisation(s). Déplacez-les ou supprimez-les d'abord.`,
      ),
    );
  }

  await db.categories.deleteOne({ _id });
  revalidateCatalog();
  redirect(withMessage(PAGE, "ok", "Catégorie supprimée."));
}
