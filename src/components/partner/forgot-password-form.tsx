'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Link } from '@/i18n/routing'
import { CheckCircle } from 'lucide-react'

export function ForgotPasswordForm() {
  const t = useTranslations('partner.forgotPassword')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement password reset email sending with Resend
    // For now, just show success UI
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
    }, 500)
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

            {submitted ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-500">{t('success')}</p>
                </div>

                <Link
                  href="/partenaire/connexion"
                  className="block"
                >
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {t('backToLogin')}
                  </Button>
                </Link>
              </div>
            ) : (
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

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full"
                >
                  {t('submit')}
                </Button>

                <Link
                  href="/partenaire/connexion"
                  className="block text-center text-sm text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  {t('backToLogin')}
                </Link>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
