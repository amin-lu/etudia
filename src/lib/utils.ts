import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number, locale = 'fr-FR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

export function generateFingerprint(): string {
  if (typeof window === 'undefined') return ''
  const nav = window.navigator
  const screen = window.screen
  const raw = [
    nav.userAgent,
    nav.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ].join('|')
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export function getStatusLabel(status: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    live: { fr: 'En ligne', en: 'Live' },
    building: { fr: 'En construction', en: 'Building' },
    coming_soon: { fr: 'Bientôt', en: 'Coming Soon' },
    submitted: { fr: 'Soumise', en: 'Submitted' },
    evaluating: { fr: 'En évaluation', en: 'Evaluating' },
    accepted: { fr: 'Acceptée', en: 'Accepted' },
    built: { fr: 'Construite', en: 'Built' },
    pending: { fr: 'En attente', en: 'Pending' },
  }
  return labels[status]?.[locale] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    live: 'bg-green-500/20 text-green-400 border-green-500/30',
    building: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    coming_soon: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    submitted: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    evaluating: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
    built: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    pending: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  }
  return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}
