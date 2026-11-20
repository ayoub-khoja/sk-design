import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { DeleteForm, Notice } from "@/components/admin/ui";
import { listCategories, listRealisations } from "@/lib/data/admin";
import { publicImageUrl } from "@/lib/db/config";
import { cn } from "@/lib/utils";
import { deleteRealisation, togglePublished } from "./actions";

export default async function RealisationsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; categorie?: string }>;
}) {
  const { ok, error, categorie } = await searchParams;
  const [categories, realisations] = await Promise.all([
    listCategories(),
    listRealisations(categorie),
  ]);
  const categoryName = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
            Réalisations
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Les réalisations publiées apparaissent sur la page Réalisations
            du site.
          </p>
        </div>
        <Link
          href="/admin/realisations/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Nouvelle réalisation
        </Link>
      </div>

      <div className="mt-6">
        <Notice error={error} success={ok} />
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <FilterLink href="/admin/realisations" active={!categorie}>
          Toutes
        </FilterLink>
        {categories.map((c) => (
          <FilterLink
            key={c.id}
            href={`/admin/realisations?categorie=${c.id}`}
            active={categorie === c.id}
          >
            {c.name} ({c.count})
          </FilterLink>
        ))}
      </div>

      {realisations.length === 0 ? (
        <div className="admin-card text-center text-sm text-slate-500">
          Aucune réalisation.{" "}
          <Link href="/admin/realisations/new" className="font-semibold text-brand-600">
            En ajouter une
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {realisations.map((r) => {
            const cover = r.images[0];
            return (
              <li
                key={r.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center"
              >
                <Link
                  href={`/admin/realisations/${r.id}`}
                  className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-36"
                >
                  {cover ? (
                    <Image
                      src={publicImageUrl(cover.storage_path)}
                      alt={cover.alt}
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-xs text-slate-400">
                      Pas de photo
                    </span>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        r.is_published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {r.is_published ? "Publiée" : "Brouillon"}
                    </span>
                    {r.is_featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                        <Star className="h-3 w-3" /> À la une
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {categoryName.get(r.category_id)} · {r.images.length} photo(s)
                    </span>
                  </div>
                  <Link
                    href={`/admin/realisations/${r.id}`}
                    className="mt-1 block truncate font-semibold text-slate-900 hover:text-brand-600"
                  >
                    {r.title}
                  </Link>
                  <p className="truncate text-sm text-slate-500">{r.description}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/admin/realisations/${r.id}`}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Modifier
                  </Link>
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="publish" value={r.is_published ? "0" : "1"} />
                    <button
                      type="submit"
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      {r.is_published ? "Masquer" : "Publier"}
                    </button>
                  </form>
                  <DeleteForm
                    action={deleteRealisation}
                    id={r.id}
                    confirmMessage={`Supprimer « ${r.title} » et ses photos ? Cette action est définitive.`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition",
        active ? "bg-zinc-900 text-white" : "bg-white text-slate-600 hover:bg-slate-200",
      )}
    >
      {children}
    </Link>
  );
}
