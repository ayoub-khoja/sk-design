import Link from "next/link";
import { notFound } from "next/navigation";
import { RealisationForm } from "@/components/admin/RealisationForm";
import { getRealisation, listCategories } from "@/lib/data/admin";
import { publicImageUrl } from "@/lib/db/config";

export default async function EditRealisationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [realisation, categories] = await Promise.all([
    getRealisation(id),
    listCategories(),
  ]);
  if (!realisation) notFound();

  const images = realisation.images.map((img) => ({
    ...img,
    url: publicImageUrl(img.storage_path),
  }));

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/realisations" className="text-sm text-slate-500 hover:text-slate-900">
        ← Réalisations
      </Link>
      <h1 className="mb-6 mt-2 font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
        Modifier la réalisation
      </h1>
      <RealisationForm
        key={realisation.updated_at}
        realisation={realisation}
        images={images}
        categories={categories}
      />
    </div>
  );
}
