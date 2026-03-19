# Tâches APEX — Etudia Build

> **Principe : UNE session Claude Code = UNE tâche.**
> Ne pas mélanger plusieurs tâches dans une session.
> Chaque tâche suit la méthodologie APEX : Analyze → Plan → Execute → Validate.
> Copie le bloc de la tâche et colle-le comme prompt dans Claude Code.

---

## PHASE 1 — Fondations (corrections V1)

### Tâche 01 : Fix structure et config

```
Lis CLAUDE.md et .claude/skills/etudia-build/references/design-system.md.

Analyse le projet existant. Corrige ces problèmes :

1. Déplace /admin HORS de [locale] si ce n'est pas déjà fait (admin ne doit PAS être traduit)
2. Vérifie que .env.local.example existe avec : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SITE_URL
3. Vérifie que les fonts utilisent next/font/google : Inter (body), Instrument Sans (titres)
4. Vérifie que next-themes est configuré avec dark par défaut
5. Vérifie que le middleware i18n redirige / vers /fr et route correctement /fr et /en
6. Ajoute sonner (toast library) si pas installé : pnpm add sonner
7. Copyright footer dynamique : new Date().getFullYear()

Après chaque modification, lance pnpm tsc --noEmit puis pnpm build.
```

### Tâche 02 : Fix schéma Supabase

```
Lis .claude/skills/etudia-build/references/schema.sql

Compare le schéma actuel dans supabase/migrations/ avec le schéma de référence.
Crée une nouvelle migration qui ajoute ce qui manque :

- Fonction update_updated_at() + triggers sur saas_products et blog_posts
- Fonction increment_vote_count() + trigger sur idea_votes
- Tous les CHECK constraints (email regex, char_length, commission_rate BETWEEN 20 AND 60, etc.)
- Tous les INDEX manquants
- Le champ followers_count doit être INTEGER pas TEXT
- Les champs i18n manquants (name_en, description_short_en, niche_en, etc.)
- Les champs manquants : featured, display_order, price_monthly sur saas_products
- Le champ reading_time_minutes sur blog_posts
- Le champ admin_notes sur creator_applications et saas_ideas
- Le champ total_users sur metrics_snapshots
- RLS policies admin via auth.jwt() ->> 'role' = 'admin' (pas UUID hardcodé)

Crée aussi une migration seed avec les données de référence (seed data en bas du fichier schema.sql).
```

### Tâche 03 : Fix palette et composants UI

```
Lis .claude/skills/etudia-build/references/design-system.md

Applique la palette EXACTE sur tout le projet :
- Dark : bg zinc-950, cards zinc-900, border zinc-700, text zinc-50/zinc-400, accent indigo-500
- Light : bg white, cards zinc-100, border zinc-300, text zinc-950/zinc-500, accent indigo-600

Vérifie/crée chaque composant dans src/components/ui/ :
- Button (primary/secondary/ghost, size sm/md/lg, loading state avec spinner)
- Card (fond zinc-900 dark, zinc-100 light, border, rounded-xl, p-6)
- Badge (variant avec couleurs par niche)
- Input (label, error message rouge, fond zinc-900, border zinc-700, focus ring indigo)
- Textarea (label, error, maxLength avec compteur "142 / 2000")
- Skeleton (animate-pulse, prend la forme du contenu)
- EmptyState (icon LucideIcon, title, description, action? CTA optionnel)
- AnimatedCounter (framer-motion useMotionValue, de 0 à target en 2s)

Vérifie que CHAQUE composant fonctionne en dark ET light mode.
Teste avec pnpm build.
```

---

## PHASE 2 — Layout et navigation

### Tâche 04 : Header + Footer + Navigation mobile

```
Lis .claude/skills/etudia-build/references/design-system.md (section Navigation Mobile)
Lis .claude/skills/etudia-build/references/copywriting.md (section Footer)

Crée/améliore le layout :

HEADER (src/components/layout/header.tsx) :
- Logo "etudia" à gauche (Instrument Sans bold, dot indigo)
- Nav horizontale sur desktop (>= lg) : Catalogue, Créateurs, Idées, Dashboard, Blog, À propos
- Toggle thème (Sun/Moon icons) + Toggle langue (FR/EN)
- Bouton hamburger sur mobile (< lg)
- Header fixe, fond avec backdrop-blur

MOBILE NAV (src/components/layout/mobile-nav.tsx) :
- Drawer slide-in depuis la droite (framer-motion AnimatePresence)
- Overlay bg-black/50 qui ferme au clic
- Liens de nav verticaux
- Toggle thème + langue en bas du drawer
- Fermeture auto au clic sur un lien

FOOTER (src/components/layout/footer.tsx) :
- 4 colonnes : Navigation, Ressources, Légal, Réseaux sociaux
- Copyright dynamique
- Toggle langue
- Liens placeholder pour CGV, CGU, Politique de confidentialité

Vérifie responsive sur mobile. Teste pnpm build.
```

