'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const mockStats = {
  pendingApplications: 0,
  newIdeas7d: 0,
  activeSaas: 0,
  totalMrr: 0,
}

export default function AdminOverview() {
  const [stats, setStats] = useState(mockStats)
  const [applications, setApplications] = useState<any[]>([])
  const [ideas, setIdeas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()

        const [appResponse, ideasResponse, saasResponse, metricsResponse] = await Promise.all([
          supabase
            .from('creator_applications')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5),
          supabase
            .from('saas_ideas')
            .select('*')
            .order('votes_count', { ascending: false })
            .limit(5),
          supabase.from('saas_products').select('id').eq('status', 'live'),
          supabase.from('metrics_snapshots').select('*').order('date', { ascending: false }).limit(1),
        ])

        if (appResponse.data) {
          setApplications(appResponse.data)
          setStats((prev) => ({
            ...prev,
            pendingApplications: appResponse.data.filter((a: any) => a.status === 'pending').length,
          }))
        }

        if (ideasResponse.data) {
          setIdeas(ideasResponse.data)
        }

        if (saasResponse.data) {
          setStats((prev) => ({
            ...prev,
            activeSaas: saasResponse.data.length,
          }))
        }

        if (metricsResponse.data && metricsResponse.data.length > 0) {
          setStats((prev) => ({
            ...prev,
            totalMrr: metricsResponse.data[0].total_mrr,
          }))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      contacted: 'bg-blue-500/20 text-blue-400',
      accepted: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
      submitted: 'bg-zinc-600/20 text-zinc-400',
      evaluating: 'bg-yellow-500/20 text-yellow-400',
      built: 'bg-green-500/20 text-green-400',
    }
    return colors[status] || 'bg-zinc-600/20 text-zinc-400'
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Vue d'ensemble</h1>
        <p className="text-zinc-400">Bienvenue sur votre tableau de bord admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Candidatures en attente" value={stats.pendingApplications} loading={loading} />
        <StatCard label="Nouvelles idées (7j)" value={stats.newIdeas7d} loading={loading} />
        <StatCard label="SaaS actifs" value={stats.activeSaas} loading={loading} />
        <StatCard label="MRR total" value={stats.totalMrr} loading={loading} isCurrency />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Link href="/admin/createurs">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-lg font-semibold text-white mb-4">Dernières candidatures</h2>
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-800 rounded-lg animate-pulse" />
                ))
              ) : applications.length === 0 ? (
                <p className="text-zinc-400 text-sm">Aucune candidature</p>
              ) : (
                applications.slice(0, 5).map((app: any) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{app.name}</p>
                      <p className="text-sm text-zinc-400">
                        {app.platform} • {formatDate(app.created_at)}
                      </p>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${getStatusBadgeColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </Link>

        {/* Top Ideas */}
        <Link href="/admin/idees">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors cursor-pointer">
            <h2 className="text-lg font-semibold text-white mb-4">Idées les plus votées</h2>
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-800 rounded-lg animate-pulse" />
                ))
              ) : ideas.length === 0 ? (
                <p className="text-zinc-400 text-sm">Aucune idée</p>
              ) : (
                ideas.slice(0, 5).map((idea: any) => (
                  <div key={idea.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{idea.name}</p>
                      <p className="text-sm text-zinc-400">{idea.niche}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-indigo-500/20 text-indigo-400 whitespace-nowrap">
                        {idea.votes_count} votes
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusBadgeColor(idea.status)}`}>
                        {idea.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  loading,
  isCurrency = false,
}: {
  label: string
  value: number
  loading: boolean
  isCurrency?: boolean
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="space-y-2">
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-3xl font-bold text-white">
          {loading ? '-' : isCurrency ? `${value.toFixed(2)}€` : value}
        </p>
      </div>
    </div>
  )
}
