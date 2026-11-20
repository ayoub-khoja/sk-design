import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getSessionToken } from "@/lib/auth/cookies";
import { readSession } from "@/lib/auth/session";
import { isDbConfigured } from "@/lib/db/config";
import { collections, toObjectId } from "@/lib/db/mongo";

/**
 * Vérifie qu'un admin est connecté : jeton de session valide ET compte
 * toujours présent en base. À appeler en premier dans chaque page admin et
 * chaque Server Action.
 */
export const requireAdmin = cache(async () => {
  // Toujours vérifié à la requête, jamais figé au moment du build.
  await connection();
  if (!isDbConfigured) redirect("/admin/login");

  const session = await readSession(await getSessionToken());
  const adminId = session ? toObjectId(session.adminId) : null;
  if (!adminId) redirect("/admin/login");

  const db = await collections();
  const admin = await db.admins.findOne(
    { _id: adminId },
    { projection: { email: 1 } },
  );
  if (!admin) redirect("/admin/login");

  return { db, admin: { id: admin._id, email: admin.email } };
});