---

## PHASE 3 — Pages publiques (une tâche par page)

### Tâche 05 : Page d'accueil

```
Lis .claude/skills/etudia-build/references/copywriting.md (sections: Hero, Comment ça marche, Section idées, Métriques)
Lis .claude/skills/etudia-build/references/design-system.md (animations framer-motion)

Construis/améliore la page d'accueil [locale]/page.tsx avec ces sections dans l'ordre :

1. HERO : titre + sous-titre + 2 CTA (texte EXACT du copywriting.md) + background gradient subtil
2. MÉTRIQUES LIVE : bandeau 3 compteurs AnimatedCounter (SaaS actifs, Créateurs, Redistribué) — données Supabase
3. COMMENT ÇA MARCHE : 3 colonnes (Hammer/Megaphone/Users) avec texte exact + CTA vers /comment-ca-marche
4. SAAS EN VEDETTE : grille 3 cards des SaaS featured depuis Supabase (SaasCard component)
5. SOUMETTRE UNE IDÉE : teaser avec texte exact + CTA vers /soumettre-idee
6. TÉMOIGNAGES : section placeholder (3 cards vides avec design prêt, texte "Bientôt disponible")

Chaque section utilise fadeInUp de framer-motion. Les grilles utilisent staggerContainer.
Toutes les strings viennent des fichiers i18n, PAS hardcodées.
Ajoute un loading.tsx avec skeletons.
Teste pnpm build.
```

### Tâche 06 : Page Catalogue

```
Lis .claude/skills/etudia-build/references/copywriting.md
Lis .claude/skills/etudia-build/references/design-system.md

Construis [locale]/catalogue/page.tsx + [locale]/catalogue/[slug]/page.tsx :

LISTE (/catalogue) :
- Titre "Nos SaaS" / "Our SaaS products"
- Barre de filtres : par niche (tags cliquables), par statut (live/coming_soon)
- Barre de recherche
- Grille responsive de SaasCards (données Supabase)
- Chaque card : nom, niche badge, description_short, prix, commission_rate, active_users, statut badge
- CTA "Voir le détail"
- EmptyState si aucun SaaS
- Loading.tsx avec skeleton grille

DÉTAIL (/catalogue/[slug]) :
- Hero : nom + description_long + badges niche + statut
- Métriques : utilisateurs, MRR, date de lancement, commission
- Screenshot placeholder
- 2 CTA : "Promouvoir ce SaaS" → /devenir-partenaire | "Accéder au SaaS" → external_url
- Metadata SEO dynamique (generateMetadata)
- 404 si slug introuvable

Teste pnpm build.
```

### Tâche 07 : Page Devenir Partenaire + Simulateur

```
Lis .claude/skills/etudia-build/references/copywriting.md (section Devenir Partenaire ENTIÈRE + Simulateur)
Lis .claude/skills/etudia-build/references/design-system.md

Construis [locale]/devenir-partenaire/page.tsx :

1. HERO : titre + sous-titre (texte EXACT copywriting.md)
2. AVANTAGES : 4 blocs avec icônes exactes (Wallet, Code, Package, BarChart3) + texte exact
3. SIMULATEUR DE REVENUS (composant client "use client") :
   - 4 sliders avec les min/max/step/default EXACTS du copywriting.md
   - Affichage formaté des valeurs (séparateur milliers)
   - Output : gros chiffre animé AnimatedCounter en text-5xl font-bold text-indigo-500
   - Sous-texte : montant annuel
   - Formule visible en text-sm text-zinc-400
   - Card avec fond indigo-900/10 dark, indigo-100 light, bordure indigo-500/20
4. ÉTAPES CRÉATEUR : 4 steps numérotées (texte exact)
5. FAQ : Accordion avec les 4 Q/A exactes du copywriting.md
6. FORMULAIRE CANDIDATURE :
   - Champs : nom, email, plateforme (select: YouTube/TikTok/Instagram/X/LinkedIn/Twitch/Autre), URL profil, nombre abonnés, niche, message
   - Validation client (required, email regex, compteur message)
   - Server Action dans src/lib/actions/creators.ts
   - Validation serveur (re-check tous les champs, rate limit 5/24h par IP)
   - Toast sonner succès/erreur
   - Reset formulaire après succès

Teste pnpm build.
```

### Tâche 08 : Page Soumettre une idée + Votes

