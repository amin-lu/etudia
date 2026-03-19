import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Devenir créateur partenaire — Etudia' : 'Become a Creator Partner — Etudia',
    description: locale === 'fr' ? 'Transformez votre audience en revenus récurrents. Devenez partenaire Etudia et touchez 30 à 50% de commission sur chaque abonnement.' : 'Transform your audience into recurring revenue. Become an Etudia partner and earn 30-50% commission on every subscription.',
    openGraph: { images: ['/og-image.png'] },
  }
}

import { CreatorsPageClient } from '@/components/creators/creators-page-client'

export default async function DevnirPartenairePage({ params }: PageProps) {
  const { locale } = await params
  return <CreatorsPageClient locale={locale} />
}
