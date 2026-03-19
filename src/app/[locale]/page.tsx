import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { MetricsBand } from '@/components/home/metrics-band'
import { HowItWorksSummary } from '@/components/home/how-it-works-summary'
import { FeaturedSaas } from '@/components/home/featured-saas'
import { IdeasTeaser } from '@/components/home/ideas-teaser'
import { WhyCreators } from '@/components/home/why-creators'
import { CtaSection } from '@/components/home/cta-section'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Etudia — Monétise ta communauté avec des outils digitaux' : 'Etudia — Monetize your community with digital tools',
    description: locale === 'fr' ? 'Tu es créateur de contenu ? Recommande des applications utiles à ta communauté et touche jusqu\'à 50% de commission chaque mois.' : 'You create content? Recommend useful tools to your community and earn up to 50% commission every month.',
    openGraph: { images: ['/og-image.png'] },
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsBand />
      <HowItWorksSummary />
      <FeaturedSaas />
      <WhyCreators />
      <IdeasTeaser />
      <CtaSection />
    </>
  )
}
