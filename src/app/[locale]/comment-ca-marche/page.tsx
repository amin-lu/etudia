import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Comment ça marche — Etudia' : 'How It Works — Etudia',
    description: locale === 'fr' ? 'Découvrez comment Etudia fonctionne et comment les trois acteurs gagnent ensemble.' : 'Discover how Etudia works and how all three actors win together.',
    openGraph: { images: ['/og-image.png'] },
  }
}

import { HowItWorksPageClient } from '@/components/how-it-works/how-it-works-page-client'

export default async function CommentCaMarchePage({ params }: PageProps) {
  const { locale } = await params
  return <HowItWorksPageClient locale={locale} />
}
