"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

/** Bouton d'envoi qui se désactive pendant l'action. */
export function SubmitButton({
  children,
  pendingLabel = "Enregistrement…",
  variant = "dark",
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: "dark" | "red" | "ghost";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-60",
        variant === "dark" && "bg-zinc-900 text-white hover:bg-zinc-800",
        variant === "red" && "bg-brand-600 text-white hover:bg-brand-700",
        variant === "ghost" && "bg-slate-100 text-slate-700 hover:bg-slate-200",
        className,
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Formulaire de suppression avec confirmation. */
export function DeleteForm({
  action,
  id,
  confirmMessage,
  label = "Supprimer",
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  confirmMessage: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteButton label={label} />
    </form>
  );
}

function DeleteButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "Suppression…" : label}
    </button>
  );
}

/** Message de retour (succès / erreur) transmis par l'URL. */
export function Notice({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (!error && !success) return null;
  return (
    <p
      role={error ? "alert" : "status"}
      className={cn(
        "mb-5 rounded-lg px-4 py-3 text-sm",
        error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700",
      )}
    >
      {error ?? success}
    </p>
  );
}
