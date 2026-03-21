'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const COOKIE_NAME = 'etudia_ref'
const COOKIE_DAYS = 30

interface ReferralTrackerProps {
  applicationSlug: string
  apiBaseUrl?: string
}

/**
 * ReferralTracker — Composant à intégrer dans chaque app SaaS du catalogue.
 *
 * Détecte le paramètre ?ref=CODE dans l'URL, enregistre un clic via l'API,
 * et stocke le referralCode dans un cookie de 30 jours.
 *
 * Usage:
 * ```tsx
 * <ReferralTracker applicationSlug="etudiet" />
 * ```
 *
 * Pour enregistrer une inscription (côté serveur de l'app SaaS) :
 * ```ts
 * const ref = getCookie('etudia_ref')
 * if (ref) {
 *   await fetch('https://etudia.vercel.app/api/track/referral', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ referralCode: ref, applicationSlug: 'etudiet', userId: user.id })
 *   })
 * }
 * ```
 */
export function ReferralTracker({ applicationSlug, apiBaseUrl = '' }: ReferralTrackerProps) {
  const searchParams = useSearchParams()
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return

    const refCode = searchParams.get('ref')
    if (!refCode) return

    tracked.current = true

    // Store referral code in cookie (30 days)
    setCookie(COOKIE_NAME, refCode, COOKIE_DAYS)

    // Track the click via API
    trackClick(refCode, applicationSlug, apiBaseUrl).catch(() => {
      // Silent fail — don't break UX if tracking fails
    })
  }, [searchParams, applicationSlug, apiBaseUrl])

  // This component renders nothing
  return null
}

/**
 * Set a cookie with expiration in days
 */
function setCookie(name: string, value: string, days: number): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

/**
 * Get a cookie value by name
 */
export function getReferralCode(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

/**
 * Track a click on an affiliate link
 */
async function trackClick(referralCode: string, applicationSlug: string, apiBaseUrl: string): Promise<void> {
  await fetch(`${apiBaseUrl}/api/track/click`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ referralCode, applicationSlug }),
  })
}

/**
 * Track a referral (user signup via affiliate link).
 * Call this from your app's signup flow.
 */
export async function trackReferral(
  applicationSlug: string,
  userId: string,
  apiBaseUrl = ''
): Promise<boolean> {
  const refCode = getReferralCode()
  if (!refCode) return false

  try {
    const res = await fetch(`${apiBaseUrl}/api/track/referral`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referralCode: refCode,
        applicationSlug,
        userId,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
