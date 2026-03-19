'use client'

import { SaasProduct } from '@/lib/supabase/types'
import { formatCurrency, getStatusLabel, getStatusColor, cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface SaasCardProps {
  product: SaasProduct
  locale: string
}

export function SaasCard({ product, locale }: SaasCardProps) {
  const t = useTranslations('catalogue')

  const description = locale === 'en' ? product.description_short_en : product.description_short

  return (
    <Link href={`/catalogue/${product.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-full cursor-pointer rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 transition-shadow hover:shadow-lg"
      >
        <div className="flex flex-col h-full gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground leading-tight flex-1">
              {product.name}
            </h3>
            <div className={cn(
              'px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap',
              getStatusColor(product.status)
            )}>
              {getStatusLabel(product.status, locale)}
            </div>
          </div>

          {/* Niche Badge */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              {product.niche}
            </span>
          </div>

          {/* Description */}
          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* Metrics */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">
                {t('activeUsers')}
              </span>
              <span className="text-foreground font-medium">
                {product.active_users?.toLocaleString() ?? 0}
              </span>
            </div>
            {(product.price_monthly ?? 0) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">
                  {t('commission')}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {product.commission_rate}%
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">
                Price
              </span>
              <span className="text-foreground font-semibold">
                {(product.price_monthly ?? 0) > 0 ? `$${(product.price_monthly ?? 0).toFixed(2)}` : 'Free'}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t border-zinc-300 dark:border-zinc-700">
            <span className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              {t('viewDetails')} →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
