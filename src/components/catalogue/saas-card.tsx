'use client'

import { SaasProduct } from '@/lib/supabase/types'
import { formatPrice, getStatusLabel, getStatusColor, cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ExternalLink } from 'lucide-react'

interface SaasCardProps {
  product: SaasProduct
  locale: string
}

export function SaasCard({ product, locale }: SaasCardProps) {
  const t = useTranslations('catalogue')
  const localeCode = useLocale()

  const description = locale === 'en' ? product.description_short_en : product.description_short

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full cursor-pointer rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 transition-colors hover:border-indigo-500/50"
      role="article"
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
          {product.active_users === 0 ? (
            <div className="flex justify-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                {t('newBadge')}
              </span>
            </div>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">
                {t('activeUsers')}
              </span>
              <span className="text-foreground font-medium">
                {product.active_users?.toLocaleString() ?? 0}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-foreground/60">
              {t('commission')}
            </span>
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {product.commission_rate}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">
              {localeCode === 'fr' ? 'Prix' : 'Price'}
            </span>
            <span className="text-foreground font-semibold">
              {formatPrice(product.price_monthly ?? 0, localeCode)}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-300 dark:border-zinc-700 gap-2">
          <Link href={`/catalogue/${product.slug}`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            {t('viewDetails')} →
          </Link>
          {product.external_url && product.status === 'live' && (
            <a
              href={product.external_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
            >
              {localeCode === 'fr' ? 'Voir le site' : 'Visit site'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
