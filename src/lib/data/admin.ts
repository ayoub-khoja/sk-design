import "server-only";
import { toObjectId, type QuoteStatus } from "@/lib/db/mongo";
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

// ─── Demandes de devis ──────────────────────────────────────────────────

export type AdminQuote = {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  service: string;
  details: string;
  dimensions: string;
  quantity: string;
  deadline: string;
  installation: string;
  status: QuoteStatus;
  createdAt: string;
};

export async function listQuotes(status?: QuoteStatus) {
  const { db } = await requireAdmin();
  const docs = await db.quotes
    .find(status ? { status } : {})
    .sort({ createdAt: -1 })
    .limit(300)
    .toArray();
  return docs.map(
    ({ _id, createdAt, ...rest }): AdminQuote => ({
      ...rest,
      id: _id.toHexString(),
      createdAt: createdAt.toISOString(),
    }),
  );
}

/** Nombre de demandes non traitées (badge du menu admin). */
export async function countNewQuotes() {
  const { db } = await requireAdmin();
  return db.quotes.countDocuments({ status: "nouveau" });
}
