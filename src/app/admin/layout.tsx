import { Inter, Instrument_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { createClient } from '@/lib/supabase/server'
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
  let user = null
  let isAdmin = false

  try {
    const supabase = await createClient()
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (user) {
      const { data } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', user.id)
        .single()

      isAdmin = data?.role === 'admin'
    }
  } catch {
    // Auth not available
  }

  if (user && !isAdmin) {
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
          {!user ? (
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
