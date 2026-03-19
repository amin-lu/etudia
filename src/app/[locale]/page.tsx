import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { MetricsBand } from '@/components/home/metrics-band'
import { HowItWorksSummary } from '@/components/home/how-it-works-summary'
import { FeaturedSaas } from '@/components/home/featured-saas'
import { IdeasTeaser } from '@/components/home/ideas-teaser'
import { SocialProof } from '@/components/home/social-proof'
import { CtaSection } from '@/components/home/cta-section'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Etudia — Studio SaaS distribués par les créateurs' : 'Etudia — SaaS Studio Distributed by Creators',
    description: locale === 'fr' ? 'Un studio qui construit des SaaS B2C et les distribue via des créateurs de contenu.' : 'A studio that builds B2C SaaS products and distributes them through content creators.',
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
      <SocialProof />
      <IdeasTeaser />
      <CtaSection />
    </>
  )
}
