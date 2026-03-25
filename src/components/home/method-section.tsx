"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Brain, Target, Trophy, FileText } from 'lucide-react'

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

const cards = [
  { icon: Brain, key: 'spacedRepetition', animation: 'pulse' },
  { icon: Target, key: 'testingEffect', animation: 'spin' },
  { icon: Trophy, key: 'gamification', animation: 'bounce' },
  { icon: FileText, key: 'examFormat', animation: 'flip' },
] as const

const iconAnimations = {
  pulse: { scale: [1, 1.15, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
  spin: { rotate: [0, 360], transition: { duration: 8, repeat: Infinity, ease: 'linear' as const } },
  bounce: { y: [0, -4, 0], transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const } },
  flip: { rotateY: [0, 180, 360], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
}

export function MethodSection() {
  const t = useTranslations('home.method')

  return (
    <section id="methode" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
          <p className="text-slate-600 dark:text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Comparison infographic */}
        <motion.div
          className="max-w-xl mx-auto mb-16 p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
        >
          <p className="text-sm font-medium text-slate-500 dark:text-white/50 mb-4 text-center">
            {t('comparison.title')}
          </p>

          {/* Passive: re-reading */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-slate-500 dark:text-white/40">{t('comparison.passive')}</span>
              <span className="text-sm font-semibold text-slate-400 dark:text-white/30">{t('comparison.passivePercent')}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-slate-300 dark:bg-white/15"
                initial={{ width: "0%" }}
                whileInView={{ width: "20%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' as const }}
              />
            </div>
          </div>

          {/* Active: self-testing */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('comparison.active')}</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{t('comparison.activePercent')}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                initial={{ width: "0%" }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' as const }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 dark:text-white/20 text-center mt-3">
            {t('comparison.source')}
          </p>
        </motion.div>

        {/* Method cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.key}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-7 card-glow">
                  <div className="mb-5 w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                    <motion.div
                      animate={iconAnimations[card.animation]}
                    >
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-foreground mb-2">
                    {t(`${card.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed">
                    {t(`${card.key}.description`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
