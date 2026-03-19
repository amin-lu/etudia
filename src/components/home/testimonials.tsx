"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

export function Testimonials() {
  const t = useTranslations('home.testimonials')

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
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{}}
          whileInView={{ transition: { staggerChildren: 0.1 } }}
          viewport={{ once: true }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="h-24 bg-foreground/5 rounded mb-4 flex items-center justify-center">
                    <p className="text-foreground/40 text-sm">
                      Bientôt disponible
                    </p>
                  </div>
                  <div className="h-4 bg-foreground/5 rounded mb-3" />
                  <div className="h-4 bg-foreground/5 rounded mb-6 w-3/4" />
                  <div className="border-t border-card-border pt-4">
                    <div className="h-4 bg-foreground/5 rounded mb-2 w-1/2" />
                    <div className="h-3 bg-foreground/5 rounded w-1/3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
