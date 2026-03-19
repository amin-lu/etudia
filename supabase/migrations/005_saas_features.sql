-- Add features columns to saas_products
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';
ALTER TABLE saas_products ADD COLUMN IF NOT EXISTS features_en TEXT[] DEFAULT '{}';

-- Seed features for existing SaaS
UPDATE saas_products SET features = ARRAY[
  'Cours structurés semaine par semaine',
  'QCM corrigés avec explications',
  'Fiches de révision téléchargeables',
  'Suivi de progression personnalisé',
  'Garantie diplômé ou remboursé'
], features_en = ARRAY[
  'Week-by-week structured courses',
  'Corrected quizzes with explanations',
  'Downloadable revision sheets',
  'Personalized progress tracking',
  'Pass or money-back guarantee'
] WHERE slug = 'etudiet';

UPDATE saas_products SET features = ARRAY[
  'Couvre les 6 séries du baccalauréat malien',
  'Moteur de quiz interactif',
  'Flashcards avec répétition espacée',
  'Mode sombre',
  'Fonctionne hors ligne'
], features_en = ARRAY[
  'Covers all 6 Malian baccalaureate series',
  'Interactive quiz engine',
  'Flashcards with spaced repetition',
  'Dark mode',
  'Works offline'
] WHERE slug = 'bacsuccess';
