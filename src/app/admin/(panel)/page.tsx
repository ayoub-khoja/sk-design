import Image from "next/image";
import Link from "next/link";
import { FolderTree, Images, Plus, Globe } from "lucide-react";
import { getDashboardStats } from "@/lib/data/admin";
import { publicImageUrl } from "@/lib/db/config";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Réalisations", value: stats.total, icon: Images, href: "/admin/realisations" },
    { label: "Publiées sur le site", value: stats.published, icon: Globe, href: "/admin/realisations" },
    { label: "Catégories", value: stats.categories, icon: FolderTree, href: "/admin/categories" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gérez les réalisations affichées sur le site.
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

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="admin-card transition hover:-translate-y-0.5">
            <Icon className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-3xl font-extrabold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <section className="admin-card mt-6">
        <h2 className="text-base font-bold text-slate-900">Dernières modifications</h2>
        {stats.latest.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Aucune réalisation pour le moment.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {stats.latest.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/realisations/${r.id}`}
                  className="flex items-center gap-3 py-3 hover:bg-slate-50"
                >
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {r.images[0] && (
                      <Image
                        src={publicImageUrl(r.images[0].storage_path)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">
                      {r.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(r.updated_at).toLocaleString("fr-TN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                      {r.is_published ? "" : " · Brouillon"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
