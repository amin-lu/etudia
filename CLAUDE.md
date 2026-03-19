# ETUDIA — Studio de SaaS B2C distribués par les créateurs

## Contexte

Etudia est un studio qui construit des SaaS B2C toutes niches (éducation, fitness, bricolage, jardinage, droit…), les possède à 100%, et les distribue via des créateurs de contenu en affiliation (30-50% commission). Ce repo est le site vitrine + hub d'Etudia.

## Stack

- Next.js 15 (App Router, Server Components, Server Actions)
- Supabase (PostgreSQL + Auth + RLS)
- Tailwind CSS v4
- next-themes (dark par défaut)
- next-intl (routing /fr, /en — français par défaut)
- framer-motion (animations)
- lucide-react (icônes)
- recharts (charts)
- sonner (toasts)
- react-markdown + remark-gfm + rehype-highlight (blog)
- next/font → Inter (body) + Instrument Sans (titres)

## Commands

- Dev: `pnpm dev`
- Build: `pnpm build`
- Type check: `pnpm tsc --noEmit`
- Lint: `pnpm lint`

## Verification

After ANY code change:
1. `pnpm tsc --noEmit` — must pass with 0 errors
2. `pnpm build` — must compile successfully
3. Check dev server visually if UI changed

## Conventions

- TypeScript strict, zéro `any`
- Server Components par défaut, `"use client"` seulement quand nécessaire
- Server Actions dans `src/lib/actions/` (pas de routes API)
- Named exports pour les composants
- Composants dans `src/components/[domaine]/`
- Un composant = un fichier
- Tailwind utility classes, pas de CSS custom sauf globals.css
- Tous les textes statiques dans les fichiers i18n (`src/messages/fr.json`, `en.json`)
- JAMAIS de texte en dur dans les composants

## Structure clé

```
src/
├── app/
│   ├── [locale]/          # Pages publiques (i18n)
│   └── admin/             # Dashboard admin (PAS dans [locale])
├── components/
│   ├── ui/                # Composants réutilisables
│   ├── layout/            # Header, Footer, MobileNav
│   ├── home/              # Sections page d'accueil
│   ├── catalogue/         # Composants catalogue SaaS
│   ├── creators/          # Simulateur revenus, formulaire, FAQ
│   ├── ideas/             # Mur d'idées, vote, formulaire
│   ├── dashboard/         # Charts, métriques publiques
│   ├── blog/              # Articles, rendu markdown
│   └── admin/             # Composants admin
├── lib/
│   ├── supabase/          # Clients browser + server + types
│   ├── actions/           # Server Actions (ideas, creators, admin)
│   ├── utils.ts
│   └── constants.ts
├── i18n/
└── messages/
```

## Design

- Dark mode par défaut, light avec toggle
- Palette : voir `.claude/skills/etudia-build/references/design-system.md`
- Animations : framer-motion, specs exactes dans le design system
- Mobile-first, responsive sm/md/lg/xl
- Rounded-xl partout, pas de shadows en dark

## Routing i18n

- /fr/... et /en/... via next-intl middleware
- /admin hors du [locale] (pas de traduction)
- Langue par défaut : français
- Redirect / → /fr

## Base de données

- Schema complet dans `.claude/skills/etudia-build/references/schema.sql`
- RLS activé sur toutes les tables
- Admin via JWT role claim (`auth.jwt() ->> 'role' = 'admin'`)
- Triggers updated_at automatiques

## Règles absolues

- NE JAMAIS supprimer du code fonctionnel sans raison
- NE JAMAIS ignorer les erreurs TypeScript
- NE JAMAIS hardcoder des textes (toujours i18n)
- NE JAMAIS mettre l'admin dans le routing [locale]
- TOUJOURS valider côté serveur (ne jamais faire confiance au client)
- TOUJOURS ajouter loading.tsx avec skeletons pour les pages dynamiques
- TOUJOURS gérer les états vides (composant empty-state)
- TOUJOURS tester le build après chaque changement
