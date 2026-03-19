import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: 'partner' | 'admin'
    referralCode?: string
  }

  interface Session {
    user: {
      id: string
      role: 'partner' | 'admin'
      referralCode?: string
    } & DefaultSession['user']
  }
}
