"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/data/auth";
import { withMessage } from "@/lib/data/helpers";

const PAGE = "/admin/compte";
const MIN_LENGTH = 8;

export async function changePassword(formData: FormData) {
  const { db, admin } = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "").slice(0, 200);
  const confirm = String(formData.get("confirm") ?? "").slice(0, 200);

  const doc = await db.admins.findOne({ _id: admin.id });
  if (!doc || !(await bcrypt.compare(current, doc.passwordHash))) {
    redirect(withMessage(PAGE, "error", "Mot de passe actuel incorrect."));
  }
  if (next.length < MIN_LENGTH) {
    redirect(
      withMessage(PAGE, "error", `Le nouveau mot de passe doit faire au moins ${MIN_LENGTH} caractères.`),
    );
  }
  if (next !== confirm) {
    redirect(withMessage(PAGE, "error", "Les deux nouveaux mots de passe ne correspondent pas."));
  }

  await db.admins.updateOne(
    { _id: admin.id },
    { $set: { passwordHash: await bcrypt.hash(next, 12) } },
  );
  redirect(withMessage(PAGE, "ok", "Mot de passe modifié."));
}
