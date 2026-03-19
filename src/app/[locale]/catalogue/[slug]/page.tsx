import { getTranslations, getLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { SaasProduct } from '@/lib/supabase/types'
import { formatCurrency, getStatusLabel, getStatusColor, cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/catalogue/product-detail-client'

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
    external_url: 'https://etudiete.vercel.app',
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
    features: [
      'Cours structurés semaine par semaine',
      'QCM corrigés avec explications',
      'Fiches de révision téléchargeables',
      'Suivi de progression personnalisé',
      'Garantie diplômé ou remboursé'
    ],
    features_en: [
      'Week-by-week structured courses',
      'Corrected quizzes with explanations',
      'Downloadable revision sheets',
      'Personalized progress tracking',
      'Pass or money-back guarantee'
    ],
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
    external_url: 'https://bacsuccess.vercel.app',
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
    features: [
      'Couvre les 6 séries du baccalauréat malien',
      'Moteur de quiz interactif',
      'Flashcards avec répétition espacée',
      'Mode sombre',
      'Fonctionne hors ligne'
    ],
    features_en: [
      'Covers all 6 Malian baccalaureate series',
      'Interactive quiz engine',
      'Flashcards with spaced repetition',
      'Dark mode',
      'Works offline'
    ],
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
    slug: string
  }>
}

async function fetchProduct(slug: string): Promise<SaasProduct | null> {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('saas_products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (data) {
      return data as SaasProduct
    }
  } catch {
    // Fall through to mock
  }
  return mockProducts.find((p) => p.slug === slug) || null
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const product = await fetchProduct(slug)

  if (!product) {
    return {
      title: 'Not Found',
    }
  }

  const name = locale === 'fr' ? product.name : product.name_en || product.name
  const description = locale === 'fr' ? product.description_short : product.description_short_en || product.description_short

  return {
    title: `${name} — Etudia`,
    description: description,
    openGraph: { images: ['/og-image.png'] },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const t = await getTranslations('catalogue')
  const product = await fetchProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Link */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/catalogue">
          <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-2">
            ← {t('backToCatalogue')}
          </span>
        </Link>
      </div>

      <ProductDetailClient product={product} locale={locale} />
    </div>
  )
}
