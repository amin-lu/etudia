-- =============================================
-- Migration 002: Align schema with reference spec
-- =============================================

-- ===========================================
-- 1. Utility functions
-- ===========================================

-- Replace the old vote count function with the reference version
DROP TRIGGER IF EXISTS trigger_update_votes_count ON idea_votes;
DROP FUNCTION IF EXISTS update_votes_count();

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

-- ===========================================
-- 2. Fix saas_products
-- ===========================================

-- Add missing columns
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS niche_en TEXT;
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS price_monthly DECIMAL(10,2);
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add CHECK constraints (drop column default constraints first if needed)
ALTER TABLE saas_products DROP CONSTRAINT IF EXISTS saas_products_commission_rate_check;
ALTER TABLE saas_products ADD CONSTRAINT saas_products_commission_rate_check CHECK (commission_rate BETWEEN 20 AND 60);

ALTER TABLE saas_products DROP CONSTRAINT IF EXISTS saas_products_active_users_check;
ALTER TABLE saas_products ADD CONSTRAINT saas_products_active_users_check CHECK (active_users >= 0);

ALTER TABLE saas_products DROP CONSTRAINT IF EXISTS saas_products_mrr_check;
ALTER TABLE saas_products ADD CONSTRAINT saas_products_mrr_check CHECK (mrr >= 0);

-- Make description_short NOT NULL (set default for existing nulls first)
UPDATE saas_products SET description_short = name WHERE description_short IS NULL;
ALTER TABLE saas_products ALTER COLUMN description_short SET NOT NULL;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_saas_products_status ON saas_products(status);
CREATE INDEX IF NOT EXISTS idx_saas_products_niche ON saas_products(niche);
CREATE INDEX IF NOT EXISTS idx_saas_products_slug ON saas_products(slug);
CREATE INDEX IF NOT EXISTS idx_saas_products_featured ON saas_products(featured) WHERE featured = true;

-- Add updated_at trigger
DROP TRIGGER IF EXISTS set_updated_at ON saas_products;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON saas_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Fix RLS: add admin write policy
DROP POLICY IF EXISTS "Admin écriture" ON saas_products;
CREATE POLICY "Admin écriture" ON saas_products FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ===========================================
-- 3. Fix creator_applications
-- ===========================================

-- Change followers_count from TEXT to INTEGER
ALTER TABLE creator_applications ALTER COLUMN followers_count TYPE INTEGER USING (
  CASE WHEN followers_count ~ '^\d+$' THEN followers_count::INTEGER ELSE NULL END
);

-- Add CHECK constraints
ALTER TABLE creator_applications DROP CONSTRAINT IF EXISTS creator_applications_name_check;
ALTER TABLE creator_applications ADD CONSTRAINT creator_applications_name_check CHECK (char_length(name) BETWEEN 2 AND 100);

ALTER TABLE creator_applications DROP CONSTRAINT IF EXISTS creator_applications_email_check;
ALTER TABLE creator_applications ADD CONSTRAINT creator_applications_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE creator_applications DROP CONSTRAINT IF EXISTS creator_applications_platform_check;
DROP CONSTRAINT IF EXISTS creator_applications_platform_check ON creator_applications;
-- Update existing platform values to lowercase if needed
UPDATE creator_applications SET platform = LOWER(platform) WHERE platform != LOWER(platform);
ALTER TABLE creator_applications ADD CONSTRAINT creator_applications_platform_check CHECK (platform IN ('youtube', 'tiktok', 'instagram', 'x', 'linkedin', 'twitch', 'other'));

ALTER TABLE creator_applications DROP CONSTRAINT IF EXISTS creator_applications_followers_count_check;
ALTER TABLE creator_applications ADD CONSTRAINT creator_applications_followers_count_check CHECK (followers_count >= 0);

ALTER TABLE creator_applications DROP CONSTRAINT IF EXISTS creator_applications_message_check;
ALTER TABLE creator_applications ADD CONSTRAINT creator_applications_message_check CHECK (char_length(message) <= 2000);

-- Add 'contacted' status option
ALTER TABLE creator_applications DROP CONSTRAINT IF EXISTS creator_applications_status_check;
ALTER TABLE creator_applications ADD CONSTRAINT creator_applications_status_check CHECK (status IN ('pending', 'accepted', 'rejected', 'contacted'));

