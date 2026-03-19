import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'À propos — Etudia' : 'About — Etudia',
    description: locale === 'fr' ? 'Découvrez notre histoire, nos valeurs et notre vision pour l\'avenir du SaaS.' : 'Discover our story, values, and vision for the future of SaaS.',
    openGraph: { images: ['/og-image.png'] },
  }
}

import { AboutPageClient } from '@/components/about/about-page-client'

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  return <AboutPageClient locale={locale} />
}
