"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'

export function IdeasTeaser() {
  const t = useTranslations('home.ideas')

  return (
    <motion.section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-indigo-100 dark:bg-indigo-900/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <div className="p-4 bg-accent/10 rounded-full text-accent">
            <Lightbulb className="w-8 h-8" />
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-foreground/70 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <Link href="/soumettre-idee">
            <Button variant="primary" size="lg">
              {t('cta')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
