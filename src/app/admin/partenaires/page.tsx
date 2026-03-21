'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPartners, togglePartnerStatus } from '@/lib/actions/admin-prisma'
import { Search } from 'lucide-react'

const mockPartners = [
  {
    id: '1',
    name: 'Sophie Bernard',
    email: 'sophie@instagram.com',
    platform: 'Instagram',
    followers: 8000,
    referralCode: 'SPH123',
    commissionRate: 0.4,
    status: 'active',
    totalReferrals: 23,
    totalCommissions: 245.6,
    createdAt: '2025-02-20',
  },
  {
    id: '2',
    name: 'Lucas Petit',
    email: 'lucas@youtube.com',
    platform: 'YouTube',
    followers: 25000,
    referralCode: 'LUC456',
    commissionRate: 0.45,
    status: 'active',
    totalReferrals: 18,
    totalCommissions: 198.7,
    createdAt: '2025-01-15',
  },
]

export default function PartenairesPage() {
  const [partners, setPartners] = useState(mockPartners)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getPartners({ search: search || undefined })
        if (data.length > 0) {
          setPartners(data.map((p: any) => ({
            id: p.id,
            name: p.name,
            email: p.email,
            platform: p.platform,
            followers: p.followers,
            referralCode: p.referralCode,
            commissionRate: p.commissionRate,
            status: p.status,
            totalReferrals: p.totalReferrals || 0,
            totalCommissions: p.totalCommissions || 0,
            createdAt: p.createdAt.toISOString ? p.createdAt.toISOString() : String(p.createdAt),
          })))
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchPartners()
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const handleToggleStatus = async (id: string) => {
    setUpdating(id)
    try {
      const newStatus = await togglePartnerStatus(id)
      setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    } catch (error) {
      console.error('Error toggling partner status:', error)
    } finally {
      setUpdating(null)
    }
  }

  const filtered = partners.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Partenaires</h1>
        <p className="text-zinc-400">Gérez vos partenaires affiliés</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Nom</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Plateforme</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Abonnés</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Code affilié</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-zinc-400">Commission</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Statut</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-zinc-400">Inscriptions</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-zinc-400">Commissions</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="h-4 bg-zinc-800 rounded w-32 animate-pulse" />
                    </td>
                    <td colSpan={9} />
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-zinc-400">
                    Aucun partenaire
                  </td>
                </tr>
              ) : (
                filtered.map((partner) => (
                  <tr key={partner.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{partner.name}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{partner.email}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{partner.platform}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{partner.followers.toLocaleString()}</td>
                    <td className="py-4 px-6 text-white font-mono text-sm">{partner.referralCode}</td>
                    <td className="py-4 px-6 text-right text-white">{(partner.commissionRate * 100).toFixed(0)}%</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          partner.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {partner.status === 'active' ? 'Actif' : 'Suspendu'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-white">{partner.totalReferrals}</td>
                    <td className="py-4 px-6 text-right text-white">{partner.totalCommissions.toFixed(2)}€</td>
                    <td className="py-4 px-6 space-y-2">
                      <Link
                        href={`/admin/partenaires/${partner.id}`}
                        className="block text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                      >
                        Détail
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(partner.id)}
                        disabled={updating === partner.id}
                        className="text-xs text-zinc-400 hover:text-zinc-300 disabled:opacity-50"
                      >
                        {partner.status === 'active' ? 'Suspendre' : 'Réactiver'}
                      </button>
                    </td>
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
