'use client'

import { SaasProduct } from '@/lib/supabase/types'
import { formatCurrency, getStatusLabel, getStatusColor, cn, formatPrice } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Check } from 'lucide-react'

interface ProductDetailClientProps {
  product: SaasProduct
  locale: string
}

export function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const t = useTranslations('catalogue')

  const description = locale === 'en' ? product.description_long_en : product.description_long
  const features = locale === 'en' ? product.features_en : product.features
  const launchDate = product.launched_at
    ? new Date(product.launched_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR')
    : null

  const displayUsers = product.active_users === 0 ? t('metricsNew') : product.active_users?.toLocaleString() ?? 0
  const displayMrr = product.mrr === 0 ? '—' : formatCurrency(product.mrr, locale)

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

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-8">
              {t('features')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/70">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-8">
            {t('pricing')}
          </h2>

          <div className="max-w-md">
            {product.price === 0 ? (
              <div className="rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-800 p-6">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                  {t('pricingFree')}
                </span>
              </div>
            ) : (
              <div className="rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-800 p-6">
                <p className="text-foreground/70 text-sm font-medium mb-2">
                  {locale === 'en' ? 'Starting at' : 'À partir de'}
                </p>
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {formatPrice(product.price, locale)}
                </p>
                <p className="text-foreground/60 text-sm mt-2">
                  {locale === 'en' ? '/month' : '/mois'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-4">
              {t('promoteTitle')}
            </h2>

            <div className="mb-6">
              <p className="text-lg font-semibold text-foreground mb-2">
                {product.commission_rate}% {locale === 'en' ? 'on every subscription' : 'sur chaque abonnement'}
              </p>
              <p className="text-foreground/70">
                {locale === 'en' ? 'Get your affiliate link and start earning' : 'Recevez votre lien affilié et commencez à gagner'}
              </p>
            </div>

            <Link href="/devenir-partenaire">
              <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                {t('promoteApply')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-8">
            {t('metrics')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Users */}
            <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
              {product.active_users === 0 ? (
                <>
                  <p className="text-foreground/60 text-sm font-medium mb-2">
                    {t('activeUsers')}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                    {t('newBadge')}
                  </span>
                </>
              ) : (
                <>
                  <p className="text-foreground/60 text-sm font-medium mb-2">
                    {t('activeUsers')}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {displayUsers}
                  </p>
                </>
              )}
            </div>

            {/* MRR */}
            <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-foreground/60 text-sm font-medium mb-2">
                {t('mrr')}
              </p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {displayMrr}
              </p>
            </div>

            {/* Launch Date */}
            {launchDate && (
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
                <p className="text-foreground/60 text-sm font-medium mb-2">
                  {t('launchDate')}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {launchDate}
                </p>
              </div>
            )}

            {/* Commission Rate */}
            <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
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
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
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
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {product.status === 'coming_soon' ? (
            <div className="max-w-md mx-auto">
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/30 p-8 text-center">
                <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                  {t('comingSoonMessage')}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t('comingSoonSubtext')}
                </p>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </section>
    </>
  )
}
