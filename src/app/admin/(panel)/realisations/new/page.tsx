import Link from "next/link";
import { RealisationForm } from "@/components/admin/RealisationForm";
import { listCategories } from "@/lib/data/admin";

export default async function NewRealisationPage() {
  const categories = await listCategories();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/realisations" className="text-sm text-slate-500 hover:text-slate-900">
        ← Réalisations
      </Link>
      <h1 className="mb-6 mt-2 font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
        Nouvelle réalisation
      </h1>
      <RealisationForm categories={categories} />
    </div>
  );
}
