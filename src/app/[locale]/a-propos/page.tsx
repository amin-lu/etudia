import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Qui est derrière Etudia ?' : 'Who\'s Behind Etudia?',
    description: locale === 'fr' ? 'Découvrez notre histoire, nos valeurs et notre vision pour l\'avenir des applications digitales.' : 'Discover our story, values, and vision for the future of digital tools.',
    openGraph: { images: ['/og-image.png'] },
  }
}

import { AboutPageClient } from '@/components/about/about-page-client'

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  return <AboutPageClient locale={locale} />
}
