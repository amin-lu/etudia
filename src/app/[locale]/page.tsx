import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { SocialProof } from '@/components/home/social-proof'
import { MethodSection } from '@/components/home/method-section'
import { FeaturedSaas } from '@/components/home/featured-saas'
import { AmbassadorSection } from '@/components/home/ambassador-section'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Etudia — Des apps d\'apprentissage conçues par la science' : 'Etudia — Learning apps built on cognitive science',
    description: locale === 'fr' ? 'Applications d\'apprentissage pour chaque filière. Répétition espacée, rappel actif et gamification au cœur de chaque produit.' : 'Learning apps for every field. Spaced repetition, active recall and gamification at the core of every product.',
    openGraph: { images: ['/og-image.png'] },
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <MethodSection />
      <FeaturedSaas />
      <AmbassadorSection />
    </>
  )
}