```
Lis .claude/skills/etudia-build/references/copywriting.md (toasts)
Lis .claude/skills/etudia-build/references/schema.sql (saas_ideas, idea_votes)

Construis [locale]/soumettre-idee/page.tsx :

1. FORMULAIRE DE SOUMISSION :
   - Champs : nom du SaaS, niche, problème (textarea min 20 chars), audience cible, a une audience? (toggle), détails audience (conditionnel), prix suggéré, email
   - Validation client + serveur (Server Action src/lib/actions/ideas.ts)
   - Rate limit 5 soumissions/24h par IP
   - Toast succès/erreur, reset après succès

2. MUR D'IDÉES (en dessous) :
   - Titre "Idées de la communauté" / "Community ideas"
   - Tri : "Plus votées" | "Plus récentes" (tabs ou select)
   - Grille de cards idées depuis Supabase
   - Chaque card : nom, niche badge, résumé problème (tronqué 2 lignes), votes_count, statut badge
   - BOUTON VOTE : icône ThumbsUp + compteur
     - Server Action voteForIdea() dans src/lib/actions/ideas.ts
     - voter_id = SHA-256(IP + User-Agent), généré côté serveur
     - Si déjà voté → toast "Déjà voté"
     - Sinon → incrémente (optimistic UI), toast "Vote enregistré"
   - EmptyState si 0 idées
   - Loading.tsx avec skeletons

Teste pnpm build.
```

### Tâche 09 : Page Comment ça marche

```
Lis .claude/skills/etudia-build/references/copywriting.md

Construis [locale]/comment-ca-marche/page.tsx :

1. SCHÉMA 3 ACTEURS : Illustration visuelle (SVG ou composant)
   - ETUDIA (centre) construit → CRÉATEUR (gauche) distribue → UTILISATEUR (droite) s'abonne
   - Flèches ou lignes connectant les 3 avec labels
   - Animé au scroll (fade-in séquentiel)

2. POURQUOI ÇA MARCHE : 3 blocs
   - Pour Etudia : pas de coût d'acquisition, distribution organique
   - Pour le créateur : monétisation récurrente sans investissement
   - Pour l'utilisateur : produit recommandé par quelqu'un de confiance

3. PROCESSUS DE CONSTRUCTION : Timeline visuelle
   - Idée → Validation → Construction (30 jours) → Lancement → Distribution
   - Design : timeline verticale avec dots et descriptions

4. TRANSPARENCE : lien vers /dashboard + philosophie build in public

Teste pnpm build.
```

### Tâche 10 : Dashboard public

```
Lis .claude/skills/etudia-build/references/schema.sql (metrics_snapshots)

Construis [locale]/dashboard/page.tsx :

1. TITRE : "Nos chiffres, en toute transparence" / "Our numbers, in full transparency"
2. 5 METRIC CARDS en haut : MRR total, SaaS actifs, Créateurs, Total redistribué, Utilisateurs total
   - AnimatedCounter pour chaque
   - Données depuis metrics_snapshots (dernier snapshot)
3. GRAPHIQUE MRR : Line chart Recharts (mois par mois depuis metrics_snapshots)
   - Axe X = mois, Axe Y = MRR
   - Couleur accent indigo-500
   - Responsive
4. RÉPARTITION PAR NICHE : Bar chart ou Pie chart depuis saas_products group by niche
5. Loading.tsx avec skeletons

Teste pnpm build.
```

### Tâche 11 : Blog

```
Lis .claude/skills/etudia-build/references/schema.sql (blog_posts, seed articles)

Construis [locale]/blog/page.tsx + [locale]/blog/[slug]/page.tsx :

LISTE (/blog) :
- Grille de ArticleCards
- Chaque card : cover image (ou placeholder gradient), titre, date, reading_time, excerpt, tags
- Tri par date (plus récent d'abord)
- EmptyState si 0 articles publiés
- Loading.tsx

DÉTAIL (/blog/[slug]) :
- Titre, date, reading_time, tags
- Rendu contenu Markdown via react-markdown + remark-gfm + rehype-highlight
- Bonne typographie (prose dark:prose-invert)
- Metadata SEO dynamique
- 404 si slug introuvable

Calcul automatique reading_time : Math.ceil(wordCount / 200) minutes.

Teste pnpm build.
```

### Tâche 12 : Page À propos

```
Lis .claude/skills/etudia-build/references/copywriting.md (section Manifeste + Valeurs)

Construis [locale]/a-propos/page.tsx :

1. HISTOIRE : "Un entrepreneur solo qui construit avec l'IA" — court paragraphe
2. MANIFESTE : titre "Notre conviction" + paragraphe EXACT du copywriting.md
3. VALEURS : 4 blocs (Transparence, Rapidité, Équité, Qualité) avec texte exact
4. PROGRAMME 30 JOURS : explication du concept SaaS en 30 jours
5. CTA : "Rejoins l'aventure" → /devenir-partenaire

Animations fadeInUp sur chaque section.
Teste pnpm build.
```

