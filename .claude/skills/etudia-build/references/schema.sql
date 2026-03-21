# Schéma Supabase — Etudia

## Fonctions utilitaires

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE saas_ideas SET votes_count = votes_count + 1 WHERE id = NEW.idea_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Table : saas_products

```sql
CREATE TABLE saas_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  description_short TEXT NOT NULL,
  description_short_en TEXT,
  description_long TEXT,
  description_long_en TEXT,
  niche TEXT NOT NULL,
  niche_en TEXT,
  logo_url TEXT,
  screenshot_url TEXT,
  external_url TEXT,
  commission_rate INTEGER DEFAULT 40 CHECK (commission_rate BETWEEN 20 AND 60),
  price_monthly DECIMAL(10,2),
  status TEXT DEFAULT 'live' CHECK (status IN ('live', 'building', 'coming_soon')),
  active_users INTEGER DEFAULT 0 CHECK (active_users >= 0),
  mrr DECIMAL(10,2) DEFAULT 0 CHECK (mrr >= 0),
  launched_at TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_saas_products_status ON saas_products(status);
CREATE INDEX idx_saas_products_niche ON saas_products(niche);
CREATE INDEX idx_saas_products_slug ON saas_products(slug);
CREATE INDEX idx_saas_products_featured ON saas_products(featured) WHERE featured = true;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON saas_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE saas_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique" ON saas_products FOR SELECT USING (true);
CREATE POLICY "Admin écriture" ON saas_products FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

## Table : creator_applications

```sql
CREATE TABLE creator_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'tiktok', 'instagram', 'x', 'linkedin', 'twitch', 'other')),
  profile_url TEXT,
  followers_count INTEGER CHECK (followers_count >= 0),
  niche TEXT,
  message TEXT CHECK (char_length(message) <= 2000),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'contacted')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_creator_applications_status ON creator_applications(status);
CREATE INDEX idx_creator_applications_created ON creator_applications(created_at DESC);

ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insertion publique" ON creator_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin lecture" ON creator_applications FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin écriture" ON creator_applications FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');
```

## Table : saas_ideas

```sql
CREATE TABLE saas_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 3 AND 100),
  niche TEXT NOT NULL,
  problem TEXT NOT NULL CHECK (char_length(problem) BETWEEN 20 AND 2000),
  target_audience TEXT CHECK (char_length(target_audience) <= 1000),
  has_audience BOOLEAN DEFAULT false,
  audience_details TEXT CHECK (char_length(audience_details) <= 1000),
  suggested_price DECIMAL(10,2) CHECK (suggested_price >= 0),
  submitter_email TEXT NOT NULL CHECK (submitter_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  votes_count INTEGER DEFAULT 0 CHECK (votes_count >= 0),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'evaluating', 'accepted', 'rejected', 'built')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_saas_ideas_votes ON saas_ideas(votes_count DESC);
CREATE INDEX idx_saas_ideas_status ON saas_ideas(status);
CREATE INDEX idx_saas_ideas_created ON saas_ideas(created_at DESC);

ALTER TABLE saas_ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique" ON saas_ideas FOR SELECT USING (true);
CREATE POLICY "Insertion publique" ON saas_ideas FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin écriture" ON saas_ideas FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

## Table : idea_votes

```sql
CREATE TABLE idea_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID NOT NULL REFERENCES saas_ideas(id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL, -- hash SHA-256 IP + User-Agent, généré côté Server Action
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(idea_id, voter_id)
);

CREATE INDEX idx_idea_votes_idea ON idea_votes(idea_id);

CREATE TRIGGER increment_votes AFTER INSERT ON idea_votes
  FOR EACH ROW EXECUTE FUNCTION increment_vote_count();

ALTER TABLE idea_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insertion publique" ON idea_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture publique" ON idea_votes FOR SELECT USING (true);
```

## Table : blog_posts

