import { Inter, Instrument_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminLogin } from '@/components/admin/admin-login'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Admin - Etudia',
  description: 'Admin Dashboard',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session && session.user?.role !== 'admin') {
    redirect('/')
  }

  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${instrumentSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-950 text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {!session ? (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
              <AdminLogin />
            </div>
          ) : (
            <div className="flex min-h-screen">
              <AdminSidebar />
              <main className="flex-1 overflow-auto bg-zinc-950">
                <div className="p-6 lg:p-8">{children}</div>
              </main>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
