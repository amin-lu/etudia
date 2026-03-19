'use client'

import { SaasProduct } from '@/lib/supabase/types'
import { formatCurrency, getStatusLabel, getStatusColor, cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

interface ProductDetailClientProps {
  product: SaasProduct
  locale: string
}

export function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const t = useTranslations('catalogue')

  const description = locale === 'en' ? product.description_long_en : product.description_long
  const launchDate = product.launched_at
    ? new Date(product.launched_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR')
    : null

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {product.niche}
                </span>
                <div className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getStatusColor(product.status)
                )}>
                  {getStatusLabel(product.status, locale)}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-8">
            {t('metrics')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Users */}
            <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-foreground/60 text-sm font-medium mb-2">
                {t('activeUsers')}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {product.active_users?.toLocaleString() ?? 0}
              </p>
            </div>

            {/* MRR */}
            {product.mrr !== null && product.mrr > 0 && (
              <div className="rounded-xl bg-zinc-900 dark:bg-zinc-900 bg-zinc-100 border border-zinc-800 dark:border-zinc-800 p-6">
                <p className="text-foreground/60 text-sm font-medium mb-2">
                  {t('mrr')}
                </p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(product.mrr, locale)}
                </p>
              </div>
            )}

            {/* Launch Date */}
            {launchDate && (
              <div className="rounded-xl bg-zinc-900 dark:bg-zinc-900 bg-zinc-100 border border-zinc-800 dark:border-zinc-800 p-6">
                <p className="text-foreground/60 text-sm font-medium mb-2">
                  {t('launchDate')}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {launchDate}
                </p>
              </div>
            )}

            {/* Commission Rate */}
            <div className="rounded-xl bg-zinc-900 dark:bg-zinc-900 bg-zinc-100 border border-zinc-800 dark:border-zinc-800 p-6">
              <p className="text-foreground/60 text-sm font-medium mb-2">
                {t('commission')}
              </p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {product.commission_rate}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Placeholder */}
      {product.screenshot_url && (
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-8">
              {t('screenshots')}
            </h2>
            <div className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 aspect-video">
              <img
                src={product.screenshot_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTAs */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-zinc-300 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Promote SaaS CTA */}
            <Link href="/devenir-partenaire">
              <button className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                {t('promoteThisSaas')}
              </button>
            </Link>

            {/* Access SaaS CTA */}
            {product.external_url ? (
              <a href={product.external_url} target="_blank" rel="noopener noreferrer">
                <button className="w-full px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-600/10 transition-colors">
                  {t('accessSaas')}
                </button>
              </a>
            ) : (
              <button disabled className="w-full px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-foreground/40 font-semibold cursor-not-allowed">
                {t('notAvailable')}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
