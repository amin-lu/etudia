import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { type NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /catalogue (with or without locale prefix) to homepage
  if (
    pathname === '/catalogue' ||
    pathname === '/fr/catalogue' ||
    pathname === '/en/catalogue'
  ) {
    const locale = pathname.startsWith('/en') ? 'en' : 'fr'
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`
    url.hash = 'applications'
    return NextResponse.redirect(url, 301)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
}
