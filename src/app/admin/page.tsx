'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAdminDashboardStats, getTopPartners } from '@/lib/actions/admin-prisma'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockStats = {
  activePartners: 3,
  totalReferrals: 47,
  totalCommissions: 458.30,
  currentMrr: 125.80,
}

const mockMrrData = [
  { month: 'Sept', mrr: 45 },
  { month: 'Oct', mrr: 62 },
  { month: 'Nov', mrr: 78 },
  { month: 'Déc', mrr: 98 },
  { month: 'Jan', mrr: 112 },
  { month: 'Fév', mrr: 125.80 },
]

const mockTopPartners = [
  { name: 'Sophie Bernard', totalReferrals: 23, totalCommissions: 245.60 },
  { name: 'Lucas Petit', totalReferrals: 18, totalCommissions: 198.70 },
  { name: 'Marie Dupont', totalReferrals: 6, totalCommissions: 14.00 },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats)
  const [topPartners, setTopPartners] = useState(mockTopPartners)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, partnersData] = await Promise.all([
          getAdminDashboardStats(),
          getTopPartners(5),
        ])

        setStats(statsData)
        setTopPartners(
          partnersData.map((p: any) => ({
            name: p.name,
            totalReferrals: p.totalReferrals,
            totalCommissions: p.totalCommissions,
          }))
        )
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      accepted: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
      active: 'bg-green-500/20 text-green-400',
      suspended: 'bg-red-500/20 text-red-400',
    }
    return colors[status] || 'bg-zinc-600/20 text-zinc-400'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Tableau de bord</h1>
        <p className="text-zinc-400">Vue d'ensemble de votre activité d'affiliation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Partenaires actifs" value={stats.activePartners} loading={loading} />
        <StatCard label="Inscriptions via affiliation" value={stats.totalReferrals} loading={loading} />
        <StatCard label="Commissions générées" value={stats.totalCommissions} loading={loading} isCurrency />
        <StatCard label="MRR actuel" value={stats.currentMrr} loading={loading} isCurrency />
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Évolution MRR (6 mois)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMrrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '0.75rem' }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Line type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Top 5 partenaires du mois</h2>
          <Link href="/admin/partenaires" className="text-sm text-indigo-400 hover:text-indigo-300">
            Voir tous →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Nom</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-zinc-400">Inscriptions</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-zinc-400">Commissions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="py-4 px-4">
                      <div className="h-4 bg-zinc-800 rounded w-32 animate-pulse" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-zinc-800 rounded w-16 animate-pulse" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-zinc-800 rounded w-24 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : topPartners.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-zinc-400">
                    Aucun partenaire
                  </td>
                </tr>
              ) : (
                topPartners.map((partner, idx) => (
                  <tr key={idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{partner.name}</td>
                    <td className="py-4 px-4 text-right text-white">{partner.totalReferrals}</td>
                    <td className="py-4 px-4 text-right text-white">{partner.totalCommissions.toFixed(2)}€</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
    <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
      <div className="space-y-2">
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-3xl font-bold text-white">
          {loading ? '-' : isCurrency ? `${value.toFixed(2)}€` : value}
        </p>
      </div>
    </div>
  )
}
