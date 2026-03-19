'use client'

import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface Filter {
  key: string
  label: string
  options: { value: string; label: string }[]
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  searchable?: boolean
  searchKeys?: string[]
  searchPlaceholder?: string
  filters?: Filter[]
  pageSize?: number
  actions?: (row: T) => React.ReactNode
  onRowClick?: (row: T) => void
  emptyMessage?: string
}

export function DataTable<T = any>({
  columns,
  data,
  loading = false,
  searchable = true,
  searchKeys = [],
  searchPlaceholder = 'Rechercher...',
  filters = [],
  pageSize = 10,
  actions,
  onRowClick,
  emptyMessage = 'Aucun résultat',
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const filteredData = useMemo(() => {
    let result = data

    // Apply search
    if (searchTerm && searchKeys.length > 0) {
      const term = searchTerm.toLowerCase()
      result = result.filter((row) =>
        searchKeys.some((key) => {
          const value = (row as any)[key]
          return value ? String(value).toLowerCase().includes(term) : false
        })
      )
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) => String((row as any)[key]) === value)
      }
    })

    // Apply sort
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = (a as any)[sortKey]
        const bVal = (b as any)[sortKey]

        if (aVal === null || aVal === undefined) return 1
        if (bVal === null || bVal === undefined) return -1

        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, searchTerm, sortKey, sortDir, activeFilters, searchKeys])

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const startIdx = (currentPage - 1) * pageSize
  const paginatedData = filteredData.slice(startIdx, startIdx + pageSize)

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return

    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        {searchable && searchKeys.length > 0 && (
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        )}

        {filters.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={activeFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-800 border-b border-zinc-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs uppercase font-medium text-zinc-400 cursor-pointer hover:bg-zinc-700/50 transition-colors"
                  onClick={() => handleSort(col.key, col.sortable)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <>
                        {sortDir === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-xs uppercase font-medium text-zinc-400">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      <div className="h-4 bg-zinc-700 rounded animate-pulse w-24" />
                    </td>
                  ))}
                  {actions && <td className="px-6 py-4">
                    <div className="h-4 bg-zinc-700 rounded animate-pulse w-16" />
                  </td>}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-zinc-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-zinc-800 cursor-pointer transition-colors ${
                    i % 2 === 0 ? 'bg-zinc-900/50' : ''
                  } hover:bg-zinc-800/50`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-zinc-200">
                      {col.render ? col.render((row as any)[col.key], row) : String((row as any)[col.key] ?? '')}
                    </td>
                  ))}
                  {actions && <td className="px-6 py-4 text-zinc-200" onClick={(e) => e.stopPropagation()}>
                    {actions(row)}
                  </td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && filteredData.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Résultats {startIdx + 1}-{Math.min(startIdx + pageSize, filteredData.length)} sur {filteredData.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-sm text-zinc-400 px-4">
              Page {currentPage} / {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
