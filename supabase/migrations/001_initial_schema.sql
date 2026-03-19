-- Etudia Database Schema
-- All tables + RLS policies

-- ===========================================
-- SaaS Products
-- ===========================================
CREATE TABLE saas_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description_short TEXT,
  description_short_en TEXT,
  description_long TEXT,
  description_long_en TEXT,
  niche TEXT NOT NULL,
  logo_url TEXT,
  screenshot_url TEXT,
  external_url TEXT,
  commission_rate INTEGER DEFAULT 40,
  status TEXT DEFAULT 'live' CHECK (status IN ('live', 'building', 'coming_soon')),
  active_users INTEGER DEFAULT 0,
  mrr DECIMAL(10,2) DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  launched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE saas_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON saas_products FOR SELECT USING (true);

-- ===========================================
-- Creator Applications
-- ===========================================
CREATE TABLE creator_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  platform TEXT NOT NULL,
  profile_url TEXT,
  followers_count TEXT,
  niche TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insert only" ON creator_applications FOR INSERT WITH CHECK (true);

-- ===========================================
-- SaaS Ideas
-- ===========================================
CREATE TABLE saas_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  niche TEXT NOT NULL,
  problem TEXT NOT NULL,
  target_audience TEXT,
  has_audience BOOLEAN DEFAULT false,
  audience_details TEXT,
  suggested_price DECIMAL(10,2),
  submitter_email TEXT NOT NULL,
  votes_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'evaluating', 'accepted', 'built')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE saas_ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON saas_ideas FOR SELECT USING (true);
CREATE POLICY "Public insert" ON saas_ideas FOR INSERT WITH CHECK (true);

-- ===========================================
-- Idea Votes
-- ===========================================
CREATE TABLE idea_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID REFERENCES saas_ideas(id) ON DELETE CASCADE,
  voter_fingerprint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(idea_id, voter_fingerprint)
);

ALTER TABLE idea_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON idea_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read" ON idea_votes FOR SELECT USING (true);

-- ===========================================
-- Blog Posts
-- ===========================================
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published" ON blog_posts FOR SELECT USING (published = true);

-- ===========================================
-- Metrics Snapshots
-- ===========================================
CREATE TABLE metrics_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_mrr DECIMAL(10,2) DEFAULT 0,
  total_saas_count INTEGER DEFAULT 0,
  total_creators INTEGER DEFAULT 0,
  total_redistributed DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE metrics_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON metrics_snapshots FOR SELECT USING (true);

-- ===========================================
-- Seed Data
-- ===========================================

-- SaaS Products
INSERT INTO saas_products (slug, name, description_short, description_short_en, description_long, description_long_en, niche, commission_rate, status, active_users, mrr, price, launched_at) VALUES
(
  'etudiet',
  'ETUDIET',
  'La plateforme de révision pour le BTS Diététique. Fiches, quiz, et examens blancs.',
  'The study platform for Dietetics students. Flashcards, quizzes, and mock exams.',
  'ETUDIET est la plateforme tout-en-un pour les étudiants en BTS Diététique. Elle propose des fiches de révision structurées par matière, des quiz interactifs pour tester ses connaissances, des examens blancs chronométrés, et un suivi de progression personnalisé. Construite avec des professionnels de la diététique pour garantir la qualité du contenu.',
  'ETUDIET is the all-in-one platform for Dietetics students. It offers structured revision sheets by subject, interactive quizzes, timed mock exams, and personalized progress tracking. Built with dietetics professionals to ensure content quality.',
  'Éducation',
  40,
  'live',
  127,
  1638.30,
  12.90,
  '2025-01-15T00:00:00Z'
),
(
  'bacsuccess',
  'BacSuccess',
  'Préparation au Baccalauréat malien. Cours, exercices corrigés et annales.',
  'Mali Baccalauréat preparation. Courses, corrected exercises and past papers.',
  'BacSuccess aide les lycéens maliens à préparer leur Baccalauréat avec des cours structurés, des exercices corrigés pas à pas, des annales des années précédentes, et des sessions de révision guidées. Disponible en version gratuite (freemium) avec un abonnement premium pour accéder à tout le contenu.',
  'BacSuccess helps Malian high school students prepare for their Baccalauréat with structured courses, step-by-step corrected exercises, past years papers, and guided revision sessions. Available in a free version (freemium) with a premium subscription for full content access.',
  'Éducation',
  40,
  'live',
  342,
  0,
  0,
  '2025-03-01T00:00:00Z'
),
(
  'fitcoach-ai',
  'FitCoach AI',
  'Coach fitness intelligent qui crée des programmes personnalisés selon vos objectifs.',
  'Smart fitness coach that creates personalized programs based on your goals.',
  'FitCoach AI utilise l''intelligence artificielle pour créer des programmes d''entraînement et de nutrition entièrement personnalisés. Que vous souhaitiez perdre du poids, gagner en muscle ou améliorer votre endurance, FitCoach AI adapte votre plan chaque semaine en fonction de vos progrès et de vos retours.',
  'FitCoach AI uses artificial intelligence to create fully personalized training and nutrition programs. Whether you want to lose weight, build muscle, or improve endurance, FitCoach AI adapts your plan weekly based on your progress and feedback.',
  'Fitness',
  45,
  'coming_soon',
  0,
  0,
  14.90,
  NULL
);

