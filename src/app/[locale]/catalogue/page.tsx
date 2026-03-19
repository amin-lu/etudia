import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SaasProduct } from '@/lib/supabase/types'
import { CatalogueContent } from '@/components/catalogue/catalogue-content'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Catalogue SaaS — Etudia' : 'SaaS Catalog — Etudia',
    description: locale === 'fr' ? 'Découvrez tous nos produits SaaS et trouvez celui qui correspond à vos besoins.' : 'Discover all our SaaS products and find the one that matches your needs.',
    openGraph: { images: ['/og-image.png'] },
  }
}

const mockProducts: SaasProduct[] = [
  {
    id: '1',
    slug: 'etudiet',
    name: 'ETUDIET',
    name_en: 'ETUDIET',
    description_short: 'Plateforme de révision structurée pour les étudiants en BTS Diététique et Nutrition.',
    description_short_en: 'Structured revision platform for BTS Dietetics and Nutrition students.',
    description_long: 'ETUDIET est la plateforme tout-en-un pour les étudiants en BTS Diététique. Accédez à des ressources pédagogiques complètes, des exercices pratiques et des outils d\'apprentissage interactifs conçus spécifiquement pour votre cursus.',
    description_long_en: 'ETUDIET is the all-in-one platform for Dietetics students. Access comprehensive learning resources, practical exercises, and interactive learning tools designed specifically for your curriculum.',
    niche: 'Éducation',
    niche_en: 'Education',
    logo_url: null,
    screenshot_url: null,
    external_url: null,
    commission_rate: 40,
    status: 'live',
    active_users: 0,
    mrr: 0,
    price: 12.90,
    price_monthly: 12.90,
    featured: true,
    display_order: 1,
    launched_at: '2025-01-15',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    slug: 'bacsuccess',
    name: 'BacSuccess',
    name_en: 'BacSuccess',
    description_short: 'Préparation au baccalauréat malien — toutes séries, quiz et flashcards.',
    description_short_en: 'Malian baccalaureate preparation — all series, quizzes and flashcards.',
    description_long: 'BacSuccess aide les lycéens maliens à préparer leur Baccalauréat avec une approche complète. Bénéficiez de cours en ligne, de sujets d\'examen corrigés et d\'une communauté d\'apprentissage supportive.',
    description_long_en: 'BacSuccess helps Malian high school students prepare for their Baccalauréat with a comprehensive approach. Enjoy online courses, corrected exam subjects, and a supportive learning community.',
    niche: 'Éducation',
    niche_en: 'Education',
    logo_url: null,
    screenshot_url: null,
    external_url: null,
    commission_rate: 40,
    status: 'live',
    active_users: 0,
    mrr: 0,
    price: 0,
    price_monthly: 0,
    featured: true,
    display_order: 2,
    launched_at: '2025-03-01',
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    slug: 'fittrack-pro',
    name: 'FitTrack Pro',
    name_en: 'FitTrack Pro',
    description_short: 'Suivi nutritionnel et programmes d\'entraînement personnalisés.',
    description_short_en: 'Nutritional tracking and personalized training programs.',
    description_long: 'FitTrack Pro utilise l\'intelligence artificielle pour créer des programmes d\'entraînement personnalisés. Obtenez des conseils en nutrition, des routines d\'exercices adaptées à vos objectifs et un suivi en temps réel de votre progression.',
    description_long_en: 'FitTrack Pro uses artificial intelligence to create personalized training programs. Get nutrition advice, exercise routines tailored to your goals, and real-time progress tracking.',
    niche: 'Fitness',
    niche_en: 'Fitness',
    logo_url: null,
    screenshot_url: null,
    external_url: null,
    commission_rate: 45,
    status: 'coming_soon',
    active_users: 0,
    mrr: 0,
    price: 9.90,
    price_monthly: 9.90,
    featured: false,
    display_order: 3,
    launched_at: null,
    created_at: '',
    updated_at: '',
  },
]

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

async function fetchProducts(): Promise<SaasProduct[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('saas_products')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && data.length > 0) {
      return data as SaasProduct[]
    }
  } catch {
    // Fall through to mock
  }
  return mockProducts
}

export default async function CataloguePage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations('catalogue')
  const products = await fetchProducts()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <CatalogueContent products={products} locale={locale} />
    </div>
  )
}
