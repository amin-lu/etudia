---
name: etudia-build
description: Build and improve the Etudia website — SaaS studio vitrine with catalog, creator recruitment, idea submission, public dashboard, blog, and admin.
---

# Etudia Build Skill

Ce skill guide la construction et l'amélioration du site Etudia.

## Fichiers de référence

Avant de coder, lis les fichiers pertinents à ta tâche :

- `references/design-system.md` — Palette exacte, typographie, animations framer-motion, composants UI
- `references/schema.sql` — Schéma Supabase complet (tables, indexes, triggers, RLS, seed data)
- `references/copywriting.md` — Texte exact de chaque page (FR + EN), labels, toasts, FAQ
- `references/apex-tasks.md` — Liste des tâches APEX séquentielles pour le build complet

## Règles

1. **Lis toujours la référence avant de coder.** Si tu modifies la page d'accueil → lis copywriting.md. Si tu touches au SQL → lis schema.sql. Si tu crées un composant UI → lis design-system.md.
2. **Vérifie après chaque changement** : `pnpm tsc --noEmit` puis `pnpm build`.
3. **Ne génère JAMAIS de texte** — tout le copy est dans copywriting.md.
4. **Ne devine JAMAIS une couleur** — tout est dans design-system.md.
5. **Un changement = un commit propre** avec message descriptif.

## Architecture des pages

| Route                          | Description                              |
|-------------------------------|------------------------------------------|
| `/[locale]/`                  | Accueil (hero, métriques, how-it-works, featured SaaS, idées teaser) |
| `/[locale]/catalogue`         | Grille SaaS avec filtres + recherche     |
| `/[locale]/catalogue/[slug]`  | Page détail SaaS                          |
| `/[locale]/devenir-partenaire`| Landing créateurs + simulateur + formulaire |
| `/[locale]/soumettre-idee`    | Formulaire soumission + mur d'idées + votes |
| `/[locale]/comment-ca-marche` | Schéma 3 acteurs + processus + timeline  |
| `/[locale]/dashboard`         | Métriques publiques + charts Recharts    |
| `/[locale]/blog`              | Liste articles                           |
| `/[locale]/blog/[slug]`       | Article rendu Markdown                   |
| `/[locale]/a-propos`          | Manifeste + valeurs + programme 30 jours |
| `/admin/`                     | Dashboard admin (HORS [locale])          |
| `/admin/saas`                 | CRUD SaaS                                |
| `/admin/candidatures`         | Gestion candidatures créateurs           |
| `/admin/idees`                | Gestion idées soumises                   |
| `/admin/blog`                 | CRUD articles blog                       |
| `/admin/metriques`            | Snapshots métriques                      |
