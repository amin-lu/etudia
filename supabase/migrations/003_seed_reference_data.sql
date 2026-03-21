-- =============================================
-- Migration 003: Replace seed data with reference data
-- =============================================

-- Clear existing seed data
TRUNCATE saas_products, saas_ideas, idea_votes, blog_posts, metrics_snapshots CASCADE;

-- ===========================================
-- SaaS Products (reference spec)
-- ===========================================
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
-- ===========================================
-- SaaS Ideas (reference spec)
-- ===========================================
INSERT INTO saas_ideas (name, niche, problem, target_audience, has_audience, suggested_price, submitter_email, votes_count, status)
VALUES
  ('JuriQuiz', 'Droit', 'Les étudiants en droit n''ont aucune plateforme de QCM structurée par matière et par année.', 'Étudiants L1-M2 droit en France (~200k)', false, 14.90, 'demo@etudia.com', 47, 'evaluating'),
  ('BricoHelper', 'Bricolage', 'Les débutants en bricolage ne savent pas par où commencer. Les tutos YouTube sont longs et pas interactifs.', 'Propriétaires et locataires bricoleurs', true, 7.90, 'demo@etudia.com', 23, 'submitted'),
  ('GreenThumb', 'Jardinage', 'Savoir quoi planter, quand, et comment entretenir selon sa région et la saison. Aucune app ne fait ça bien en français.', 'Jardiniers amateurs FR/BE/CH', false, 6.90, 'demo@etudia.com', 31, 'submitted'),
  ('PrepaConcours', 'Éducation', 'La préparation aux concours de la fonction publique est chère et les plateformes existantes sont datées.', 'Candidats concours cat. A, B, C', true, 19.90, 'demo@etudia.com', 65, 'evaluating');

-- ===========================================
-- Metrics Snapshots (reference spec)
-- ===========================================
INSERT INTO metrics_snapshots (date, total_mrr, total_saas_count, total_creators, total_redistributed, total_users)
VALUES
  (CURRENT_DATE - INTERVAL '60 days', 0, 1, 0, 0, 0),
  (CURRENT_DATE - INTERVAL '30 days', 0, 2, 0, 0, 0),
  (CURRENT_DATE, 0, 2, 0, 0, 0);
