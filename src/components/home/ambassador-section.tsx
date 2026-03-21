"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Search, Megaphone, Wallet, ArrowRight } from 'lucide-react'

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

export function AmbassadorSection() {
  const t = useTranslations('home.ambassador')

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
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
                {/* Step number + icon */}
                <div className="relative mb-8">
                  <div className="w-28 h-28 rounded-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-500 text-slate-950 text-sm font-bold flex items-center justify-center shadow-lg shadow-amber-500/25">
                    {index + 1}
                  </span>
                </div>

                {/* Text */}
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
                <ArrowRight className="w-4 h-4 ml-1" />
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
