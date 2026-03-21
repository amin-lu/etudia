"use client"

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ExternalLink, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface FeaturedSaaS {
  id: string
  slug: string
  name: string
  niche: string
  description: string
  commissionRate: number
  status: 'live' | 'coming_soon'
  price: number
  externalUrl: string | null
}

export function FeaturedSaas() {
  const homeT = useTranslations('home.featured')
  const locale = useLocale()

  const saasList: FeaturedSaaS[] = [
    {
      id: '1',
      slug: 'etudiet',
      name: 'ETUDIET',
      niche: locale === 'fr' ? 'Éducation' : 'Education',
      description: locale === 'fr'
        ? 'Plateforme de révision structurée pour les étudiants en BTS Diététique.'
        : 'Structured revision platform for BTS Dietetics students.',
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
      commissionRate: 40,
      status: 'live',
      price: 0,
      externalUrl: 'https://bacsuccess.vercel.app',
    },
    {
      id: '3',
      slug: 'droit',
      name: 'EtuDroit',
      niche: locale === 'fr' ? 'Droit' : 'Law',
      description: locale === 'fr'
        ? 'Révision des matières juridiques — droit civil, pénal, constitutionnel. QCM et fiches.'
        : 'Law revision — civil, criminal, constitutional law. Quizzes and study sheets.',
      commissionRate: 40,
      status: 'coming_soon',
      price: 0,
      externalUrl: null,
    },
    {
      id: '4',
      slug: 'medecine',
      name: 'EtuMed',
      niche: locale === 'fr' ? 'Médecine' : 'Medicine',
      description: locale === 'fr'
        ? 'Préparation aux examens de médecine — anatomie, physiologie, pharmacologie.'
        : 'Medical exam preparation — anatomy, physiology, pharmacology.',
      commissionRate: 40,
      status: 'coming_soon',
      price: 0,
      externalUrl: null,
    },
  ]

  const isComingSoon = (status: string) => status === 'coming_soon'

  return (
    <section id="applications" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-foreground mb-5 tracking-tight">
            {homeT('title')}
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg">{homeT('subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {saasList.map((saas) => (
            <motion.div
              key={saas.id}
              variants={itemVariants}
              whileHover={!isComingSoon(saas.status) ? { y: -4 } : undefined}
              transition={{ duration: 0.2 }}
              className={isComingSoon(saas.status) ? 'opacity-50' : 'group'}
            >
              <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 card-glow">
                {/* Top row: name + badges */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                      {saas.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="niche" className="text-xs">
                        {saas.niche}
                      </Badge>
                      {isComingSoon(saas.status) && (
                        <Badge variant="info" className="text-xs">
                          {locale === 'fr' ? 'Prochainement' : 'Coming soon'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {!isComingSoon(saas.status) && (
                    <Badge variant="emerald" className="text-xs shrink-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {saas.commissionRate}%
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-500 dark:text-white/40 text-sm mb-6 leading-relaxed">
                  {saas.description}
                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5">
                  {!isComingSoon(saas.status) && saas.price > 0 && (
                    <span className="text-foreground font-semibold">
                      {formatPrice(saas.price, locale)}<span className="text-sm text-slate-400 dark:text-white/30 font-normal">/{locale === 'fr' ? 'mois' : 'mo'}</span>
                    </span>
                  )}
                  {!isComingSoon(saas.status) && saas.price === 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {locale === 'fr' ? 'Gratuit' : 'Free'}
                    </span>
                  )}
                  {isComingSoon(saas.status) && (
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-white/30 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{locale === 'fr' ? 'En préparation' : 'In development'}</span>
                    </div>
                  )}

                  {!isComingSoon(saas.status) && saas.externalUrl && (
                    <a
                      href={saas.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
                    >
                      {locale === 'fr' ? 'Voir le site' : 'Visit site'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {isComingSoon(saas.status) && (
                    <span className="text-sm text-slate-300 dark:text-white/20">
                      {locale === 'fr' ? 'Bientôt disponible' : 'Available soon'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
