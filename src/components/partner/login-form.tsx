'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Link } from '@/i18n/routing'
import { AlertCircle } from 'lucide-react'
import { useLocale } from 'next-intl'

export function LoginForm() {
  const t = useTranslations('partner.login')
  const locale = useLocale()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('partner', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(t('error'))
      } else if (result?.ok) {
        router.push('/partenaire/tableau-de-bord')
      }
    } catch (err) {
      setError(t('error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-zinc-400 text-sm mb-8">
              {t('subtitle')}
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label={t('email')}
                type="email"
                placeholder="vous@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />

              <Input
                label={t('password')}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? t('loading') : t('submit')}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <Link
                href="/partenaire/mot-de-passe-oublie"
                className="block text-center text-sm text-indigo-500 hover:text-indigo-400 transition-colors"
              >
                {t('forgotPassword')}
              </Link>

              <div className="text-center text-sm text-zinc-400">
                {t('noAccount')}{' '}
                <Link
                  href="/devenir-partenaire"
                  className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors"
                >
                  {t('becomePartner')}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