-- SaaS Ideas
INSERT INTO saas_ideas (name, niche, problem, target_audience, has_audience, audience_details, suggested_price, submitter_email, votes_count, status) VALUES
(
  'JardinPro',
  'Jardinage',
  'Les jardiniers amateurs ne savent pas quoi planter selon leur région, la saison et leur type de sol. Ils perdent des plants et de l''argent chaque année.',
  'Jardiniers amateurs, propriétaires de maisons avec jardin, urbains avec balcons',
  true,
  'Chaîne YouTube jardinage avec 15K abonnés',
  9.90,
  'jardinier@example.com',
  24,
  'evaluating'
),
(
  'DroitFacile',
  'Droit',
  'Les étudiants en droit ont du mal à comprendre la jurisprudence et les codes. Les manuels sont trop denses et les cours trop rapides.',
  'Étudiants en Licence et Master de Droit en France',
  false,
  NULL,
  14.90,
  'etudiant.droit@example.com',
  18,
  'submitted'
),
(
  'BricoHelper',
  'Bricolage',
  'Les bricoleurs débutants ne savent pas quels outils acheter ni comment réaliser des projets simples. Les tutoriels YouTube sont éparpillés et de qualité variable.',
  'Bricoleurs débutants, nouveaux propriétaires, locataires qui veulent aménager',
  true,
  'Compte TikTok bricolage avec 45K followers',
  7.90,
  'bricoleur@example.com',
  31,
  'submitted'
),
(
  'RecetteMaison',
  'Cuisine',
  'Difficile de planifier ses repas de la semaine en tenant compte du budget, des allergies et des goûts de chaque membre de la famille.',
  'Familles, parents débordés, personnes avec restrictions alimentaires',
  false,
  NULL,
  6.90,
  'cuisine@example.com',
  12,
  'submitted'
);

