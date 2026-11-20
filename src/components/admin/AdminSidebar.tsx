"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  FileText,
  FolderTree,
  Images,
  LayoutDashboard,
  LogOut,
  UserCog,
} from "lucide-react";
import { logout } from "@/app/admin/auth-actions";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/realisations", label: "Réalisations", icon: Images },
  { href: "/admin/categories", label: "Catégories", icon: FolderTree },
  { href: "/admin/devis", label: "Demandes de devis", icon: FileText },
  { href: "/admin/compte", label: "Mon compte", icon: UserCog },
] as const;

export function AdminSidebar({ email, newQuotes = 0 }: { email: string; newQuotes?: number }) {
  const pathname = usePathname();

  return (
    <aside className="border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-5 py-4">
        <Image
          src={SITE.logo}
          alt={SITE.name}
          width={36}
          height={36}
          className="rounded-lg"
        />
        <div>
          <p className="text-sm font-extrabold text-slate-900">{SITE.name}</p>
          <p className="text-[11px] font-medium text-slate-500">Espace admin</p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-zinc-900 text-white"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {href === "/admin/devis" && newQuotes > 0 && (
                <span
                  className="ml-auto rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white"
                  aria-label={`${newQuotes} nouvelle(s)`}
                >
                  {newQuotes}
                </span>
              )}
            </Link>
          );
        })}
        <Link
          href="/realisations"
          target="_blank"
          className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <ExternalLink className="h-4 w-4" />
          Voir le site
        </Link>
      </nav>

      <div className="hidden border-t border-slate-200 p-4 lg:block">
        <p className="truncate text-xs text-slate-500" title={email}>
          {email}
        </p>
        <form action={logout} className="mt-2">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-600"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </form>
      </div>
      <form action={logout} className="px-5 pb-3 lg:hidden">
        <button
          type="submit"
          className="flex items-center gap-2 text-xs font-semibold text-slate-600"
        >
          <LogOut className="h-3.5 w-3.5" />
          Déconnexion ({email})
        </button>
      </form>
    </aside>
  );
}
