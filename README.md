# SK Design — Site vitrine & espace admin

Site Next.js de **SK Design** (impression & publicité, Tunisie) avec un espace
d'administration pour gérer les réalisations.

## Stack

- **Next.js 16** (App Router) + TypeScript, **Tailwind CSS 4**, Framer Motion
- **MongoDB Atlas** : réalisations, catégories, compte admin et photos (GridFS)
- Photos compressées automatiquement en WebP (sharp)

## Démarrer

```bash
npm install
npm run dev
```

Site : <http://localhost:3000> — Admin : <http://localhost:3000/admin>

La configuration de la base (fichier `.env.local`, import du catalogue) est
expliquée dans [docs/mongodb.md](docs/mongodb.md). Sans base configurée, le site
affiche le catalogue par défaut de `src/constants/services.ts`.

## Structure

```
src/
  app/(site)/        pages publiques : accueil, réalisations, pages légales
  app/admin/         espace admin (connexion, réalisations, catégories, compte)
  app/media/[id]/    photos servies depuis MongoDB
  components/        sections, mise en page, UI, admin
  constants/         textes, catégories, catalogue par défaut, photos
  lib/               accès aux données, MongoDB, session
scripts/seed.mjs     import du catalogue et des photos dans MongoDB
public/realisations/ photos d'origine du catalogue par défaut
```

## Scripts

- `npm run dev` — développement
- `npm run build` / `npm run start` — production
- `npm run lint` — vérification du code
- `node --env-file=.env.local scripts/seed.mjs` — importer / synchroniser le catalogue
