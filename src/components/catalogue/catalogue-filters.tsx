'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export interface FilterState {
  search: string
  niches: string[]
  statuses: string[]
  commissionRate: 'all' | 'low' | 'high'
}

interface CatalogueFiltersProps {
  niches: string[]
  onFiltersChange: (filters: FilterState) => void
}

export function CatalogueFilters({ niches, onFiltersChange }: CatalogueFiltersProps) {
  const t = useTranslations()
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    niches: [],
    statuses: [],
    commissionRate: 'all',
  })

  const handleSearchChange = useCallback((value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }, [filters, onFiltersChange])

  const handleNicheToggle = useCallback((niche: string) => {
    const newNiches = filters.niches.includes(niche)
      ? filters.niches.filter(n => n !== niche)
      : [...filters.niches, niche]
    const newFilters = { ...filters, niches: newNiches }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }, [filters, onFiltersChange])

  const handleStatusToggle = useCallback((status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status]
    const newFilters = { ...filters, statuses: newStatuses }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }, [filters, onFiltersChange])

  const handleCommissionChange = useCallback((rate: 'all' | 'low' | 'high') => {
    const newFilters = { ...filters, commissionRate: rate }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }, [filters, onFiltersChange])

  const statuses = [
    { value: 'live', label: t('catalogue.statusLive') },
    { value: 'coming_soon', label: t('catalogue.statusComingSoon') },
    { value: 'in_construction', label: t('catalogue.statusInConstruction') },
  ]

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder={t('catalogue.searchPlaceholder')}
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-card border border-card-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        />
      </div>

      {/* Niche Filter */}
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-foreground mb-3">
          {t('catalogue.filterNiche')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => handleNicheToggle(niche)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                filters.niches.includes(niche)
                  ? 'bg-accent text-background'
                  : 'bg-card border border-card-border text-foreground hover:border-accent/50'
              )}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-foreground mb-3">
          {t('catalogue.filterStatus')}
        </h3>
        <div className="space-y-2">
          {statuses.map((status) => (
            <label
              key={status.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.statuses.includes(status.value)}
                onChange={() => handleStatusToggle(status.value)}
                className="w-4 h-4 rounded accent-accent cursor-pointer"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {status.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Commission Rate Filter */}
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-foreground mb-3">
          {t('catalogue.filterCommission')}
        </h3>
        <div className="space-y-2">
          {[
            { value: 'all' as const, label: t('catalogue.commissionAll') },
            { value: 'low' as const, label: t('catalogue.commissionLow') },
            { value: 'high' as const, label: t('catalogue.commissionHigh') },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="commission"
                checked={filters.commissionRate === option.value}
                onChange={() => handleCommissionChange(option.value)}
                className="w-4 h-4 cursor-pointer accent-accent"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
