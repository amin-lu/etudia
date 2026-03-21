'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { Globe } from 'lucide-react'

const navLinks = [
  { href: '/#applications', key: 'apps' },
  { href: '/devenir-partenaire', key: 'creators' },
  { href: '/a-propos', key: 'about' },
]

export function Footer() {
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold font-[family-name:var(--font-display)]">
                <span className="text-foreground">etudia</span>
                <span className="text-indigo-500">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 dark:text-white/40 max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white/80 mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white/80 mb-4 uppercase tracking-wider">
              {locale === 'fr' ? 'Légal' : 'Legal'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal/mentions-legales"
                  className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t('footer.legal')}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/confidentialite"
                  className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/conditions-generales"
                  className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-white/30">
            © {new Date().getFullYear()} Etudia. {t('footer.rights')}
          </p>
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{locale === 'fr' ? 'English' : 'Français'}</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
