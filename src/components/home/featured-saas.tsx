"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp } from 'lucide-react'

interface FeaturedSaaS {
  id: string
  name: string
  niche: string
  description: string
  activeUsers: number
  commissionRate: number
  status: 'live' | 'coming_soon'
}

export function FeaturedSaas() {
  const t = useTranslations('catalogue.card')
  const catT = useTranslations('catalogue')

  // Mock data - will be replaced with Supabase queries later
  const saasList: FeaturedSaaS[] = [
    {
      id: '1',
      name: 'ETUDIET',
      niche: 'Education',
      description: 'Un SaaS pour aider les étudiants à gérer leur alimentation et santé',
      activeUsers: 234,
      commissionRate: 35,
      status: 'live',
    },
    {
      id: '2',
      name: 'BacSuccess',
      niche: 'Éducation',
      description: 'Plateforme complète de préparation au baccalauréat',
      activeUsers: 567,
      commissionRate: 40,
      status: 'live',
    },
    {
      id: '3',
      name: 'FitCoach AI',
      niche: 'Fitness',
      description: 'Coach fitness IA personnalisé pour votre progression',
      activeUsers: 123,
      commissionRate: 30,
      status: 'live',
    },
  ]

  const getStatusBadge = (status: string) => {
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
            Nos SaaS en vedette
          </h2>
          <p className="text-foreground/70 text-lg">Découvrez nos produits les plus populaires</p>
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
                    <div className="flex items-center gap-2 text-foreground/70 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{saas.activeUsers} {t('users')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Commission: {saas.commissionRate}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-card-border">
                    {getStatusBadge(saas.status)}
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
              {catT('viewAll')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
