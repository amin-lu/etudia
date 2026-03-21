import { PartnerSidebar } from "@/components/partner/partner-sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "@/i18n/routing"

interface PartnerLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function PartnerLayout({
  children,
  params,
}: PartnerLayoutProps) {
  const session = await auth()
  const { locale } = await params

  // Redirect to login if not authenticated
  if (!session || session.user.role !== "partner") {
    redirect({
      href: "/partenaire/connexion",
      locale,
    })
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <PartnerSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black">
          {children}
        </div>
      </main>
    </div>
  )
}
