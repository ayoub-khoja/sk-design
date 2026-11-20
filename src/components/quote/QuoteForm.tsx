"use client";

import { Suspense, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitQuote } from "@/app/(site)/devis/actions";
import { WhatsAppIcon } from "@/components/ui/SocialLinks";
import {
  QUOTE_DEADLINES,
  QUOTE_INSTALLATION,
  QUOTE_OTHER_SERVICE,
  type QuoteFormState,
} from "@/constants/quote";
import { SITE } from "@/constants/site";
import { cn, whatsappUrl } from "@/lib/utils";

export type ServiceOption = { slug: string; name: string };

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[15px] text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 aria-[invalid=true]:border-red-500";

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-zinc-800">
        {label}
        {required ? (
          <span className="text-brand-600" aria-hidden> *</span>
        ) : (
          <span className="font-normal text-zinc-500"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-zinc-600">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Présélection du service depuis l'URL (?service=<slug>). */
function ServiceFromUrl({ onSelect }: { onSelect: (slug: string) => void }) {
  const slug = useSearchParams().get("service");
  useEffect(() => {
    if (slug) onSelect(slug);
  }, [slug, onSelect]);
  return null;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
    >
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      {pending ? "Envoi en cours…" : "Envoyer ma demande de devis"}
    </button>
  );
}

export function QuoteForm({ services }: { services: ServiceOption[] }) {
  const [state, formAction] = useActionState<QuoteFormState, FormData>(submitQuote, {});
  const [urlService, setUrlService] = useState<string | null>(null);
  // Confirmation affichée jusqu'au clic sur « Faire une autre demande ».
  const [dismissed, setDismissed] = useState<QuoteFormState | null>(null);
  const sent = state.ok && state !== dismissed ? state : null;

  if (sent) {
    return (
      <div role="status" className="rounded-[1.75rem] bg-white p-8 text-center shadow-[0_30px_70px_-40px_rgba(9,9,11,0.45)] ring-1 ring-zinc-200/80 sm:p-12">
        <CheckCircle2 aria-hidden className="mx-auto h-14 w-14 text-emerald-500" />
        <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-zinc-950 sm:text-3xl">
          Demande envoyée, merci !
        </h2>
        <p className="mx-auto mt-3 max-w-md text-zinc-600">
          Notre atelier étudie votre projet et vous recontacte très vite par
          téléphone ou WhatsApp avec un devis gratuit.
        </p>
        {sent.summary && (
          <a
            href={whatsappUrl(SITE.phones[0], `${sent.summary}\n\n(Demande envoyée depuis le site, j'ajoute des photos.)`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-[#15803d] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-[#166534]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Envoyer aussi des photos sur WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="mt-4 block w-full text-sm font-semibold text-zinc-700 underline-offset-4 hover:text-brand-600 hover:underline"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.fields ?? {};
  const preselected = services.find((s) => s.slug === urlService)?.name;
  const a11y = (id: string, hint?: boolean) => ({
    id,
    name: id,
    "aria-invalid": err[id] ? true : undefined,
    "aria-describedby": err[id] ? `${id}-error` : hint ? `${id}-hint` : undefined,
  });

  return (
    <form
      action={formAction}
      noValidate
      className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_30px_70px_-40px_rgba(9,9,11,0.45)] ring-1 ring-zinc-200/80 sm:p-8 lg:p-10"
    >
      <Suspense fallback={null}>
        <ServiceFromUrl onSelect={setUrlService} />
      </Suspense>

      {state.error && (
        <div role="alert" className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{state.error}</p>
          {state.summary && (
            <a
              href={whatsappUrl(SITE.phones[0], state.summary)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#15803d] px-4 py-2 font-semibold text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Envoyer sur WhatsApp
            </a>
          )}
        </div>
      )}

      {/* Champ piège pour les robots : invisible pour les visiteurs */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="font-[family-name:var(--font-outfit)] text-lg font-bold text-zinc-950">
          1. Votre projet
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id="service" label="Service souhaité" required error={err.service} className="sm:col-span-2">
            <select
              key={preselected ?? "aucun"}
              {...a11y("service")}
              required
              defaultValue={v.service ?? preselected ?? ""}
              className={inputClass}
            >
              <option value="" disabled>
                Choisissez un service…
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value={QUOTE_OTHER_SERVICE}>{QUOTE_OTHER_SERVICE}</option>
            </select>
          </Field>

          <Field
            id="details"
            label="Description du projet"
            required
            hint="Type de support, texte ou logo à faire figurer, couleurs, emplacement…"
            error={err.details}
            className="sm:col-span-2"
          >
            <textarea
              {...a11y("details", true)}
              required
              rows={5}
              defaultValue={v.details}
              placeholder="Ex. : enseigne lumineuse LED pour ma pharmacie, façade de 4 m, logo existant."
              className={cn(inputClass, "resize-y")}
            />
          </Field>

          <Field id="dimensions" label="Dimensions approximatives" error={err.dimensions}>
            <input {...a11y("dimensions")} defaultValue={v.dimensions} placeholder="Ex. : 300 × 80 cm" className={inputClass} />
          </Field>
          <Field id="quantity" label="Quantité" error={err.quantity}>
            <input {...a11y("quantity")} defaultValue={v.quantity} placeholder="Ex. : 1 enseigne, 500 cartes" className={inputClass} />
          </Field>

          <Field id="deadline" label="Délai souhaité" error={err.deadline}>
            <select {...a11y("deadline")} defaultValue={v.deadline ?? ""} className={inputClass}>
              <option value="">Choisir…</option>
              {QUOTE_DEADLINES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field id="installation" label="Pose / installation" error={err.installation}>
            <select {...a11y("installation")} defaultValue={v.installation ?? ""} className={inputClass}>
              <option value="">Choisir…</option>
              {QUOTE_INSTALLATION.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-zinc-100 pt-8">
        <legend className="font-[family-name:var(--font-outfit)] text-lg font-bold text-zinc-950">
          2. Vos coordonnées
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Nom complet" required error={err.name}>
            <input {...a11y("name")} required autoComplete="name" defaultValue={v.name} className={inputClass} />
          </Field>
          <Field id="phone" label="Téléphone / WhatsApp" required error={err.phone}>
            <input
              {...a11y("phone")}
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              defaultValue={v.phone}
              placeholder="Ex. : 26 986 526"
              className={inputClass}
            />
          </Field>
          <Field id="email" label="Email" error={err.email}>
            <input {...a11y("email")} type="email" autoComplete="email" defaultValue={v.email} className={inputClass} />
          </Field>
          <Field id="company" label="Société / commerce" error={err.company}>
            <input {...a11y("company")} autoComplete="organization" defaultValue={v.company} className={inputClass} />
          </Field>
          <Field id="city" label="Ville" error={err.city} className="sm:col-span-2">
            <input {...a11y("city")} autoComplete="address-level2" defaultValue={v.city} placeholder="Ex. : Sayada, Monastir, Sousse…" className={inputClass} />
          </Field>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-zinc-600 sm:max-w-xs">
          Devis gratuit et sans engagement. Vos coordonnées servent uniquement
          à vous répondre.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
