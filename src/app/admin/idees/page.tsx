'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DataTable } from '@/components/admin/data-table'
import { updateIdeaStatus, updateIdeaNotes, deleteIdea } from '@/lib/actions/admin'
import { Eye, Trash2, X } from 'lucide-react'

interface Idea {
  id: string
  name: string
  niche: string
  problem: string
  target_audience: string
  has_audience: boolean
  audience_details?: string
  suggested_price: number
  submitter_email: string
  votes_count: number
  status: 'submitted' | 'evaluating' | 'accepted' | 'rejected' | 'building'
  admin_notes: string
  created_at: string
}

const mockIdeas: Idea[] = [
  {
    id: '1',
    name: 'PrepaConcours',
    niche: 'Éducation',
    problem: 'La préparation aux concours...',
    target_audience: 'Candidats concours',
    has_audience: true,
    audience_details: '',
    suggested_price: 19.9,
    submitter_email: 'demo@etudia.com',
    votes_count: 65,
    status: 'evaluating',
    admin_notes: '',
    created_at: '2025-03-01',
  },
  {
    id: '2',
    name: 'JuriQuiz',
    niche: 'Droit',
    problem: 'Les étudiants en droit...',
    target_audience: 'Étudiants L1-M2',
    has_audience: false,
    suggested_price: 14.9,
    submitter_email: 'demo@etudia.com',
    votes_count: 47,
    status: 'evaluating',
    admin_notes: '',
    created_at: '2025-03-03',
  },
  {
    id: '3',
    name: 'GreenThumb',
    niche: 'Jardinage',
    problem: 'Savoir quoi planter...',
    target_audience: 'Jardiniers amateurs',
    has_audience: false,
    suggested_price: 6.9,
    submitter_email: 'demo@etudia.com',
    votes_count: 31,
    status: 'submitted',
    admin_notes: '',
    created_at: '2025-03-05',
  },
  {
    id: '4',
    name: 'BricoHelper',
    niche: 'Bricolage',
    problem: 'Les débutants en bricolage...',
    target_audience: 'Propriétaires bricoleurs',
    has_audience: true,
    suggested_price: 7.9,
    submitter_email: 'demo@etudia.com',
    votes_count: 23,
    status: 'submitted',
    admin_notes: '',
    created_at: '2025-03-08',
  },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  submitted: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  evaluating: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  accepted: { bg: 'bg-green-500/20', text: 'text-green-400' },
  rejected: { bg: 'bg-red-500/20', text: 'text-red-400' },
  building: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
}