-- Blog Posts
INSERT INTO blog_posts (slug, title, title_en, excerpt, excerpt_en, content, content_en, tags, published, published_at) VALUES
(
  'pourquoi-on-construit-etudia',
  'Pourquoi on construit Etudia',
  'Why we are building Etudia',
  'L''histoire derrière Etudia : pourquoi on croit que le futur du SaaS passe par les créateurs de contenu.',
  'The story behind Etudia: why we believe the future of SaaS goes through content creators.',
  '## Le constat

Le marketing digital coûte de plus en plus cher. Les coûts d''acquisition explosent. Les publicités Facebook et Google deviennent un gouffre financier pour les startups SaaS.

Pendant ce temps, les créateurs de contenu ont quelque chose d''infiniment plus précieux que n''importe quelle publicité : **la confiance de leur audience**.

## L''idée

Et si on construisait des SaaS de qualité et qu''on laissait les créateurs les distribuer à leur audience ? Pas de marketing payant. Pas de cold emailing. Juste des produits utiles, recommandés par des personnes de confiance.

## Le modèle

Le deal est simple :
- **Etudia construit** le SaaS de A à Z
- **Le créateur le promeut** auprès de son audience
- **L''utilisateur s''abonne** et accède à un produit de qualité
- **Tout le monde gagne** : le créateur touche 30 à 50% de commission récurrente

## Pourquoi ça marche

1. **Zéro coût d''acquisition** — La distribution est organique
2. **Confiance pré-établie** — L''audience fait confiance au créateur
3. **Revenus récurrents** — Le créateur est rémunéré tant que ses abonnés restent
4. **Alignement d''intérêts** — Tout le monde veut que le produit soit excellent

## La suite

On construit. On documente. On partage tout publiquement. Bienvenue chez Etudia.',
  '## The observation

Digital marketing is getting more expensive every day. Acquisition costs are skyrocketing. Facebook and Google ads are becoming a financial black hole for SaaS startups.

Meanwhile, content creators have something infinitely more valuable than any ad: **their audience''s trust**.

## The idea

What if we built quality SaaS products and let creators distribute them to their audience? No paid marketing. No cold emailing. Just useful products, recommended by trusted people.

## The model

The deal is simple:
- **Etudia builds** the SaaS from A to Z
- **The creator promotes it** to their audience
- **The user subscribes** and gets a quality product
- **Everyone wins**: the creator earns 30 to 50% recurring commission

## Why it works

1. **Zero acquisition cost** — Distribution is organic
2. **Pre-established trust** — The audience trusts the creator
3. **Recurring revenue** — The creator is paid as long as subscribers stay
4. **Aligned interests** — Everyone wants the product to be excellent

## What''s next

We build. We document. We share everything publicly. Welcome to Etudia.',
  ARRAY['build-in-public', 'annonces'],
  true,
  '2025-01-10T00:00:00Z'
),
(
  'comment-on-construit-un-saas-en-30-jours',
  'Comment on construit un SaaS en 30 jours',
  'How we build a SaaS in 30 days',
  'Notre processus pour passer d''une idée à un produit live en 30 jours. Méthodologie, outils et retour d''expérience.',
  'Our process to go from idea to live product in 30 days. Methodology, tools and feedback.',
  '## Le défi des 30 jours

Chez Etudia, on s''est fixé une règle : chaque SaaS doit être construit et lancé en **30 jours maximum**. Pas 3 mois. Pas 6 mois. 30 jours.

## Semaine 1 : Validation

- Analyse du marché et de la niche
- Interviews avec 5-10 utilisateurs potentiels
- Définition du MVP (Minimum Viable Product)
- Choix de la stack technique

## Semaine 2 : Construction du cœur

- Architecture de la base de données
- Fonctionnalités principales
- Authentification et paiement
- Tests automatisés

## Semaine 3 : UI/UX et polish

- Design de l''interface utilisateur
- Responsive design
- Optimisation des performances
- Beta testing avec un petit groupe

## Semaine 4 : Lancement

- Corrections des retours beta
- SEO et métadonnées
- Documentation créateur (assets marketing)
- Mise en ligne et premiers créateurs partenaires

## Les outils

On utilise une stack moderne et efficace :
- **Next.js** pour le frontend et le backend
- **Supabase** pour la base de données et l''authentification
- **Vercel** pour le déploiement
- **L''IA** comme assistant de développement

## Le résultat

ETUDIET, notre premier SaaS, a été construit en exactement 27 jours. Il est live, il a des utilisateurs, et il génère du revenu. La preuve que c''est possible.',
  '## The 30-day challenge

At Etudia, we set ourselves a rule: each SaaS must be built and launched in **30 days maximum**. Not 3 months. Not 6 months. 30 days.

## Week 1: Validation

- Market and niche analysis
- Interviews with 5-10 potential users
- MVP definition (Minimum Viable Product)
- Tech stack selection

## Week 2: Core building

- Database architecture
- Main features
- Authentication and payment
- Automated testing

## Week 3: UI/UX and polish

- User interface design
- Responsive design
- Performance optimization
- Beta testing with a small group

## Week 4: Launch

- Beta feedback fixes
- SEO and metadata
- Creator documentation (marketing assets)
- Go live and first creator partners

## The tools

We use a modern and efficient stack:
- **Next.js** for frontend and backend
- **Supabase** for database and authentication
- **Vercel** for deployment
- **AI** as development assistant

## The result

ETUDIET, our first SaaS, was built in exactly 27 days. It''s live, it has users, and it generates revenue. Proof that it''s possible.',
  ARRAY['build-in-public', 'tutoriels'],
  true,
  '2025-02-05T00:00:00Z'
);

-- Metrics Snapshot
INSERT INTO metrics_snapshots (date, total_mrr, total_saas_count, total_creators, total_redistributed) VALUES
('2025-01-31', 856.20, 1, 3, 342.48),
('2025-02-28', 1245.60, 2, 5, 840.30),
('2025-03-31', 1638.30, 2, 8, 1520.75);

-- Trigger to update votes_count on saas_ideas
CREATE OR REPLACE FUNCTION update_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE saas_ideas SET votes_count = (
    SELECT COUNT(*) FROM idea_votes WHERE idea_id = NEW.idea_id
  ) WHERE id = NEW.idea_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_votes_count
AFTER INSERT ON idea_votes
FOR EACH ROW EXECUTE FUNCTION update_votes_count();
