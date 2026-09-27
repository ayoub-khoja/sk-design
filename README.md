# SK Design — Site Vitrine

Site Next.js professionnel pour **SK Design** (impression & publicité, Tunisie).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Framer Motion** (animations d’entrée / hover)
- **Lucide React** (icônes)
- **next/image** + Unsplash (visuels HD)

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                 # layout + page d’accueil
  components/
    layout/            # Header, AnnouncementBar, Footer
    sections/          # Hero, Configurator, Portfolio, etc.
    ui/                # Button, Badge, AnimateIn
  constants/           # contenus & infos contact
  lib/                 # utilitaires
```

## Scripts

- `npm run dev` — développement
- `npm run build` — build production
- `npm run start` — serveur production
