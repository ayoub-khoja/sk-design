import Link from "next/link";
import { DeleteForm, Notice, SubmitButton } from "@/components/admin/ui";
import { listCategories } from "@/lib/data/admin";
import { createCategory, deleteCategory, updateCategory } from "./actions";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const [{ ok, error }, categories] = await Promise.all([
    searchParams,
    listCategories(),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
        Catégories
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Les catégories servent de filtres sur la page Réalisations du
        site. Seules celles qui contiennent des réalisations publiées
        apparaissent sur le site.
      </p>

      <div className="mt-6">
        <Notice error={error} success={ok} />
      </div>

      <section className="admin-card">
        <h2 className="text-base font-bold text-slate-900">Nouvelle catégorie</h2>
        <form
          action={createCategory}
          className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_110px_auto] sm:items-end"
        >
          <label className="block">
            <span className="admin-label">Nom</span>
            <input name="name" required className="admin-input mt-1" placeholder="ex. Enseignes Lumineuses" />
          </label>
          <label className="block">
            <span className="admin-label">Description (optionnel)</span>
            <input name="description" className="admin-input mt-1" />
          </label>
          <label className="block">
            <span className="admin-label">Ordre</span>
            <input name="sort_order" type="number" defaultValue={categories.length + 1} className="admin-input mt-1" />
          </label>
          <SubmitButton>Ajouter</SubmitButton>
        </form>
      </section>

      <section className="admin-card mt-6">
        <h2 className="text-base font-bold text-slate-900">
          {categories.length} catégorie(s)
        </h2>
        {categories.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Aucune catégorie pour le moment.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {categories.map((c) => (
              <li key={c.id} className="py-4">
                <form
                  action={updateCategory}
                  className="grid gap-3 sm:grid-cols-[1fr_1fr_90px_auto] sm:items-end"
                >
                  <input type="hidden" name="id" value={c.id} />
                  <label className="block">
                    <span className="admin-label">Nom</span>
                    <input name="name" required defaultValue={c.name} className="admin-input mt-1" />
                  </label>
                  <label className="block">
                    <span className="admin-label">Description</span>
                    <input name="description" defaultValue={c.description} className="admin-input mt-1" />
                  </label>
                  <label className="block">
                    <span className="admin-label">Ordre</span>
                    <input name="sort_order" type="number" defaultValue={c.sort_order} className="admin-input mt-1" />
                  </label>
                  <SubmitButton variant="ghost">Enregistrer</SubmitButton>
                </form>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <Link
                    href={`/admin/realisations?categorie=${c.id}`}
                    className="text-xs font-medium text-slate-500 hover:text-slate-900"
                  >
                    {c.count} réalisation(s) →
                  </Link>
                  <DeleteForm
                    action={deleteCategory}
                    id={c.id}
                    confirmMessage={`Supprimer la catégorie « ${c.name} » ?`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
