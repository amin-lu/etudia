"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export function Hero() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated gradient orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-gradient-to-r from-indigo-600/20 dark:from-indigo-500/30 to-purple-600/20 dark:to-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{}}
        whileInView={{ transition: { staggerChildren: 0.1 } }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {t('title')}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <Link href="/catalogue">
            <Button variant="primary" size="lg">
              {t('cta1')}
            </Button>
          </Link>
          <Link href="/devenir-partenaire">
            <Button variant="secondary" size="lg">
              {t('cta2')}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
