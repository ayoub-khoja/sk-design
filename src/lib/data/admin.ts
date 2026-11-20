import "server-only";
import { toObjectId } from "@/lib/db/mongo";
import { requireAdmin } from "./auth";
import {
  CATEGORY_SORT,
  REALISATION_SORT,
  toCategory,
  toRealisation,
} from "./mappers";

export async function listCategories() {
  const { db } = await requireAdmin();
  const [cats, counts] = await Promise.all([
    db.categories.find().sort(CATEGORY_SORT).toArray(),
    db.realisations
      .aggregate<{ _id: unknown; count: number }>([
        { $group: { _id: "$categoryId", count: { $sum: 1 } } },
      ])
      .toArray(),
  ]);
  const countOf = new Map(counts.map((c) => [String(c._id), c.count]));

  return cats.map((c) => ({
    ...toCategory(c),
    count: countOf.get(c._id.toHexString()) ?? 0,
  }));
}

export async function listRealisations(categoryId?: string) {
  const { db } = await requireAdmin();
  const catId = categoryId ? toObjectId(categoryId) : null;
  const filter = catId ? { categoryId: catId } : {};

  const docs = await db.realisations.find(filter).sort(REALISATION_SORT).toArray();
  return docs.map(toRealisation);
}

export async function getRealisation(id: string) {
  const { db } = await requireAdmin();
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await db.realisations.findOne({ _id });
  return doc ? toRealisation(doc) : null;
}

export async function getDashboardStats() {
  const { db } = await requireAdmin();
  const [total, published, categories, latest] = await Promise.all([
    db.realisations.countDocuments(),
    db.realisations.countDocuments({ isPublished: true }),
    db.categories.countDocuments(),
    db.realisations.find().sort({ updatedAt: -1 }).limit(5).toArray(),
  ]);

  return { total, published, categories, latest: latest.map(toRealisation) };
}
