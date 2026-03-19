import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/partner/forgot-password-form'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const translations = await import(`@/messages/${locale}.json`)
  const t = translations.default

  return {
    title: `${t.partner?.forgotPassword?.title} — Etudia`,
    description: t.partner?.forgotPassword?.subtitle,
  }
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
