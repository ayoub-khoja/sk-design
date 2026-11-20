"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { isDbConfigured } from "@/lib/db/config";
import { collections } from "@/lib/db/mongo";
import { QUOTE_DEADLINES, QUOTE_INSTALLATION, type QuoteFormState } from "@/constants/quote";

const FIELDS = {
  name: 100,
  phone: 30,
  email: 160,
  company: 120,
  city: 80,
  service: 120,
  details: 3000,
  dimensions: 200,
  quantity: 80,
  deadline: 80,
  installation: 80,
} as const;

type Field = keyof typeof FIELDS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Résumé lisible de la demande (WhatsApp, ou copie de secours). */
function summarize(v: Record<Field, string>) {
  return [
    "Bonjour SK Design, je souhaite un devis :",
    `• Service : ${v.service}`,
    v.dimensions && `• Dimensions : ${v.dimensions}`,
    v.quantity && `• Quantité : ${v.quantity}`,
    v.deadline && `• Délai : ${v.deadline}`,
    v.installation && `• Pose : ${v.installation}`,
    `• Projet : ${v.details}`,
    `— ${v.name}${v.company ? ` (${v.company})` : ""}${v.city ? `, ${v.city}` : ""} · ${v.phone}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitQuote(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const values = Object.fromEntries(
    (Object.keys(FIELDS) as Field[]).map((k) => [
      k,
      String(formData.get(k) ?? "").trim().slice(0, FIELDS[k]),
    ]),
  ) as Record<Field, string>;

  // Champ piège invisible : rempli seulement par les robots.
  if (String(formData.get("website") ?? "")) return { ok: true, summary: "" };

  const fields: Record<string, string> = {};
  if (values.name.length < 2) fields.name = "Indiquez votre nom.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) fields.phone = "Numéro de téléphone invalide (8 chiffres minimum).";
  if (values.email && !EMAIL_RE.test(values.email)) fields.email = "Adresse email invalide.";
  if (!values.service) fields.service = "Choisissez un service.";
  if (values.details.length < 10) fields.details = "Décrivez votre projet en quelques mots (10 caractères minimum).";
  if (values.deadline && !(QUOTE_DEADLINES as readonly string[]).includes(values.deadline)) values.deadline = "";
  if (values.installation && !(QUOTE_INSTALLATION as readonly string[]).includes(values.installation)) values.installation = "";

  if (Object.keys(fields).length > 0) {
    return { error: "Merci de corriger les champs indiqués.", fields, values };
  }

  const summary = summarize(values);

  if (!isDbConfigured) {
    return {
      error: "L'envoi en ligne est momentanément indisponible. Envoyez-nous votre demande sur WhatsApp :",
      values,
      summary,
    };
  }

  try {
    const db = await collections();
    // Limite simple contre les envois répétés : 3 demandes / 10 min par numéro.
    const recent = await db.quotes.countDocuments({
      phone: values.phone,
      createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) },
    });
    if (recent >= 3) {
      return {
        error: "Vous avez déjà envoyé plusieurs demandes. Nous vous recontactons très vite, ou écrivez-nous sur WhatsApp :",
        values,
        summary,
      };
    }

    await db.quotes.insertOne({
      _id: new ObjectId(),
      ...values,
      status: "nouveau",
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Demande de devis non enregistrée", err);
    return {
      error: "Un problème technique a empêché l'envoi. Envoyez-nous votre demande sur WhatsApp :",
      values,
      summary,
    };
  }

  revalidatePath("/admin", "layout");
  return { ok: true, summary };
}
