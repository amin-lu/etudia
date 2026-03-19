'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DataTable } from '@/components/admin/data-table'
import { updateCreatorStatus, updateCreatorNotes } from '@/lib/actions/admin'
import { Eye, Download, X } from 'lucide-react'

interface Creator {
  id: string
  name: string
  email: string
  platform: string
  profile_url: string
  followers_count: number
  niche: string
  message: string
  status: 'pending' | 'contacted' | 'accepted' | 'rejected'
  admin_notes: string
  created_at: string
}

const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    email: 'marie@example.com',
    platform: 'youtube',
    profile_url: 'https://youtube.com/@marie',
    followers_count: 15000,
    niche: 'Éducation',
    message: 'Je suis passionnée...',
    status: 'pending',
    admin_notes: '',
    created_at: '2025-03-10',
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas@example.com',
    platform: 'tiktok',
    profile_url: 'https://tiktok.com/@thomas',
    followers_count: 45000,
    niche: 'Fitness',
    message: '',
    status: 'pending',
    admin_notes: '',
    created_at: '2025-03-12',
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie@example.com',
    platform: 'instagram',
    profile_url: 'https://instagram.com/sophie',
    followers_count: 8000,
    niche: 'Nutrition',
    message: 'Intéressée par ETUDIET',
    status: 'contacted',
    admin_notes: 'Profil intéressant',
    created_at: '2025-03-05',
  },
]

const platformColors: Record<string, { bg: string; text: string }> = {
  youtube: { bg: 'bg-red-500/20', text: 'text-red-400' },
  tiktok: { bg: 'bg-black/20', text: 'text-white' },
  instagram: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
  twitter: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  twitch: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  contacted: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  accepted: { bg: 'bg-green-500/20', text: 'text-green-400' },
  rejected: { bg: 'bg-red-500/20', text: 'text-red-400' },
}

export default function CreateursPage() {
  const [items, setItems] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [editingNotes, setEditingNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('creator_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || mockCreators)
    } catch {
      setItems(mockCreators)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (creator: Creator) => {
    setSelectedCreator(creator)
    setEditingNotes(creator.admin_notes)
    setShowDetailModal(true)
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const result = await updateCreatorStatus(id, newStatus)
      if (result.success) {
        alert('Statut mis à jour')
        fetchItems()
      } else {
        alert(`Erreur: ${result.error}`)
      }
    } catch (error) {
      alert(`Erreur: ${error}`)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedCreator) return

    try {
      setSavingNotes(true)
      const result = await updateCreatorNotes(selectedCreator.id, editingNotes)
      if (result.success) {
        alert('Notes sauvegardées')
        fetchItems()
        handleCloseModal()
      } else {
        alert(`Erreur: ${result.error}`)
      }
    } catch (error) {
      alert(`Erreur: ${error}`)
    } finally {
      setSavingNotes(false)
    }
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedCreator(null)
    setEditingNotes('')
  }

  const exportCSV = () => {
    const headers = ['Nom', 'Email', 'Plateforme', 'Abonnés', 'Niche', 'Statut', 'Date']
    const rows = items.map((d) => [
      d.name,
      d.email,
      d.platform,
      d.followers_count,
      d.niche,
      d.status,
      d.created_at,
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'candidatures.csv')
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Créateurs</h1>
          <p className="text-zinc-400 mt-1">Gérer les candidatures de créateurs</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-colors"
        >
          <Download className="w-4 h-4" />
          Exporter CSV
        </button>
      </div>

      <DataTable
        columns={[
          {
            key: 'name',
            label: 'Nom',
            sortable: true,
          },
          {
            key: 'email',
            label: 'Email',
            sortable: true,
          },
          {
            key: 'platform',
            label: 'Plateforme',
            sortable: true,
            render: (val): React.ReactNode => {
              const colors = platformColors[String(val)] || { bg: 'bg-zinc-700/20', text: 'text-zinc-400' }
              return (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {String(val)}
                </span>
              )
            },
          },
          {
            key: 'followers_count',
            label: 'Abonnés',
            sortable: true,
          },
          {
            key: 'niche',
            label: 'Niche',
            sortable: true,
          },
          {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (val): React.ReactNode => {
              const colors = statusColors[String(val)]
              const labels: Record<string, string> = {
                pending: 'En attente',
                contacted: 'Contacté',
                accepted: 'Accepté',
                rejected: 'Rejeté',
              }
              return (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {labels[String(val)] || String(val)}
                </span>
              )
            },
          },
          {
            key: 'created_at',
            label: 'Date',
            sortable: true,
          },
        ]}
        data={items as any}
        loading={loading}
        searchable
        searchKeys={['name', 'email', 'niche']}
        searchPlaceholder="Rechercher..."
        filters={[
          {
            key: 'status',
            label: 'Statut',
            options: [
              { value: '', label: 'Tous' },
              { value: 'pending', label: 'En attente' },
              { value: 'contacted', label: 'Contacté' },
              { value: 'accepted', label: 'Accepté' },
              { value: 'rejected', label: 'Rejeté' },
            ],
          },
          {
            key: 'platform',
            label: 'Plateforme',
            options: [
              { value: '', label: 'Tous' },
              { value: 'youtube', label: 'YouTube' },
              { value: 'tiktok', label: 'TikTok' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'twitter', label: 'Twitter' },
              { value: 'twitch', label: 'Twitch' },
            ],
          },
        ]}
        pageSize={10}
        actions={(row): React.ReactNode => (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewDetails(row as unknown as Creator)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Voir détails"
            >
              <Eye className="w-4 h-4" />
            </button>
            <select
              value={(row as unknown as Creator).status}
              onChange={(e) => handleStatusChange((row as unknown as Creator).id, e.target.value)}
              className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
            >
              <option value="pending">En attente</option>
              <option value="contacted">Contacté</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        )}
      />

      {/* Detail Modal */}
      {showDetailModal && selectedCreator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-700">
              <h2 className="text-xl font-bold">{selectedCreator.name}</h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Nom</label>
                  <p className="text-white">{selectedCreator.name}</p>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Email</label>
                  <a href={`mailto:${selectedCreator.email}`} className="text-indigo-400 hover:underline">
                    {selectedCreator.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Plateforme</label>
                  <p className="text-white">{selectedCreator.platform}</p>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Abonnés</label>
                  <p className="text-white">{selectedCreator.followers_count.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Niche</label>
                  <p className="text-white">{selectedCreator.niche}</p>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Statut</label>
                  <div className="flex gap-2">
                    <select
                      value={selectedCreator.status}
                      onChange={(e) => {
                        setSelectedCreator({ ...selectedCreator, status: e.target.value as any })
                        handleStatusChange(selectedCreator.id, e.target.value)
                      }}
                      className="px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="pending">En attente</option>
                      <option value="contacted">Contacté</option>
                      <option value="accepted">Accepté</option>
                      <option value="rejected">Rejeté</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase mb-1">Profil</label>
                <a href={selectedCreator.profile_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline break-all">
                  {selectedCreator.profile_url}
                </a>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase mb-1">Message</label>
                <p className="text-zinc-300">{selectedCreator.message || '(Aucun message)'}</p>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase mb-1">Date</label>
                <p className="text-zinc-300">{selectedCreator.created_at}</p>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase mb-2">Notes admin</label>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  rows={4}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  {savingNotes ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
