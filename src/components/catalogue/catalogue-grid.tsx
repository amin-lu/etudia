'use client'

import { useMemo } from 'react'
import { SaasProduct } from '@/lib/supabase/types'
import { SaasCard } from './saas-card'
import { FilterState } from './catalogue-filters'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { EmptyState } from '@/components/ui/empty-state'
import { Search } from 'lucide-react'

interface CatalogueGridProps {
  products: SaasProduct[]
  filters: FilterState
  locale: string
}

export function CatalogueGrid({ products, filters, locale }: CatalogueGridProps) {
  const t = useTranslations('catalogue')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          (product.description_short?.toLowerCase().includes(query) ?? false) ||
          (product.description_short_en?.toLowerCase().includes(query) ?? false)

        if (!matchesSearch) return false
      }

      // Niche filter
      if (filters.niches.length > 0) {
        if (!filters.niches.includes(product.niche)) return false
      }

      // Status filter
      if (filters.statuses.length > 0) {
        if (!filters.statuses.includes(product.status)) return false
      }

      // Commission rate filter
      if (filters.commissionRate !== 'all') {
        const rate = product.commission_rate ?? 0
        if (filters.commissionRate === 'low' && rate >= 40) return false
        if (filters.commissionRate === 'high' && rate < 40) return false
      }

      return true
    })
  }, [products, filters])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title={t('noResults')}
        description={t('tryAdjustingFilters')}
      />
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredProducts.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <SaasCard product={product} locale={locale} />
        </motion.div>
      ))}
    </motion.div>
  )
}
