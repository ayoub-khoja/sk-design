import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { LoginForm } from "@/components/admin/LoginForm";
import { SITE } from "@/constants/site";
import { isDbConfigured } from "@/lib/db/config";

export const metadata: Metadata = {
  title: "Connexion — Espace admin | SK Design",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  // Lu à chaque requête : la configuration peut changer après le build.
  await connection();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src={SITE.logo}
            alt={SITE.name}
            width={64}
            height={64}
            className="rounded-xl"
          />
          <h1 className="mt-4 font-[family-name:var(--font-outfit)] text-2xl font-extrabold text-slate-900">
            Espace administrateur
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gestion des réalisations {SITE.name}
          </p>
        </div>

        {isDbConfigured ? (
          <LoginForm />
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-semibold">Base de données non configurée</p>
            <p className="mt-2">
              Ajoutez <code>MONGODB_URI</code> et <code>SESSION_SECRET</code>{" "}
              dans <code>.env.local</code>, puis redémarrez{" "}
              <code>npm run dev</code>. Voir <code>docs/mongodb.md</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
