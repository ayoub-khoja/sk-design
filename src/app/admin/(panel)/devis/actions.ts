"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/data/auth";
import { withMessage } from "@/lib/data/helpers";
import { QUOTE_STATUSES, toObjectId, type QuoteStatus } from "@/lib/db/mongo";

const PAGE = "/admin/devis";

export async function setQuoteStatus(formData: FormData) {
  const { db } = await requireAdmin();
  const _id = toObjectId(String(formData.get("id") ?? ""));
  const status = String(formData.get("status") ?? "") as QuoteStatus;
  if (!_id || !QUOTE_STATUSES.includes(status)) {
    redirect(withMessage(PAGE, "error", "Demande introuvable."));
  }
  await db.quotes.updateOne({ _id }, { $set: { status } });
  revalidatePath("/admin", "layout");
  const back = String(formData.get("back") ?? PAGE);
  redirect(back.startsWith(PAGE) ? back : PAGE);
}

export async function deleteQuote(formData: FormData) {
  const { db } = await requireAdmin();
  const _id = toObjectId(String(formData.get("id") ?? ""));
  if (!_id) redirect(withMessage(PAGE, "error", "Demande introuvable."));
  await db.quotes.deleteOne({ _id });
  revalidatePath("/admin", "layout");
  redirect(withMessage(PAGE, "ok", "Demande supprimée."));
}
