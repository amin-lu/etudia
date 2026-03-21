'use client'

import { useEffect, useState } from 'react'
import { getPayoutRequests, updatePayoutStatus } from '@/lib/actions/admin-prisma'

const mockPayouts = [
  {
    id: '1',
    partnerId: '1',
    partner: { name: 'Sophie Bernard' },
    amount: 125.8,
    status: 'pending',
    createdAt: '2025-03-15T00:00:00Z',
    paidAt: null,
  },
  {
    id: '2',
    partnerId: '2',
    partner: { name: 'Lucas Petit' },
    amount: 198.7,
    status: 'paid',
    createdAt: '2025-02-28T00:00:00Z',
    paidAt: '2025-03-05T00:00:00Z',
  },
]

export default function PaiementsPage() {
  const [payouts, setPayouts] = useState(mockPayouts)
  const [statusFilter, setStatusFilter] = useState('Tous')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const filter = statusFilter === 'Tous' ? undefined : statusFilter.toLowerCase()
        const data = await getPayoutRequests({ status: filter })
        if (data.length > 0) {
          setPayouts(data.map((p: any) => ({
            id: p.id,
            partnerId: p.partnerId,
            partner: { name: p.partner.name },
            amount: p.amount,
            status: p.status,
            createdAt: p.createdAt.toISOString ? p.createdAt.toISOString() : String(p.createdAt),
            paidAt: p.paidAt ? (p.paidAt.toISOString ? p.paidAt.toISOString() : String(p.paidAt)) : null,
          })))
        }
      } catch (error) {
        console.error('Error fetching payouts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPayouts()
  }, [statusFilter])

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdating(id)
    try {
      await updatePayoutStatus(id, newStatus)
      setPayouts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus, paidAt: newStatus === 'paid' ? new Date().toISOString() : p.paidAt } : p))
      )
    } catch (error) {
      console.error('Error updating payout status:', error)
    } finally {
      setUpdating(null)
    }
  }

  const filtered = payouts.filter((p) => {
    if (statusFilter === 'Tous') return true
    return p.status === statusFilter.toLowerCase()
  })

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      processing: 'bg-blue-500/20 text-blue-400',
      paid: 'bg-green-500/20 text-green-400',
    }
    return colors[status] || 'bg-zinc-600/20 text-zinc-400'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      processing: 'En cours',
      paid: 'Payé',
    }
    return labels[status] || status
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Paiements</h1>
        <p className="text-zinc-400">Gérez les demandes de paiement des partenaires</p>
      </div>

      <div className="flex gap-2 border-b border-zinc-700">
        {['Tous', 'En attente', 'En cours', 'Payés'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
              statusFilter === status
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Partenaire</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-zinc-400">Montant</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Date demande</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Statut</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Date paiement</th>
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
                    <td colSpan={5} />
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    Aucun paiement
                  </td>
                </tr>
              ) : (
                filtered.map((payout) => (
                  <tr key={payout.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{payout.partner.name}</td>
                    <td className="py-4 px-6 text-right text-white font-medium">{payout.amount.toFixed(2)}€</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{formatDate(payout.createdAt)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(payout.status)}`}>
                        {getStatusLabel(payout.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{payout.paidAt ? formatDate(payout.paidAt) : '-'}</td>
                    <td className="py-4 px-6">
                      {payout.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(payout.id, 'processing')}
                          disabled={updating === payout.id}
                          className="text-indigo-400 hover:text-indigo-300 font-medium text-sm disabled:opacity-50"
                        >
                          En traitement
                        </button>
                      )}
                      {payout.status === 'processing' && (
                        <button
                          onClick={() => handleUpdateStatus(payout.id, 'paid')}
                          disabled={updating === payout.id}
                          className="text-green-400 hover:text-green-300 font-medium text-sm disabled:opacity-50"
                        >
                          Payer
                        </button>
                      )}
                      {payout.status === 'paid' && <span className="text-zinc-400 text-sm">Payé</span>}
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