---

## PHASE 4 — Admin

### Tâche 13 : Admin layout + auth

```
Construis /admin/layout.tsx :

- Auth guard : vérifie Supabase Auth + JWT role = admin
- Si pas connecté → formulaire login simple (email + password)
- Si connecté mais pas admin → redirect /
- Sidebar fixe gauche : liens Vue d'ensemble, SaaS, Candidatures, Idées, Blog, Métriques
- Design sobre et fonctionnel (pas besoin d'être fancy)
- Mobile : sidebar collapse en hamburger

Construis /admin/page.tsx (vue d'ensemble) :
- 4 stat cards : candidatures pending, nouvelles idées (7j), SaaS actifs, MRR total
- 5 dernières candidatures (résumé)
- 5 idées les plus votées

Teste pnpm build.
```

### Tâche 14 : Admin CRUD complet

```
Construis les pages admin restantes :

COMPOSANT RÉUTILISABLE DataTable (src/components/admin/data-table.tsx) :
- Colonnes triables (clic header)
- Pagination (10/page)
- Recherche texte
- Actions par ligne (voir, modifier statut, supprimer)
- ConfirmDialog avant suppression

/admin/saas : CRUD saas_products (DataTable + formulaire modal create/edit)
/admin/candidatures : DataTable creator_applications + changer statut + admin_notes
/admin/idees : DataTable saas_ideas + changer statut + voir votes + admin_notes
/admin/blog : DataTable blog_posts + formulaire create/edit avec Markdown preview
/admin/metriques : Liste metrics_snapshots + formulaire ajout snapshot

Toutes les mutations via Server Actions dans src/lib/actions/admin.ts.
Toast succès/erreur sur chaque action.

Teste pnpm build.
```

---

## PHASE 5 — Polish

### Tâche 15 : SEO + 404 + métadonnées

```
Lis .claude/skills/etudia-build/references/copywriting.md (section 404)

1. Ajoute generateMetadata sur CHAQUE page avec :
   - title (FR/EN adapté)
   - description (FR/EN)
   - openGraph: images ['/og-image.png'], siteName 'Etudia'
   - twitter: card 'summary_large_image'

2. Crée src/app/sitemap.ts :
   - Pages statiques + slugs SaaS dynamiques + slugs blog dynamiques

3. Crée src/app/robots.ts :
   - Allow: /
   - Disallow: /admin

4. Crée [locale]/not-found.tsx + app/not-found.tsx avec texte exact du copywriting.md

5. Crée public/favicon.ico : simple "E" indigo sur transparent (ou placeholder)

Teste pnpm build.
```

### Tâche 16 : Responsive + Accessibilité + Final check

```
Passe en revue CHAQUE page :

RESPONSIVE :
- Mobile (< 640px) : tout empilé, texte lisible, CTAs full-width
- Tablette (640-1024px) : grilles 2 colonnes
- Desktop (> 1024px) : layout complet

ACCESSIBILITÉ :
- aria-label sur tous les boutons icône (toggle thème, toggle langue, hamburger)
- focus-visible sur tous les éléments interactifs
- Contraste suffisant (WCAG AA minimum)
- Navigation clavier fonctionnelle

VÉRIFICATION FINALE :
- Dark/Light toggle fonctionne sur TOUTES les pages
- FR/EN toggle fonctionne, TOUS les textes changent
- Navigation mobile fonctionne (drawer ouvre/ferme)
- Formulaire créateur : validation + toast + reset
- Formulaire idée : validation + toast + reset
- Vote : fonctionne + empêche double vote
- Simulateur : tous les sliders répondent, calcul correct
- Catalogue : filtres + page détail
- Blog : Markdown se rend correctement
- Dashboard : chiffres + charts
- Admin : login + CRUD
- 404 : page personnalisée
- Zéro erreur console
- pnpm build passe à 100%
```

---

## Comment utiliser ces tâches

1. Ouvre Claude Code dans le dossier du projet
2. Copie le bloc de la tâche (entre les ```)
3. Colle comme prompt
4. Laisse Claude Code suivre la méthodologie : Analyze → Plan → Execute → Validate
5. Vérifie que le build passe
6. Commit les changements
7. Passe à la tâche suivante DANS UNE NOUVELLE SESSION (`cc` pas `ccc`)

**Si tu as /apex installé, utilise :**
```
/apex -a [colle la tâche ici]
```

**Ordre recommandé :** Tâches 01 → 16 dans l'ordre. Ne saute pas de tâche.
