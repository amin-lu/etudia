'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { X, Sun, Moon, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/#applications', key: 'apps' },
  { href: '/#methode', key: 'method' },
  { href: '/devenir-partenaire', key: 'creators' },
] as const

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations('common')
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    router.replace(pathname, { locale: newLocale })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white/95 dark:bg-[#0a0a1a]/95 backdrop-blur-xl flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-4">
            <span className="text-xl font-bold font-[family-name:var(--font-display)]">
              <span className="text-foreground">etudia</span>
              <span className="text-indigo-500">.</span>
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Centered nav links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block text-2xl font-medium px-6 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="w-12 h-px bg-slate-200 dark:bg-white/10 my-4" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/partenaire/connexion"
                onClick={onClose}
                className="block text-lg font-medium px-6 py-3 rounded-lg text-indigo-600 dark:text-indigo-400 transition-colors"
              >
                {t('nav.partnerArea')}
              </Link>
            </motion.div>
          </nav>

          {/* Bottom: theme + language toggles */}
          <div className="p-6 flex items-center justify-center gap-4">
            <button
              onClick={switchLocale}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'fr' ? 'English' : 'Français'}</span>
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2.5 text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 hidden dark:block" />
              <Moon className="h-4 w-4 block dark:hidden" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
