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
  { icon: Brain, key: 'spacedRepetition' },
  { icon: Target, key: 'testingEffect' },
  { icon: Trophy, key: 'gamification' },
  { icon: FileText, key: 'examFormat' },
] as const

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
                  <div className="mb-5 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
