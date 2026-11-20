"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth/cookies";
import { isDbConfigured } from "@/lib/db/config";
import { collections } from "@/lib/db/mongo";

export type LoginState = { error?: string; email?: string };

const INVALID = "Email ou mot de passe incorrect.";

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const password = String(formData.get("password") ?? "").slice(0, 200);

  if (!isDbConfigured) {
    return { error: "La base de données n'est pas encore configurée.", email };
  }
  if (!email || !password) {
    return { error: "Veuillez saisir votre email et votre mot de passe.", email };
  }

  const db = await collections();
  const admin = await db.admins.findOne({ email });
  const ok = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
  if (!admin || !ok) {
    // Ralentit les essais de mots de passe en série.
    await new Promise((r) => setTimeout(r, 800));
    return { error: INVALID, email };
  }

  await createSession({ adminId: admin._id.toHexString(), email: admin.email });
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
