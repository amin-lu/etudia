'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPartnerById, updatePartnerCommission, togglePartnerStatus } from '@/lib/actions/admin-prisma'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function PartnerDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [partner, setPartner] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editingCommission, setEditingCommission] = useState(false)
  const [commissionValue, setCommissionValue] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const data = await getPartnerById(id)
        const normalized = {
          ...data,
          createdAt: data.createdAt && typeof data.createdAt === 'object'
            ? (data.createdAt as any).toISOString?.() || String(data.createdAt)
            : String(data.createdAt),
          referrals: (data.referrals || []).map((r: any) => ({
            ...r,
            createdAt: r.createdAt && typeof r.createdAt === 'object'
              ? (r.createdAt as any).toISOString?.() || String(r.createdAt)
              : String(r.createdAt),
          })),
        }
        setPartner(normalized)
        setCommissionValue(data.commissionRate)
      } catch (error) {
        console.error('Error fetching partner:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartner()
  }, [id])

  const handleSaveCommission = async () => {
    setSaving(true)
    try {
      await updatePartnerCommission(id, commissionValue)
      setPartner((prev: any) => ({ ...prev, commissionRate: commissionValue }))
      setEditingCommission(false)
    } catch (error) {
      console.error('Error updating commission:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async () => {
    try {
      const newStatus = await togglePartnerStatus(id)
      setPartner((prev: any) => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-zinc-800 rounded w-32 animate-pulse" />
        <div className="h-64 bg-zinc-800 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!partner) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Partenaire non trouvé</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/partenaires" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
        <ChevronLeft className="w-4 h-4" />
        Retour
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{partner.name}</h1>
        <p className="text-zinc-400">{partner.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Informations</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-400">Plateforme</p>
              <p className="text-white font-medium">{partner.platform}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Abonnés</p>
              <p className="text-white font-medium">{partner.followers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Thématique</p>
              <p className="text-white font-medium">{partner.thematic}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Code affilié</p>
              <p className="text-white font-mono font-medium">{partner.referralCode}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Statut</p>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    partner.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {partner.status === 'active' ? 'Actif' : 'Suspendu'}
                </span>
                <button
                  onClick={handleToggleStatus}
                  className="text-xs text-zinc-400 hover:text-zinc-300"
                >
                  {partner.status === 'active' ? 'Suspendre' : 'Réactiver'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Commission</h2>
          <div className="space-y-4">
            {editingCommission ? (
              <>
                <div>
                  <label className="text-sm text-zinc-400">Taux de commission (%)</label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    step="1"
                    value={commissionValue * 100}
                    onChange={(e) => setCommissionValue(parseInt(e.target.value) / 100)}
                    className="w-full mt-2"
                  />
                  <p className="text-white font-medium mt-2">{(commissionValue * 100).toFixed(0)}%</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveCommission}
                    disabled={saving}
                    className="flex-1 px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 font-medium"
                  >
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommission(false)
                      setCommissionValue(partner.commissionRate)
                    }}
                    className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 font-medium"
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-zinc-400">Taux actuel</p>
                  <p className="text-3xl font-bold text-white">{(partner.commissionRate * 100).toFixed(0)}%</p>
                </div>
                <button
                  onClick={() => setEditingCommission(true)}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 font-medium"
                >
                  Modifier
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
          <p className="text-sm text-zinc-400 mb-2">Inscriptions</p>
          <p className="text-3xl font-bold text-white">{partner.totalReferrals}</p>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
          <p className="text-sm text-zinc-400 mb-2">Commissions générées</p>
          <p className="text-3xl font-bold text-white">{partner.totalCommissions.toFixed(2)}€</p>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
          <p className="text-sm text-zinc-400 mb-2">Partenaire depuis</p>
          <p className="text-lg font-bold text-white">
            {new Date(partner.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Historique des inscriptions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Application</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Statut</th>
              </tr>
            </thead>
            <tbody>
              {partner.referrals && partner.referrals.length > 0 ? (
                partner.referrals.map((referral: any) => (
                  <tr key={referral.id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                    <td className="py-3 px-4 text-white">{referral.application.name}</td>
                    <td className="py-3 px-4 text-zinc-300 text-sm">
                      {new Date(referral.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          referral.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {referral.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-zinc-400">
                    Aucune inscription
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