-- Add missing columns
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_creator_applications_status ON creator_applications(status);
CREATE INDEX IF NOT EXISTS idx_creator_applications_created ON creator_applications(created_at DESC);

-- Fix RLS: admin read + update
DROP POLICY IF EXISTS "Admin lecture" ON creator_applications;
CREATE POLICY "Admin lecture" ON creator_applications FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');
DROP POLICY IF EXISTS "Admin écriture" ON creator_applications;
CREATE POLICY "Admin écriture" ON creator_applications FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- ===========================================
-- 4. Fix saas_ideas
-- ===========================================

-- Add CHECK constraints
ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_name_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_name_check CHECK (char_length(name) BETWEEN 3 AND 100);

ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_problem_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_problem_check CHECK (char_length(problem) BETWEEN 20 AND 2000);

ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_target_audience_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_target_audience_check CHECK (char_length(target_audience) <= 1000);

ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_audience_details_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_audience_details_check CHECK (char_length(audience_details) <= 1000);

ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_suggested_price_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_suggested_price_check CHECK (suggested_price >= 0);

ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_submitter_email_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_submitter_email_check CHECK (submitter_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_votes_count_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_votes_count_check CHECK (votes_count >= 0);

-- Add 'rejected' status option
ALTER TABLE saas_ideas DROP CONSTRAINT IF EXISTS saas_ideas_status_check;
ALTER TABLE saas_ideas ADD CONSTRAINT saas_ideas_status_check CHECK (status IN ('submitted', 'evaluating', 'accepted', 'rejected', 'built'));

-- Add missing columns
ALTER TABLE saas_ideas ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_saas_ideas_votes ON saas_ideas(votes_count DESC);
CREATE INDEX IF NOT EXISTS idx_saas_ideas_status ON saas_ideas(status);
CREATE INDEX IF NOT EXISTS idx_saas_ideas_created ON saas_ideas(created_at DESC);

-- Fix RLS: admin write
DROP POLICY IF EXISTS "Admin écriture" ON saas_ideas;
CREATE POLICY "Admin écriture" ON saas_ideas FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ===========================================
-- 5. Fix idea_votes
-- ===========================================

-- Rename voter_fingerprint to voter_id (reference schema uses voter_id)
ALTER TABLE idea_votes RENAME COLUMN voter_fingerprint TO voter_id;

-- Add NOT NULL constraint on idea_id
ALTER TABLE idea_votes ALTER COLUMN idea_id SET NOT NULL;

-- Add index
CREATE INDEX IF NOT EXISTS idx_idea_votes_idea ON idea_votes(idea_id);

-- Add increment trigger
CREATE TRIGGER increment_votes AFTER INSERT ON idea_votes
  FOR EACH ROW EXECUTE FUNCTION increment_vote_count();

-- ===========================================
-- 6. Fix blog_posts
-- ===========================================

-- Add missing columns
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS reading_time_minutes INTEGER DEFAULT 5;

-- Add CHECK constraint on excerpt
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_excerpt_check;
-- Make excerpt NOT NULL
UPDATE blog_posts SET excerpt = LEFT(content, 200) WHERE excerpt IS NULL;
ALTER TABLE blog_posts ALTER COLUMN excerpt SET NOT NULL;
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_excerpt_check CHECK (char_length(excerpt) <= 300);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS set_updated_at ON blog_posts;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Fix RLS: admin can read unpublished + write
DROP POLICY IF EXISTS "Public read published" ON blog_posts;
CREATE POLICY "Lecture articles publiés" ON blog_posts FOR SELECT
  USING (published = true OR auth.jwt() ->> 'role' = 'admin');
DROP POLICY IF EXISTS "Admin écriture" ON blog_posts;
CREATE POLICY "Admin écriture" ON blog_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ===========================================
-- 7. Fix metrics_snapshots
-- ===========================================

-- Add missing columns
ALTER TABLE metrics_snapshots ADD COLUMN IF NOT EXISTS total_users INTEGER DEFAULT 0;
ALTER TABLE metrics_snapshots ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add index
CREATE INDEX IF NOT EXISTS idx_metrics_date ON metrics_snapshots(date DESC);

-- Fix RLS: admin write
DROP POLICY IF EXISTS "Admin écriture" ON metrics_snapshots;
CREATE POLICY "Admin écriture" ON metrics_snapshots FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
