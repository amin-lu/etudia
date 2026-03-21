import { auth } from "@/lib/auth"
import { DashboardOverview } from "@/components/partner/dashboard-overview"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <DashboardOverview
      name={session.user.name || "Ambassadeur"}
      referralCode={session.user.referralCode || ""}
    />
  )
}