export default function IdeasPage() {
  const [items, setItems] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
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
        .from('saas_ideas')
        .select('*')
        .order('votes_count', { ascending: false })

      if (error) throw error
      setItems(data || mockIdeas)
    } catch {
      setItems(mockIdeas)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (idea: Idea) => {
    setSelectedIdea(idea)
    setEditingNotes(idea.admin_notes)
    setShowDetailModal(true)
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const result = await updateIdeaStatus(id, newStatus)
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
    if (!selectedIdea) return

    try {
      setSavingNotes(true)
      const result = await updateIdeaNotes(selectedIdea.id, editingNotes)
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
    setSelectedIdea(null)
    setEditingNotes('')
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteIdea(id)
      if (result.success) {
        alert('Idée supprimée')
        setShowDeleteConfirm(null)
        fetchItems()
      } else {
        alert(`Erreur: ${result.error}`)
      }
    } catch (error) {
      alert(`Erreur: ${error}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Idées SaaS</h1>
        <p className="text-zinc-400 mt-1">Gérer les idées et suggestions</p>
      </div>

      <DataTable
        columns={[
          {
            key: 'name',
            label: 'Nom',
            sortable: true,
          },
          {
            key: 'niche',
            label: 'Niche',
            sortable: true,
            render: (val): React.ReactNode => (
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-700/20 text-zinc-400">
                {String(val)}
              </span>
            ),
          },
          {
            key: 'votes_count',
            label: 'Votes',
            sortable: true,
            render: (val): React.ReactNode => <span className="font-bold">{val}</span>,
          },
          {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (val): React.ReactNode => {
              const colors = statusColors[String(val)]
              const labels: Record<string, string> = {
                submitted: 'Soumise',
                evaluating: 'En évaluation',
                accepted: 'Acceptée',
                rejected: 'Rejetée',
                building: 'Construite',
              }
              return (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {labels[String(val)] || String(val)}
                </span>
              )
            },
          },
          {
            key: 'has_audience',
            label: 'A une audience',
            sortable: true,
            render: (val): React.ReactNode => (val ? 'Oui' : 'Non'),
          },
          {
            key: 'suggested_price',
            label: 'Prix suggéré',
            sortable: true,
            render: (val): React.ReactNode => `${val}€`,
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
        searchKeys={['name', 'niche']}
        searchPlaceholder="Rechercher..."
        filters={[
          {
            key: 'status',
            label: 'Statut',
            options: [
              { value: '', label: 'Tous' },
              { value: 'submitted', label: 'Soumise' },
              { value: 'evaluating', label: 'En évaluation' },
              { value: 'accepted', label: 'Acceptée' },
              { value: 'rejected', label: 'Rejetée' },
              { value: 'building', label: 'Construite' },
            ],
          },
        ]}
        pageSize={10}
        actions={(row): React.ReactNode => (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewDetails(row as unknown as Idea)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Voir détails"
            >
              <Eye className="w-4 h-4" />
            </button>
            <select
              value={(row as unknown as Idea).status}
              onChange={(e) => { handleStatusChange((row as unknown as Idea).id, e.target.value) }}
              className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
            >
              <option value="submitted">Soumise</option>
              <option value="evaluating">En évaluation</option>
              <option value="accepted">Acceptée</option>
              <option value="rejected">Rejetée</option>
              <option value="building">Construite</option>
            </select>
            <button
              onClick={() => setShowDeleteConfirm((row as unknown as Idea).id)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-red-400 transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Detail Modal */}
      {showDetailModal && selectedIdea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-700">
              <h2 className="text-xl font-bold">{selectedIdea.name}</h2>
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
                  <p className="text-white">{selectedIdea.name}</p>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Niche</label>
                  <p className="text-white">{selectedIdea.niche}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Votes</label>
                  <p className="text-white font-bold">{selectedIdea.votes_count}</p>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Prix suggéré</label>
                  <p className="text-white">{selectedIdea.suggested_price}€</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">A une audience</label>
                  <p className="text-white">{selectedIdea.has_audience ? 'Oui' : 'Non'}</p>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Statut</label>
                  <select
                    value={selectedIdea.status}
                    onChange={(e) => {
                      setSelectedIdea({ ...selectedIdea, status: e.target.value as any })
                      handleStatusChange(selectedIdea.id, e.target.value)
                    }}
                    className="px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="submitted">Soumise</option>
                    <option value="evaluating">En évaluation</option>
                    <option value="accepted">Acceptée</option>
                    <option value="rejected">Rejetée</option>
                    <option value="building">Construite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase mb-1">Problème</label>
                <p className="text-zinc-300">{selectedIdea.problem}</p>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 uppercase mb-1">Audience cible</label>
                <p className="text-zinc-300">{selectedIdea.target_audience}</p>
              </div>

              {selectedIdea.audience_details && (
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Détails audience</label>
                  <p className="text-zinc-300">{selectedIdea.audience_details}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Email</label>
                  <a href={`mailto:${selectedIdea.submitter_email}`} className="text-indigo-400 hover:underline">
                    {selectedIdea.submitter_email}
                  </a>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 uppercase mb-1">Date</label>
                  <p className="text-zinc-300">{selectedIdea.created_at}</p>
                </div>
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

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm">
            <h3 className="text-lg font-bold mb-4">Êtes-vous sûr ?</h3>
            <p className="text-zinc-400 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
