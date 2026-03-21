'use client'

import { useEffect, useState } from 'react'
import { getApplications, acceptApplication, rejectApplication } from '@/lib/actions/admin-prisma'
import { Check, X } from 'lucide-react'

const mockApplications = [
  {
    id: '1',
    name: 'Marie Dupont',
    email: 'marie@youtube.com',
    platform: 'YouTube',
    profileUrl: 'https://youtube.com/@marie',
    followers: '15000',
    thematic: 'Éducation',
    message: 'Je suis passionnée par la formation en ligne',
    status: 'pending',
    createdAt: '2025-03-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas@tiktok.com',
    platform: 'TikTok',
    profileUrl: 'https://tiktok.com/@thomas',
    followers: '45000',
    thematic: 'Fitness',
    message: null,
    status: 'pending',
    createdAt: '2025-03-12T14:00:00Z',
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    email: 'sophie@instagram.com',
    platform: 'Instagram',
    profileUrl: 'https://instagram.com/sophie',
    followers: '8000',
    thematic: 'Nutrition',
    message: 'Hello!',
    status: 'accepted',
    createdAt: '2025-02-20T08:00:00Z',
  },
]

export default function CandidaturesPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [statusFilter, setStatusFilter] = useState('Toutes')
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedApp, setSelectedApp] = useState<(typeof mockApplications)[0] | null>(null)
  const [tempPassword, setTempPassword] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications({
          status: statusFilter === 'Toutes' ? undefined : statusFilter.toLowerCase(),
        })
        if (data.length > 0) {
          setApplications(data.map((a: any) => ({
            id: a.id,
            name: a.name,
            email: a.email,
            platform: a.platform,
            profileUrl: a.profileUrl,
            followers: a.followers,
            thematic: a.thematic,
            message: a.message || null,
            status: a.status,
            createdAt: a.createdAt.toISOString ? a.createdAt.toISOString() : String(a.createdAt),
          })))
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [statusFilter])

  const handleAccept = async () => {
    if (!selectedApp) return
    setProcessing(true)

    try {
      const result = await acceptApplication(selectedApp.id)
      setTempPassword(result.tempPassword)
      setReferralCode(result.referralCode)

      setApplications((prev) => prev.map((app) => (app.id === selectedApp.id ? { ...app, status: 'accepted' } : app)))

      setShowAcceptModal(false)
      setTimeout(() => setShowDetailModal(false), 3000)
    } catch (error) {
      console.error('Error accepting application:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedApp) return
    setProcessing(true)

    try {
      await rejectApplication(selectedApp.id, rejectReason)
      setApplications((prev) => prev.map((app) => (app.id === selectedApp.id ? { ...app, status: 'rejected' } : app)))

      setShowRejectModal(false)
      setShowDetailModal(false)
      setRejectReason('')
    } catch (error) {
      console.error('Error rejecting application:', error)
    } finally {
      setProcessing(false)
    }
  }

  const filtered = applications.filter((app) => {
    if (statusFilter === 'Toutes') return true
    return app.status === statusFilter.toLowerCase()
  })

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      accepted: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
    }
    return colors[status] || 'bg-zinc-600/20 text-zinc-400'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      accepted: 'Acceptée',
      rejected: 'Refusée',
    }
    return labels[status] || status
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Candidatures</h1>
        <p className="text-zinc-400">Gérez les candidatures de partenaires</p>
      </div>

      <div className="flex gap-2 border-b border-zinc-700">
        {['Toutes', 'En attente', 'Acceptées', 'Refusées'].map((status) => (
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
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Nom</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Plateforme</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Abonnés</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Thématique</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Statut</th>
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
                    <td colSpan={7} />
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-400">
                    Aucune candidature
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{app.name}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{app.email}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{app.platform}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{app.followers}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{app.thematic}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{formatDate(app.createdAt)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => {
                          setSelectedApp(app)
                          setShowDetailModal(true)
                        }}
                        className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                      >
                        Voir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedApp.name}</h2>
              <p className="text-sm text-zinc-400">{selectedApp.email}</p>
            </div>

            {tempPassword && referralCode ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                <p className="text-green-400 font-medium">Application acceptée!</p>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Code affilié:</p>
                  <p className="font-mono text-white bg-zinc-800 p-2 rounded">{referralCode}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Mot de passe temporaire:</p>
                  <p className="font-mono text-white bg-zinc-800 p-2 rounded">{tempPassword}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-400">Plateforme</p>
                    <p className="text-white font-medium">{selectedApp.platform}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Abonnés</p>
                    <p className="text-white font-medium">{selectedApp.followers}</p>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-400 text-sm mb-1">Profil</p>
                  <a href={selectedApp.profileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    {selectedApp.profileUrl}
                  </a>
                </div>

                <div>
                  <p className="text-zinc-400 text-sm mb-1">Thématique</p>
                  <p className="text-white">{selectedApp.thematic}</p>
                </div>

                {selectedApp.message && (
                  <div>
                    <p className="text-zinc-400 text-sm mb-1">Message</p>
                    <p className="text-white text-sm">{selectedApp.message}</p>
                  </div>
                )}

                {selectedApp.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowAcceptModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 font-medium transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Accepter
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Refuser
                    </button>
                  </div>
                )}
              </>
            )}

            <button onClick={() => setShowDetailModal(false)} className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
              Fermer
            </button>
          </div>
        </div>
      )}

      {showAcceptModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Confirmer l'acceptation</h2>
            <p className="text-zinc-400">Êtes-vous sûr de vouloir accepter {selectedApp.name}?</p>

            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                disabled={processing}
                className="flex-1 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 font-medium transition-colors"
              >
                {processing ? 'Traitement...' : 'Confirmer'}
              </button>
              <button onClick={() => setShowAcceptModal(false)} className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Refuser la candidature</h2>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Raison du refus (optionnel)"
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              rows={3}
            />

            <div className="flex gap-3">
              <button
                onClick={handleReject}
                disabled={processing}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 font-medium transition-colors"
              >
                {processing ? 'Traitement...' : 'Refuser'}
              </button>
              <button onClick={() => setShowRejectModal(false)} className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
