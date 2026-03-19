'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DataTable } from '@/components/admin/data-table'
import { createSaasProduct, updateSaasProduct, deleteSaasProduct } from '@/lib/actions/admin'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface SaasProduct {
  id: string
  slug: string
  name: string
  name_en?: string
  description_short: string
  description_short_en?: string
  description_long?: string
  description_long_en?: string
  niche: string
  niche_en?: string
  logo_url?: string
  screenshot_url?: string
  external_url?: string
  commission_rate: number
  price_monthly?: number
  status: 'live' | 'building' | 'coming_soon'
  featured: boolean
  display_order: number
  launched_at?: string
  active_users: number
  mrr: number
  created_at: string
}

const mockSaaS: SaasProduct[] = [
  {
    id: '1',
    slug: 'etudiet',
    name: 'ETUDIET',
    description_short: 'Plateforme éducative pour étudiants',
    niche: 'Éducation',
    status: 'live',
    price_monthly: 12.9,
    commission_rate: 40,
    active_users: 0,
    mrr: 0,
    featured: true,
    display_order: 1,
    created_at: '2025-02-01',
  },
  {
    id: '2',
    slug: 'bacsuccess',
    name: 'BacSuccess',
    description_short: 'Préparez votre baccalauréat',
    niche: 'Éducation',
    status: 'live',
    price_monthly: 0,
    commission_rate: 40,
    active_users: 0,
    mrr: 0,
    featured: true,
    display_order: 2,
    created_at: '2025-01-01',
  },
  {
    id: '3',
    slug: 'fittrack-pro',
    name: 'FitTrack Pro',
    description_short: 'Suivi fitness et entraînement',
    niche: 'Fitness',
    status: 'coming_soon',
    price_monthly: 9.9,
    commission_rate: 45,
    active_users: 0,
    mrr: 0,
    featured: false,
    display_order: 3,
    created_at: '2025-03-01',
  },
]

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const statusColors: Record<string, { bg: string; text: string }> = {
  live: { bg: 'bg-green-500/20', text: 'text-green-400' },
  building: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  coming_soon: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
}

const nicheColors: Record<string, { bg: string; text: string }> = {
  Éducation: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  Fitness: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  Bricolage: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  Jardinage: { bg: 'bg-green-500/20', text: 'text-green-400' },
  Droit: { bg: 'bg-red-500/20', text: 'text-red-400' },
  Nutrition: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
}

