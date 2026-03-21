'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { Sun, Moon, Menu, Globe } from 'lucide-react'
import { MobileNav } from './mobile-nav'

const navItems = [
  { href: '/#applications', key: 'apps' },
  { href: '/#methode', key: 'method' },
  { href: '/devenir-partenaire', key: 'creators' },
] as const

export function Header() {
  const t = useTranslations('common')
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
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
                  className={`px-3.5 py-2 text-sm rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/partenaire/connexion"
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors font-medium"
              >
                {t('nav.partnerArea')}
              </Link>

              <button
                onClick={switchLocale}
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase text-xs font-medium">{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 hidden dark:block" />
                <Moon className="h-4 w-4 block dark:hidden" />
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white transition-colors lg:hidden"
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
