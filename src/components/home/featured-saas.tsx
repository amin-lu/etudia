"use client"

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ExternalLink } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface FeaturedSaaS {
  id: string
  slug: string
  name: string
  niche: string
  description: string
  activeUsers: number
  commissionRate: number
  status: 'live' | 'coming_soon'
  price: number
  externalUrl: string | null
}

export function FeaturedSaas() {
  const t = useTranslations('catalogue.card')
  const catT = useTranslations('catalogue')
  const homeT = useTranslations('home.featured')
  const locale = useLocale()

  // Mock data with realistic numbers (0 users, real prices)
  const saasList: FeaturedSaaS[] = [
    {
      id: '1',
      slug: 'etudiet',
      name: 'ETUDIET',
      niche: locale === 'fr' ? 'Éducation' : 'Education',
      description: locale === 'fr'
        ? 'Plateforme de révision structurée pour les étudiants en BTS Diététique.'
        : 'Structured revision platform for BTS Dietetics students.',
      activeUsers: 0,
      commissionRate: 40,
      status: 'live',
      price: 12.90,
      externalUrl: 'https://etudiete.vercel.app',
    },
    {
      id: '2',
      slug: 'bacsuccess',
      name: 'BacSuccess',
      niche: locale === 'fr' ? 'Éducation' : 'Education',
      description: locale === 'fr'
        ? 'Préparation au baccalauréat malien — toutes séries, quiz et flashcards.'
        : 'Malian baccalaureate preparation — all series, quizzes and flashcards.',
      activeUsers: 0,
      commissionRate: 40,
      status: 'live',
      price: 0,
      externalUrl: 'https://bacsuccess.vercel.app',
    },
    {
      id: '3',
      slug: 'fittrack-pro',
      name: 'FitTrack Pro',
      niche: 'Fitness',
      description: locale === 'fr'
        ? 'Suivi nutritionnel et programmes d\'entraînement personnalisés.'
        : 'Nutritional tracking and personalized training programs.',
      activeUsers: 0,
      commissionRate: 45,
      status: 'coming_soon',
      price: 9.90,
      externalUrl: null,
    },
  ]

  const getStatusBadge = (status: string, activeUsers: number) => {
    if (activeUsers === 0) {
      return <Badge variant="info">{catT('metricsNew')}</Badge>
    }
    if (status === 'live') {
      return <Badge variant="success">En ligne</Badge>
    }
    return <Badge variant="info">Bientôt</Badge>
  }

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-4 tracking-tight">
            {homeT('title')}
          </h2>
          <p className="text-foreground/70 text-lg">{homeT('subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{}}
          whileInView={{ transition: { staggerChildren: 0.1 } }}
          viewport={{ once: true }}
        >
          {saasList.map((saas) => (
            <motion.div
              key={saas.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              whileHover={{ y: -8 }}
            >
              <Card variant="interactive" className="h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {saas.name}
                      </h3>
                      <Badge variant="niche" className="text-xs">
                        {saas.niche}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-foreground/70 text-sm mb-6 flex-1">
                    {saas.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-accent font-semibold text-lg">
                      <TrendingUp className="w-5 h-5" />
                      <span>{saas.commissionRate}% {locale === 'fr' ? 'de commission' : 'commission'}</span>
                    </div>
                    {saas.price > 0 && (
                      <div className="text-foreground/70 text-sm">
                        {formatPrice(saas.price, locale)}/{locale === 'fr' ? 'mois' : 'mo'}
                      </div>
                    )}
                    {saas.price === 0 && (
                      <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                        {locale === 'fr' ? 'Gratuit' : 'Free'}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-card-border gap-2">
                    <Link href={`/catalogue/${saas.slug}`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                      {catT('viewDetails')} →
                    </Link>
                    {saas.externalUrl && saas.status === 'live' && (
                      <a
                        href={saas.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
                      >
                        {locale === 'fr' ? 'Voir le site' : 'Visit site'}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {!saas.externalUrl && getStatusBadge(saas.status, saas.activeUsers)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <Link href="/catalogue">
            <Button variant="secondary" size="lg">
              {homeT('cta')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