export default function SaasPage() {
  const [items, setItems] = useState<SaasProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    name_en: '',
    description_short: '',
    description_short_en: '',
    description_long: '',
    description_long_en: '',
    niche: '',
    niche_en: '',
    logo_url: '',
    screenshot_url: '',
    external_url: '',
    commission_rate: 40,
    price_monthly: 0,
    status: 'live' as 'live' | 'building' | 'coming_soon',
    featured: false,
    display_order: 0,
    launched_at: '',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('saas_products')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setItems(data || mockSaaS)
    } catch {
      setItems(mockSaaS)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({
      slug: '',
      name: '',
      name_en: '',
      description_short: '',
      description_short_en: '',
      description_long: '',
      description_long_en: '',
      niche: '',
      niche_en: '',
      logo_url: '',
      screenshot_url: '',
      external_url: '',
      commission_rate: 40,
      price_monthly: 0,
      status: 'live',
      featured: false,
      display_order: 0,
      launched_at: '',
    })
    setShowModal(true)
  }

  const handleOpenEdit = (item: SaasProduct) => {
    setEditingId(item.id)
    setFormData({
      slug: item.slug,
      name: item.name,
      name_en: item.name_en || '',
      description_short: item.description_short,
      description_short_en: item.description_short_en || '',
      description_long: item.description_long || '',
      description_long_en: item.description_long_en || '',
      niche: item.niche,
      niche_en: item.niche_en || '',
      logo_url: item.logo_url || '',
      screenshot_url: item.screenshot_url || '',
      external_url: item.external_url || '',
      commission_rate: item.commission_rate,
      price_monthly: item.price_monthly || 0,
      status: item.status,
      featured: item.featured,
      display_order: item.display_order,
      launched_at: item.launched_at || '',
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const fd = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, String(value))
    })

    try {
      const result = editingId
        ? await updateSaasProduct(editingId, fd)
        : await createSaasProduct(fd)

      if (result.success) {
        alert(editingId ? 'SaaS mise à jour' : 'SaaS créé')
        setShowModal(false)
        fetchItems()
      } else {
        alert(`Erreur: ${result.error}`)
      }
    } catch (error) {
      alert(`Erreur: ${error}`)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteSaasProduct(id)
      if (result.success) {
        alert('SaaS supprimé')
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produits SaaS</h1>
          <p className="text-zinc-400 mt-1">Gérer tous les produits SaaS</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un SaaS
        </button>
      </div>

      <DataTable
        columns={[
          {
            key: 'name',
            label: 'Nom',
            sortable: true,
            render: (val): React.ReactNode => <span className="font-bold">{String(val)}</span>,
          },
          {
            key: 'niche',
            label: 'Niche',
            sortable: true,
            render: (val): React.ReactNode => {
              const colors =
                nicheColors[String(val)] || { bg: 'bg-zinc-700/20', text: 'text-zinc-400' }
              return (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {String(val)}
                </span>
              )
            },
          },
          {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (val): React.ReactNode => {
              const colors = statusColors[String(val)]
              return (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {String(val) === 'live' ? 'En ligne' : String(val) === 'building' ? 'En construction' : 'Bientôt'}
                </span>
              )
            },
          },
          {
            key: 'price_monthly',
            label: 'Prix',
            sortable: true,
            render: (val): React.ReactNode => `${val}€`,
          },
          {
            key: 'commission_rate',
            label: 'Commission',
            sortable: true,
            render: (val): React.ReactNode => `${val}%`,
          },
          {
            key: 'active_users',
            label: 'Utilisateurs actifs',
            sortable: true,
          },
          {
            key: 'mrr',
            label: 'MRR',
            sortable: true,
            render: (val): React.ReactNode => `${val}€`,
          },
          {
            key: 'featured',
            label: 'Featured',
            sortable: true,
            render: (val): React.ReactNode => (val ? '✓' : '✗'),
          },
          {
            key: 'created_at',
            label: 'Date création',
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
              { value: 'all', label: 'Tous' },
              { value: 'live', label: 'En ligne' },
              { value: 'building', label: 'En construction' },
              { value: 'coming_soon', label: 'Bientôt' },
            ],
          },
        ]}
        pageSize={10}
        actions={(row): React.ReactNode => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenEdit(row as unknown as SaasProduct)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Modifier"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm((row as unknown as SaasProduct).id)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-red-400 transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Modal Edit/Create */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-700">
              <h2 className="text-xl font-bold">
                {editingId ? 'Modifier SaaS' : 'Créer SaaS'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Nom FR</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (!editingId) {
                        setFormData((prev) => ({
                          ...prev,
                          slug: generateSlug(e.target.value),
                        }))
                      }
                    }}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Nom EN</label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Niche FR</label>
                  <input
                    type="text"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Niche EN</label>
                  <input
                    type="text"
                    value={formData.niche_en}
                    onChange={(e) => setFormData({ ...formData, niche_en: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'live' | 'building' | 'coming_soon',
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="live">En ligne</option>
                    <option value="building">En construction</option>
                    <option value="coming_soon">Bientôt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Description courte FR ({formData.description_short.length}/300)
                </label>
                <textarea
                  value={formData.description_short}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description_short: e.target.value.slice(0, 300),
                    })
                  }
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Description courte EN</label>
                <textarea
                  value={formData.description_short_en}
                  onChange={(e) => setFormData({ ...formData, description_short_en: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Prix mensuel</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_monthly}
                    onChange={(e) =>
                      setFormData({ ...formData, price_monthly: parseFloat(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">
                    Commission ({formData.commission_rate}%)
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={formData.commission_rate}
                    onChange={(e) =>
                      setFormData({ ...formData, commission_rate: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Ordre d'affichage</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Date de lancement</label>
                  <input
                    type="date"
                    value={formData.launched_at}
                    onChange={(e) => setFormData({ ...formData, launched_at: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">URL externe</label>
                  <input
                    type="text"
                    value={formData.external_url}
                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-zinc-400">Featured</span>
              </label>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-colors"
                >
                  {editingId ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
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
