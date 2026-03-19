import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Etudia — Studio SaaS pour Créateurs',
    template: '%s | Etudia',
  },
  description:
    'Etudia construit des SaaS pour toutes les niches et les distribue via des créateurs de contenu en affiliation.',
  openGraph: {
    title: 'Etudia — Studio SaaS pour Créateurs',
    description:
      'On construit des SaaS. Les créateurs les distribuent. Tout le monde gagne.',
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    siteName: 'Etudia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etudia — Studio SaaS pour Créateurs',
    description:
      'On construit des SaaS. Les créateurs les distribuent. Tout le monde gagne.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
