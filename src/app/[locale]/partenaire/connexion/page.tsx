import type { Metadata } from 'next'
import { LoginForm } from '@/components/partner/login-form'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const translations = await import(`@/messages/${locale}.json`)
  const t = translations.default

  return {
    title: `${t.partner?.login?.title} — Etudia`,
    description: t.partner?.login?.subtitle,
  }
}

export default function PartnerLoginPage() {
  return <LoginForm />
}
