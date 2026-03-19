import type { Metadata } from 'next'

interface LayoutProps {
  params: Promise<{
    locale: string
  }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Propose un outil — Etudia' : 'Suggest a Tool — Etudia',
    description: locale === 'fr' ? 'Tu as une idée d\'outil pour ta communauté ? Propose-la et fais voter la communauté.' : 'Got a tool idea for your community? Suggest it and let the community vote.',
    openGraph: { images: ['/og-image.png'] },
  }
}

export default function Layout({ children }: LayoutProps) {
  return children
}
