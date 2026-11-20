import "server-only";
import { MongoClient, ObjectId, type Db } from "mongodb";
import { MONGODB_DB, MONGODB_URI } from "./config";

// Un seul client pour toute l'application. En développement, il est gardé
// sur globalThis pour survivre aux rechargements à chaud.
const globalForMongo = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
};

function getClient() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI n'est pas défini.");
  globalForMongo._mongoClient ??= new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
  })
    .connect()
    .catch((err) => {
      // Permet une nouvelle tentative au prochain appel.
      globalForMongo._mongoClient = undefined;
      throw err;
    });
  return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
  return (await getClient()).db(MONGODB_DB);
}

/** Convertit une chaîne en ObjectId, ou null si elle n'est pas valide. */
export function toObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) && /^[0-9a-f]{24}$/i.test(id) ? new ObjectId(id) : null;
}

// ─── Documents stockés ──────────────────────────────────────────────────

export type AdminDoc = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

export type CategoryDoc = {
  _id: ObjectId;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  createdAt: Date;
};

export type ImageDoc = {
  fileId: ObjectId;
  alt: string;
  sortOrder: number;
};

export type RealisationDoc = {
  _id: ObjectId;
  categoryId: ObjectId;
  title: string;
  // Anciens champs (plus affichés), conservés pour les données existantes
  kicker?: string;
  description: string;
  tags?: string[];
  note?: string;
  ctaLabel?: string;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  images: ImageDoc[];
  createdAt: Date;
  updatedAt: Date;
};

export async function collections() {
  const db = await getDb();
  return {
    admins: db.collection<AdminDoc>("admins"),
    categories: db.collection<CategoryDoc>("categories"),
    realisations: db.collection<RealisationDoc>("realisations"),
  };
}
