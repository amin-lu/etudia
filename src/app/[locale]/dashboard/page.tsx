import type { Metadata } from 'next'
import { getTranslations } from "next-intl/server"
import { createClient } from "@/lib/supabase/server"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { MRRChart } from "@/components/dashboard/mrr-chart"
import { NicheChart } from "@/components/dashboard/niche-chart"
import { MetricsSnapshot } from "@/lib/supabase/types"

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Nos chiffres — Etudia' : 'Our Numbers — Etudia',
    description: locale === 'fr' ? 'Dashboard public avec tous nos chiffres en toute transparence.' : 'Public dashboard with all our numbers in full transparency.',
    openGraph: { images: ['/og-image.png'] },
  }
}

const mockMRRData = [
  { month: "M-2", mrr: 0 },
  { month: "M-1", mrr: 0 },
  { month: "Now", mrr: 0 },
]

const mockNicheData = [
  { name: "Éducation", value: 2 },
  { name: "Fitness", value: 1 },
]

async function getDashboardMetrics(): Promise<{
  totalMrr: number
  totalSaas: number
  totalCreators: number
  totalRedistributed: number
  totalUsers: number
}> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("metrics_snapshots")
      .select("*")
      .order("date", { ascending: false })
      .limit(1)

    if (data && data.length > 0) {
      const snapshot = data[0] as MetricsSnapshot
      return {
        totalMrr: snapshot.total_mrr,
        totalSaas: snapshot.total_saas_count,
        totalCreators: snapshot.total_creators,
        totalRedistributed: snapshot.total_redistributed,
        totalUsers: snapshot.total_users || 0,
      }
    }
  } catch {
    // Fall back to mock data
  }

  return {
    totalMrr: 0,
    totalSaas: 2,
    totalCreators: 0,
    totalRedistributed: 0,
    totalUsers: 0,
  }
}

export default async function DashboardPage() {
  const t = await getTranslations("dashboard")
  const metrics = await getDashboardMetrics()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-4">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Metrics Cards Section */}
      <section className="py-20 md:py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MetricsCards
            totalMrr={metrics.totalMrr}
            totalSaas={metrics.totalSaas}
            totalCreators={metrics.totalCreators}
            totalRedistributed={metrics.totalRedistributed}
            totalUsers={metrics.totalUsers}
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <MRRChart data={mockMRRData} />
            <NicheChart data={mockNicheData} />
          </div>
        </div>
      </section>
    </div>
  )
}
