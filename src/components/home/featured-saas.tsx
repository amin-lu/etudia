"use client"

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, ExternalLink, Clock, Bell, Users, HelpCircle, ArrowRight } from 'lucide-react'
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
  color: string
  users?: number
  quizzes?: number
  progress?: number
}

function MiniPhoneMockup({ color, appName }: { color: string; appName: string }) {
  return (
    <div className={`w-full h-full rounded-xl ${color} p-3 flex flex-col justify-between`}>
      <div>
        <div className="text-white font-bold text-xs mb-2">{appName}</div>
        <div className="space-y-1.5">
          <div className="w-full h-1.5 rounded-full bg-white/30" />
          <div className="w-3/4 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="flex gap-1.5 mt-2">
        <div className="flex-1 h-5 rounded bg-white/25" />
        <div className="flex-1 h-5 rounded bg-white/15" />
      </div>
    </div>
  )
}

export function FeaturedSaas() {
  const t = useTranslations('home.featured')
  const locale = useLocale()
  const [notifyEmails, setNotifyEmails] = useState<Record<string, string>>({})

  const liveApps: FeaturedSaaS[] = [
    {
      id: '1',
      slug: 'etudiet',
      name: 'ETUDIET',
      niche: locale === 'fr' ? 'BTS Diététique' : 'BTS Dietetics',
      description: locale === 'fr'
        ? 'Plateforme de révision structurée pour les étudiants en BTS Diététique.'
        : 'Structured revision platform for BTS Dietetics students.',
      commissionRate: 40,
      status: 'live',
      price: 12.90,
      externalUrl: 'https://etudiete.vercel.app',
      color: 'bg-emerald-500',
      users: 320,
      quizzes: 650,
    },
    {
      id: '2',
      slug: 'bacsuccess',
      name: 'BacSuccess',
      niche: locale === 'fr' ? 'Bac Mali' : 'Mali Bac',
      description: locale === 'fr'
        ? 'Préparation au baccalauréat malien — toutes séries, quiz et flashcards.'
        : 'Malian baccalaureate preparation — all series, quizzes and flashcards.',
      commissionRate: 40,
      status: 'live',
      price: 0,
      externalUrl: 'https://bacsuccess.vercel.app',
      color: 'bg-blue-500',
      users: 180,
      quizzes: 400,
    },
  ]

  const comingSoonApps: FeaturedSaaS[] = [
    {
      id: '3',
      slug: 'droit',
      name: 'EtuDroit',
      niche: locale === 'fr' ? 'Droit' : 'Law',
      description: locale === 'fr'
        ? 'Révision des matières juridiques — droit civil, pénal, constitutionnel.'
        : 'Law revision — civil, criminal, constitutional law.',
      commissionRate: 40,
      status: 'coming_soon',
      price: 0,
      externalUrl: null,
      color: 'bg-purple-500',
      progress: 35,
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
      color: 'bg-rose-500',
      progress: 15,
    },
  ]

  return (
    <section id="applications" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-foreground mb-5 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg">{t('subtitle')}</p>
        </motion.div>

        {/* Live apps */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {liveApps.map((saas) => (
            <motion.div
              key={saas.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden card-glow">
                {/* App mockup header */}
                <div className="flex gap-4 p-6 pb-0">
                  <div className="w-20 h-28 rounded-xl overflow-hidden shrink-0 shadow-lg">
                    <MiniPhoneMockup color={saas.color} appName={saas.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-foreground tracking-tight">
                        {saas.name}
                      </h3>
                      <Badge variant="success" className="text-xs shrink-0">
                        {t('available')}
                      </Badge>
                    </div>
                    <Badge variant="niche" className="text-xs mb-2">
                      {saas.niche}
                    </Badge>
                    <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">
                      {saas.description}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 px-6 py-4 mt-3">
                  {saas.users && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/40">
                      <Users className="w-3.5 h-3.5" />
                      <span>{saas.users} {t('users')}</span>
                    </div>
                  )}
                  {saas.quizzes && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/40">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{saas.quizzes} {t('quizzes')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{t('creatorCommission')} : {saas.commissionRate}%</span>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-white/5">
                  {saas.price > 0 ? (
                    <span className="text-foreground font-semibold">
                      {formatPrice(saas.price, locale)}
                      <span className="text-sm text-slate-400 dark:text-white/30 font-normal">/{locale === 'fr' ? 'mois' : 'mo'}</span>
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {locale === 'fr' ? 'Gratuit' : 'Free'}
                    </span>
                  )}
                  {saas.externalUrl && (
                    <a href={saas.externalUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="sm">
                        {locale === 'fr' ? 'Découvrir' : 'Discover'}
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming soon section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-slate-400 dark:text-white/30" />
            <h3 className="text-xl font-semibold font-[family-name:var(--font-display)] text-slate-600 dark:text-white/50">
              {t('comingSoonTitle')}
            </h3>
          </div>
          <p className="text-slate-400 dark:text-white/30 text-sm mb-6">{t('comingSoonSubtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {comingSoonApps.map((saas) => (
            <motion.div
              key={saas.id}
              variants={itemVariants}
              className="opacity-70"
            >
              <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.01] p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${saas.color} opacity-60 flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">{saas.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{saas.name}</h4>
                    <Badge variant="niche" className="text-xs mt-1">{saas.niche}</Badge>
                  </div>
                </div>

                <p className="text-slate-400 dark:text-white/30 text-xs leading-relaxed mb-4">
                  {saas.description}
                </p>

                {/* Progress bar */}
                {saas.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-400 dark:text-white/30">{t('progressLabel')}</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-white/40">{saas.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${saas.color} opacity-60`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${saas.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' as const }}
                      />
                    </div>
                  </div>
                )}

                {/* Notify form */}
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={t('notifyPlaceholder')}
                    value={notifyEmails[saas.id] || ''}
                    onChange={(e) => setNotifyEmails(prev => ({ ...prev, [saas.id]: e.target.value }))}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-300 dark:placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button className="px-3 py-2 text-xs rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors shrink-0 flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    {t('notifyCta')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
