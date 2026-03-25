"use client"

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Search, Megaphone, Wallet, ArrowRight, Star, Quote } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const steps = [
  { icon: Search, key: 'step1' },
  { icon: Megaphone, key: 'step2' },
  { icon: Wallet, key: 'step3' },
] as const

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.16a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.59z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export function AmbassadorSection() {
  const t = useTranslations('home.ambassador')
  const [followers, setFollowers] = useState(10000)

  const estimatedRevenue = useMemo(() => {
    const conversionRate = 0.02
    const price = 12.90
    const commission = 0.40
    return Math.round(followers * conversionRate * price * commission)
  }, [followers])

  const platformIcons = [
    { Icon: TikTokIcon, name: t('platforms.tiktok') },
    { Icon: InstagramIcon, name: t('platforms.instagram') },
    { Icon: YouTubeIcon, name: t('platforms.youtube') },
  ]

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        {/* Revenue highlight */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <span className="text-6xl md:text-8xl font-bold gradient-text font-[family-name:var(--font-display)]">
            {t('revenueHighlight')}
          </span>
          <p className="text-lg md:text-xl text-slate-600 dark:text-white/50 mt-3">
            {t('revenueHighlightSub')}
          </p>
        </motion.div>

        {/* Platform logos */}
        <motion.div
          className="flex items-center justify-center gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {platformIcons.map(({ Icon, name }) => (
            <div key={name} className="flex items-center gap-2 text-slate-400 dark:text-white/30">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">{name}</span>
            </div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-foreground mb-5 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-slate-600 dark:text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Dashed connector lines (desktop only) */}
          <div className="hidden md:block absolute top-14 left-[calc(33.33%-8px)] w-[calc(33.33%+16px)] border-t-2 border-dashed border-slate-300 dark:border-white/15" />
          <div className="hidden md:block absolute top-14 right-[calc(33.33%-8px)] w-[calc(33.33%+16px)] border-t-2 border-dashed border-slate-300 dark:border-white/15" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.key}
                variants={itemVariants}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="relative mb-8">
                  <div className="w-28 h-28 rounded-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-500 text-slate-950 text-sm font-bold flex items-center justify-center shadow-lg shadow-amber-500/25">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-3">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed max-w-xs">
                  {t(`${step.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mini simulator + testimonial */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {/* Mini simulator */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6">
            <h4 className="font-semibold text-foreground mb-4 font-[family-name:var(--font-display)]">
              {t('simulatorTitle')}
            </h4>
            <label className="text-sm text-slate-500 dark:text-white/40 mb-2 block">
              {t('simulatorLabel')}
            </label>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-slate-200 dark:bg-white/10 accent-indigo-500 cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs text-slate-400 dark:text-white/30 mb-4">
              <span>1K</span>
              <span className="font-medium text-foreground">{(followers / 1000).toFixed(0)}K</span>
              <span>100K</span>
            </div>
            <div className="text-center py-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
              <motion.span
                key={estimatedRevenue}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                {estimatedRevenue}€
              </motion.span>
              <span className="text-slate-400 dark:text-white/30 text-sm ml-1">/mois</span>
            </div>
            <div className="mt-4 text-center">
              <Link href="/devenir-partenaire" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                {t('simulatorCta')}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-indigo-500/20 dark:text-indigo-400/20 mb-3" />
              <p className="text-slate-600 dark:text-white/60 leading-relaxed mb-4">
                &ldquo;{t('testimonial.quote')}&rdquo;
              </p>
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{t('testimonial.name')}</p>
                  <p className="text-xs text-slate-500 dark:text-white/40">{t('testimonial.role')}</p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
                  {t('testimonial.result')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <div className="flex justify-center">
            <Link href="/devenir-partenaire">
              <Button variant="cta" size="lg">
                {t('cta')}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
                >
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.span>
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-400 dark:text-white/30">
            {t('trust')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
