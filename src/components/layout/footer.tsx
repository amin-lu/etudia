'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { Youtube, Linkedin, Twitter, Globe } from 'lucide-react'

const navLinks = [
  { href: '/catalogue', key: 'catalogue' },
  { href: '/devenir-partenaire', key: 'creators' },
  { href: '/soumettre-idee', key: 'ideas' },
  { href: '/a-propos', key: 'about' },
]

const resourceLinks = [
  { href: '/comment-ca-marche', key: 'howItWorks' },
]

const socialLinks = [
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com', icon: Twitter, label: 'X (Twitter)' },
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
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold font-[family-name:var(--font-display)]">
                <span className="text-foreground">etudia</span>
                <span className="text-indigo-500">.</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
              {t('footer.tagline')}
            </p>
            {/* Social links */}
            <div className="mt-4 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mb-3">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mb-3">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mb-3">
              {locale === 'fr' ? 'Légal' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 cursor-default">
                  {locale === 'fr' ? 'Conditions générales' : 'Terms of Service'}
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 cursor-default">
                  {locale === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 cursor-default">
                  {locale === 'fr' ? 'Mentions légales' : 'Legal Notice'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Etudia. {t('footer.rights')}
          </p>
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
