import { Notice, SubmitButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/data/auth";
import { changePassword } from "./actions";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const [{ ok, error }, { admin }] = await Promise.all([searchParams, requireAdmin()]);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
        Mon compte
      </h1>
      <p className="mt-1 text-sm text-slate-500">Connecté en tant que {admin.email}</p>

      <div className="mt-6">
        <Notice error={error} success={ok} />
      </div>

      <section className="admin-card">
        <h2 className="text-base font-bold text-slate-900">Changer le mot de passe</h2>
        <form action={changePassword} className="mt-4 space-y-4">
          <label className="block">
            <span className="admin-label">Mot de passe actuel</span>
            <input
              name="current"
              type="password"
              autoComplete="current-password"
              required
              className="admin-input mt-1"
            />
          </label>
          <label className="block">
            <span className="admin-label">Nouveau mot de passe (8 caractères minimum)</span>
            <input
              name="next"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="admin-input mt-1"
            />
          </label>
          <label className="block">
            <span className="admin-label">Confirmer le nouveau mot de passe</span>
            <input
              name="confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="admin-input mt-1"
            />
          </label>
          <SubmitButton>Enregistrer</SubmitButton>
        </form>
      </section>
    </div>
  );
}
