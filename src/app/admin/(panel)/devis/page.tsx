import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { DeleteForm, Notice, SubmitButton } from "@/components/admin/ui";
import { WhatsAppIcon } from "@/components/ui/SocialLinks";
import { QUOTE_STATUS_LABELS } from "@/constants/quote";
import { listQuotes } from "@/lib/data/admin";
import { QUOTE_STATUSES, type QuoteStatus } from "@/lib/db/mongo";
import { cn, telHref, whatsappUrl } from "@/lib/utils";
import { deleteQuote, setQuoteStatus } from "./actions";

const BADGE: Record<QuoteStatus, string> = {
  nouveau: "bg-brand-600 text-white",
  "en-cours": "bg-amber-100 text-amber-800",
  traite: "bg-emerald-100 text-emerald-800",
};

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string; ok?: string; error?: string }>;
}) {
  const { statut, ok, error } = await searchParams;
  const filter = QUOTE_STATUSES.find((s) => s === statut);
  const quotes = await listQuotes(filter);
  const back = filter ? `/admin/devis?statut=${filter}` : "/admin/devis";

  const tabs = [
    { label: "Toutes", href: "/admin/devis", active: !filter },
    ...QUOTE_STATUSES.map((s) => ({
      label: QUOTE_STATUS_LABELS[s],
      href: `/admin/devis?statut=${s}`,
      active: filter === s,
    })),
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
        Demandes de devis
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Les demandes envoyées depuis la page « Devis » du site. Rappelez le
        client, puis changez le statut pour suivre l&apos;avancement.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition",
              t.active ? "bg-zinc-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6">
        <Notice error={error} success={ok} />
      </div>

      {quotes.length === 0 ? (
        <p className="admin-card text-sm text-slate-500">Aucune demande pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {quotes.map((q) => {
            const info = [
              ["Dimensions", q.dimensions],
              ["Quantité", q.quantity],
              ["Délai", q.deadline],
              ["Pose", q.installation],
              ["Ville", q.city],
            ].filter(([, value]) => value);
            const reply = `Bonjour ${q.name}, SK Design suite à votre demande de devis (${q.service}).`;

            return (
              <li key={q.id} className={cn("admin-card", q.status === "nouveau" && "ring-2 ring-brand-600/30")}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      {q.name}
                      {q.company && <span className="font-medium text-slate-500"> · {q.company}</span>}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(q.createdAt).toLocaleString("fr-TN", { dateStyle: "full", timeStyle: "short" })}
                    </p>
                  </div>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-bold", BADGE[q.status])}>
                    {QUOTE_STATUS_LABELS[q.status]}
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold text-brand-700">{q.service}</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-700">{q.details}</p>

                {info.length > 0 && (
                  <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
                    {info.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs font-medium text-slate-500">{label}</dt>
                        <dd className="font-medium text-slate-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                  <a
                    href={telHref(q.phone)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {q.phone}
                  </a>
                  <a
                    href={whatsappUrl(q.phone, reply)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#15803d] px-3 py-2 text-xs font-semibold text-white hover:bg-[#166534]"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  {q.email && (
                    <a
                      href={`mailto:${q.email}?subject=${encodeURIComponent("Votre demande de devis SK Design")}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {q.email}
                    </a>
                  )}

                  <div className="ml-auto flex flex-wrap items-center gap-2">
                    {QUOTE_STATUSES.filter((s) => s !== q.status).map((s) => (
                      <form key={s} action={setQuoteStatus}>
                        <input type="hidden" name="id" value={q.id} />
                        <input type="hidden" name="status" value={s} />
                        <input type="hidden" name="back" value={back} />
                        <SubmitButton variant="ghost" pendingLabel="…" className="!px-3 !py-1.5 !text-xs">
                          Marquer « {QUOTE_STATUS_LABELS[s]} »
                        </SubmitButton>
                      </form>
                    ))}
                    <DeleteForm
                      action={deleteQuote}
                      id={q.id}
                      confirmMessage={`Supprimer la demande de ${q.name} ?`}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
