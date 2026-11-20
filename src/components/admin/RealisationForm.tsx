"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImagePlus } from "lucide-react";
import {
  saveRealisation,
  type SaveState,
} from "@/app/admin/(panel)/realisations/actions";
import type { Category, Realisation } from "@/lib/data/types";
import { cn } from "@/lib/utils";

type ExistingImage = Realisation["images"][number] & { url: string };

export function RealisationForm({
  realisation,
  images = [],
  categories,
}: {
  realisation?: Realisation;
  images?: ExistingImage[];
  categories: Category[];
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(
    saveRealisation,
    {},
  );
  const [newFiles, setNewFiles] = useState<{ name: string; url: string }[]>([]);
  const [main, setMain] = useState(images[0]?.id ?? "new-0");

  // Libère les aperçus des fichiers sélectionnés.
  useEffect(
    () => () => newFiles.forEach((f) => URL.revokeObjectURL(f.url)),
    [newFiles],
  );

  const r = realisation;

  return (
    <form
      className="space-y-6"
      // Envoi manuel : évite la remise à zéro automatique du formulaire par
      // React, pour garder la saisie si le serveur renvoie une erreur.
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tooBig = formData
          .getAll("photos")
          .find((f) => f instanceof File && f.size > 15 * 1024 * 1024);
        if (tooBig instanceof File) {
          window.alert(`« ${tooBig.name} » dépasse 15 Mo.`);
          return;
        }
        startTransition(() => action(formData));
      }}
    >
      {r && <input type="hidden" name="id" value={r.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="admin-card space-y-4">
        <h2 className="text-base font-bold text-slate-900">Informations</h2>

        <label className="block">
          <span className="admin-label">Titre *</span>
          <input
            name="title"
            required
            defaultValue={r?.title}
            className="admin-input mt-1"
            placeholder="ex. Caisson lumineux LED pour une crèmerie"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="admin-label">Catégorie *</span>
            <select
              name="category_id"
              required
              defaultValue={r?.category_id ?? ""}
              className="admin-input mt-1"
            >
              <option value="" disabled>
                Choisir…
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <span className="mt-1 block text-xs text-amber-700">
                Créez d&apos;abord une catégorie dans{" "}
                <Link href="/admin/categories" className="underline">
                  Catégories
                </Link>
                .
              </span>
            )}
          </label>
        </div>

        <label className="block">
          <span className="admin-label">Description</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={r?.description}
            className="admin-input mt-1"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="admin-label">Ordre d&apos;affichage</span>
            <input
              name="sort_order"
              type="number"
              defaultValue={r?.sort_order ?? 0}
              className="admin-input mt-1"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={r?.is_published ?? true}
              className="h-4 w-4 accent-zinc-900"
            />
            Publiée sur le site
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={r?.is_featured ?? false}
              className="h-4 w-4 accent-zinc-900"
            />
            À la une (affichée en premier dans sa catégorie)
          </label>
        </div>
      </section>

      <section className="admin-card">
        <h2 className="text-base font-bold text-slate-900">Photos</h2>
        <p className="mt-1 text-sm text-slate-500">
          JPG, PNG ou WebP, 15 Mo max par photo : elles sont compressées automatiquement. Choisissez la photo principale
          avec le bouton rond.
        </p>

        {images.length > 0 && (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <li key={img.id} className="rounded-xl border border-slate-200 p-2">
                <input type="hidden" name="image_ids" value={img.id} />
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="300px" />
                </div>
                <input
                  name={`alt_${img.id}`}
                  defaultValue={img.alt}
                  className="admin-input mt-2 text-xs"
                  placeholder="Description de la photo"
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 font-medium text-slate-700">
                    <input
                      type="radio"
                      name="main"
                      value={img.id}
                      checked={main === img.id}
                      onChange={() => setMain(img.id)}
                      className="accent-zinc-900"
                    />
                    Principale
                  </label>
                  <label className="flex items-center gap-1.5 font-medium text-red-600">
                    <input type="checkbox" name={`delete_${img.id}`} className="accent-red-600" />
                    Supprimer
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600 transition hover:border-zinc-900 hover:bg-slate-50">
          <ImagePlus className="h-6 w-6 text-slate-400" />
          <span className="font-semibold">Ajouter des photos</span>
          <span className="text-xs text-slate-500">Plusieurs fichiers possibles</span>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              setNewFiles(files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
              if (images.length === 0) setMain("new-0");
            }}
          />
        </label>

        {newFiles.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {newFiles.map((f, i) => (
              <li key={f.url} className="rounded-xl border border-slate-200 p-2">
                {/* Aperçu local (blob:) avant envoi */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt={f.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
                <label className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-700">
                  <input
                    type="radio"
                    name="main"
                    value={`new-${i}`}
                    checked={main === `new-${i}`}
                    onChange={() => setMain(`new-${i}`)}
                    className="accent-zinc-900"
                  />
                  Principale
                </label>
                <p className="truncate text-[11px] text-slate-400">{f.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/realisations"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60",
          )}
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