```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  excerpt TEXT NOT NULL CHECK (char_length(excerpt) <= 300),
  excerpt_en TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  reading_time_minutes INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published, published_at DESC);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture articles publiés" ON blog_posts FOR SELECT
  USING (published = true OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin écriture" ON blog_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

## Table : metrics_snapshots

```sql
CREATE TABLE metrics_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_mrr DECIMAL(10,2) DEFAULT 0,
  total_saas_count INTEGER DEFAULT 0,
  total_creators INTEGER DEFAULT 0,
  total_redistributed DECIMAL(10,2) DEFAULT 0,
  total_users INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_metrics_date ON metrics_snapshots(date DESC);

ALTER TABLE metrics_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique" ON metrics_snapshots FOR SELECT USING (true);
CREATE POLICY "Admin écriture" ON metrics_snapshots FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

## Seed Data

```sql
INSERT INTO saas_products (slug, name, name_en, description_short, description_short_en, description_long, description_long_en, niche, niche_en, commission_rate, price_monthly, status, active_users, mrr, launched_at, featured, display_order)
VALUES
  ('etudiet', 'ETUDIET', 'ETUDIET',
   'Plateforme de révision structurée pour les étudiants en BTS Diététique et Nutrition.',
   'Structured revision platform for BTS Dietetics and Nutrition students.',
   'ETUDIET accompagne les étudiants du BTS Diététique et Nutrition (référentiel 2027) avec des cours structurés, des QCM corrigés, des fiches de révision et un suivi de progression. Garantie diplômé ou remboursé.',
   'ETUDIET helps BTS Dietetics and Nutrition students (2027 curriculum) with structured courses, corrected quizzes, revision sheets and progress tracking. Pass or money-back guarantee.',
   'Éducation', 'Education', 40, 12.90, 'live', 0, 0, NOW() - INTERVAL '30 days', true, 1),

  ('bacsuccess', 'BacSuccess', 'BacSuccess',
   'Préparation au baccalauréat malien — toutes séries, quiz et flashcards.',
   'Malian baccalaureate preparation — all series, quizzes and flashcards.',
   'BacSuccess couvre les 6 séries du baccalauréat malien (TSECO, TSEXP, TSS, TSE, TLL, TAL) avec un moteur de quiz, des flashcards, la répétition espacée et un mode sombre.',
   'BacSuccess covers all 6 series of the Malian baccalaureate (TSECO, TSEXP, TSS, TSE, TLL, TAL) with a quiz engine, flashcards, spaced repetition and dark mode.',
   'Éducation', 'Education', 40, 0, 'live', 0, 0, NOW() - INTERVAL '60 days', true, 2);

INSERT INTO saas_ideas (name, niche, problem, target_audience, has_audience, suggested_price, submitter_email, votes_count, status)
VALUES
  ('JuriQuiz', 'Droit', 'Les étudiants en droit n''ont aucune plateforme de QCM structurée par matière et par année.', 'Étudiants L1-M2 droit en France (~200k)', false, 14.90, 'demo@etudia.com', 47, 'evaluating'),
  ('BricoHelper', 'Bricolage', 'Les débutants en bricolage ne savent pas par où commencer. Les tutos YouTube sont longs et pas interactifs.', 'Propriétaires et locataires bricoleurs', true, 7.90, 'demo@etudia.com', 23, 'submitted'),
  ('GreenThumb', 'Jardinage', 'Savoir quoi planter, quand, et comment entretenir selon sa région et la saison. Aucune app ne fait ça bien en français.', 'Jardiniers amateurs FR/BE/CH', false, 6.90, 'demo@etudia.com', 31, 'submitted'),
  ('PrepaConcours', 'Éducation', 'La préparation aux concours de la fonction publique est chère et les plateformes existantes sont datées.', 'Candidats concours cat. A, B, C', true, 19.90, 'demo@etudia.com', 65, 'evaluating');

INSERT INTO metrics_snapshots (date, total_mrr, total_saas_count, total_creators, total_redistributed, total_users)
VALUES
  (CURRENT_DATE - INTERVAL '60 days', 0, 1, 0, 0, 0),
  (CURRENT_DATE - INTERVAL '30 days', 0, 2, 0, 0, 0),
  (CURRENT_DATE, 0, 2, 0, 0, 0);
```
