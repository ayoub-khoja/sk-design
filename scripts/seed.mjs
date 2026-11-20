// Initialise MongoDB avec le compte admin + le catalogue actuel du site.
//
//   node --env-file=.env.local scripts/seed.mjs
//   node --env-file=.env.local scripts/seed.mjs --reset-password   (change le mot de passe admin)
//
// Peut être relancé sans risque : ce qui existe déjà est ignoré.

import { readFile } from "node:fs/promises";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RESET_PASSWORD = process.argv.includes("--reset-password");

// Permet d'importer src/constants/*.ts (imports sans extension).
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (specifier.startsWith(".")) return nextResolve(`${specifier}.ts`, context);
      throw err;
    }
  },
});

const { WORKS, WORK_CATEGORIES } = await import(
  "../src/constants/services.ts"
);

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("✗ MONGODB_URI doit être défini dans .env.local (voir docs/mongodb.md)");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "skdesign");
const admins = db.collection("admins");
const categories = db.collection("categories");
const realisations = db.collection("realisations");
const photos = new GridFSBucket(db, { bucketName: "photos" });

// ── 0. Index ────────────────────────────────────────────────────────────
await admins.createIndex({ email: 1 }, { unique: true });
await categories.createIndex({ slug: 1 }, { unique: true });
await realisations.createIndex({ categoryId: 1 });
await realisations.createIndex({ seedKey: 1 }, { sparse: true });
await realisations.createIndex({ isPublished: 1, sortOrder: 1 });

// ── 1. Compte administrateur ────────────────────────────────────────────
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.log("• ADMIN_EMAIL / ADMIN_PASSWORD absents : compte admin non modifié.");
} else if (password.length < 8) {
  console.error("✗ ADMIN_PASSWORD doit faire au moins 8 caractères.");
  process.exit(1);
} else {
  const existing = await admins.findOne({ email });
  if (!existing) {
    await admins.insertOne({
      email,
      passwordHash: await bcrypt.hash(password, 12),
      createdAt: new Date(),
    });
    console.log(`✓ Compte admin créé : ${email}`);
  } else if (RESET_PASSWORD) {
    await admins.updateOne(
      { _id: existing._id },
      { $set: { passwordHash: await bcrypt.hash(password, 12) } },
    );
    console.log(`✓ Mot de passe admin mis à jour : ${email}`);
  } else {
    console.log(`• Compte admin déjà présent : ${email}`);
  }
}

// ── 2. Catégories ───────────────────────────────────────────────────────
for (const [i, f] of WORK_CATEGORIES.entries()) {
  await categories.updateOne(
    { slug: f.id },
    {
      $setOnInsert: {
        slug: f.id,
        name: f.label,
        description: "",
        sortOrder: i + 1,
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );
}
const categoryIds = new Map(
  (await categories.find().toArray()).map((c) => [c.slug, c._id]),
);
console.log(`✓ ${categoryIds.size} catégories`);

// ── 3. Réalisations + photos ────────────────────────────────────────────
async function uploadLocalPhoto(localSrc) {
  const filePath = path.join(ROOT, "public", ...localSrc.split("/").filter(Boolean));
  // Même compression que les envois depuis /admin (src/lib/db/media.ts).
  const data = await sharp(await readFile(filePath))
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  const name = path.basename(filePath).replace(/\.[^.]+$/, "") + ".webp";

  return new Promise((resolve, reject) => {
    const upload = photos.openUploadStream(name, {
      metadata: { contentType: "image/webp" },
    });
    upload.once("error", reject);
    upload.once("finish", () => resolve(upload.id));
    upload.end(data);
  });
}

// Titres utilisés par les versions précédentes du catalogue, pour retrouver
// les réalisations déjà importées et les mettre à jour au lieu de les dupliquer.
const LEGACY_TITLES = {
  caisson: ["Caissons Lumineux LED & Enseignes de Façade"],
  vitrine: ["Habillage Vitrine & Façade en Vinyle Polymère"],
  silhouettes: ["Silhouettes & Panneaux Découpés en Forex"],
  journaux: ["Journaux de Classe Enseignants & Registres Personnalisés"],
  cahiers: ["Cahiers de Préparation Pédagogique & Feuilles de TD"],
};

/** Noms de fichiers GridFS déjà attachés à une réalisation. */
async function fileNamesOf(doc) {
  const ids = doc.images.map((img) => img.fileId);
  const files = await db.collection("photos.files").find({ _id: { $in: ids } }).toArray();
  return new Set(files.map((f) => f.filename));
}
const webpName = (src) => path.basename(src).replace(/\.[^.]+$/, "") + ".webp";

let created = 0;
let updated = 0;
let photosAdded = 0;
for (const [index, work] of WORKS.entries()) {
  const categoryId = categoryIds.get(work.category);
  if (!categoryId) {
    console.error(`✗ Catégorie « ${work.category} » introuvable pour « ${work.title} »`);
    process.exit(1);
  }

  let doc = await realisations.findOne({ seedKey: work.id });
  const firstSync = !doc;
  doc ??= await realisations.findOne({
    title: { $in: [work.title, ...(LEGACY_TITLES[work.id] ?? [])] },
  });

  if (!doc) {
    const images = [];
    for (const [i, img] of work.images.entries()) {
      images.push({ fileId: await uploadLocalPhoto(img.src), alt: img.alt, sortOrder: i });
    }
    const now = new Date();
    await realisations.insertOne({
      _id: new ObjectId(),
      seedKey: work.id,
      title: work.title,
      description: work.description,
      isFeatured: Boolean(work.featured),
      categoryId,
      isPublished: true,
      sortOrder: index + 1,
      images,
      createdAt: now,
      updatedAt: now,
    });
    created++;
    console.log(`  + ${work.title} (${images.length} photo(s))`);
    continue;
  }

  // Réalisation déjà présente : on ajoute seulement les photos manquantes.
  const known = await fileNamesOf(doc);
  const extra = [];
  let order = doc.images.reduce((max, img) => Math.max(max, img.sortOrder), -1);
  for (const img of work.images) {
    if (known.has(webpName(img.src))) continue;
    extra.push({ fileId: await uploadLocalPhoto(img.src), alt: img.alt, sortOrder: ++order });
  }

  const set = { seedKey: work.id };
  if (firstSync) {
    // Première synchronisation : textes du nouveau catalogue, anciens champs retirés.
    Object.assign(set, {
      title: work.title,
      description: work.description,
      sortOrder: index + 1,
    });
  }
  if (extra.length) set.updatedAt = new Date();
  await realisations.updateOne(
    { _id: doc._id },
    {
      $set: set,
      $push: { images: { $each: extra } },
      ...(firstSync ? { $unset: { tags: "", kicker: "", note: "", ctaLabel: "" } } : {}),
    },
  );
  if (extra.length || firstSync) {
    updated++;
    console.log(`  ~ ${work.title}${extra.length ? ` (+${extra.length} photo(s))` : ""}`);
  }
  photosAdded += extra.length;
}

console.log(
  `✓ ${created} réalisation(s) créée(s), ${updated} mise(s) à jour, ${photosAdded} photo(s) ajoutée(s)`,
);
await client.close();
console.log("\nTerminé. Connectez-vous sur /admin/login");
