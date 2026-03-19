"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { formatCurrency } from '@/lib/utils'

interface Metric {
  value: number
  label: string
  key: 'saasBuilt' | 'creatorsPartnered' | 'revenue'
  suffix?: string
}

export function MetricsBand() {
  const t = useTranslations('home.stats')

  // Mock data - all zeros, section will be hidden
  const metrics: Metric[] = [
    {
      value: 0,
      label: t('saasBuilt'),
      key: 'saasBuilt',
    },
    {
      value: 0,
      label: t('creatorsPartnered'),
      key: 'creatorsPartnered',
    },
    {
      value: 0,
      label: t('revenue'),
      key: 'revenue',
      suffix: '€',
    },
  ]

  // Hide section if all metrics are 0
  const hasData = metrics.some(m => m.value > 0)
  if (!hasData) return null

  return (
    <motion.section
      className="py-16 sm:py-20 bg-card border-t border-b border-card-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {metrics.map((metric) => (
            <motion.div
              key={metric.key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-accent mb-3">
                {metric.key === 'revenue' ? (
                  formatCurrency(metric.value)
                ) : (
                  <>
                    <AnimatedCounter
                      value={metric.value}
                      duration={2}
                      decimals={0}
                      suffix={metric.suffix || ''}
                    />
                  </>
                )}
              </div>
              <p className="text-foreground/70 text-lg">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
