'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { Sun, Moon, Menu, Globe } from 'lucide-react'
import { MobileNav } from './mobile-nav'

const navItems = [
  { href: '/catalogue', key: 'catalogue' },
  { href: '/devenir-partenaire', key: 'creators' },
  { href: '/comment-ca-marche', key: 'howItWorks' },
  { href: '/a-propos', key: 'about' },
] as const

export function Header() {
  const t = useTranslations('common')
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo: etudia. with indigo dot */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold font-[family-name:var(--font-display)]">
                <span className="text-foreground">etudia</span>
                <span className="text-indigo-500">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    pathname === item.href
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={switchLocale}
                className="hidden sm:flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase text-xs font-medium">{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-xl p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 hidden dark:block" />
                <Moon className="h-4 w-4 block dark:hidden" />
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
