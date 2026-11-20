"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "@/app/admin/auth-actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form
      action={action}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          className="admin-input mt-1"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Mot de passe</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-input mt-1"
        />
      </label>

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        <LogIn className="h-4 w-4" />
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
