'use client'

import { useState } from 'react'
import { SaasProduct } from '@/lib/supabase/types'
import { CatalogueFilters, FilterState } from './catalogue-filters'
import { CatalogueGrid } from './catalogue-grid'
import { useTranslations } from 'next-intl'

interface CatalogueContentProps {
  products: SaasProduct[]
  locale: string
}

export function CatalogueContent({ products, locale }: CatalogueContentProps) {
  const t = useTranslations('catalogue')
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    niches: [],
    statuses: [],
    commissionRate: 'all',
  })

  const niches = Array.from(new Set(products.map((p) => p.niche)))

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-6">
                {t('filters')}
              </h2>
              <CatalogueFilters
                niches={niches}
                onFiltersChange={setFilters}
              />
            </div>
          </aside>

          {/* Grid Content */}
          <div className="lg:col-span-3">
            <CatalogueGrid
              products={products}
              filters={filters}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
