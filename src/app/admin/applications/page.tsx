'use client'

import { useEffect, useState } from 'react'
import { getApps, createApp, updateApp, deleteApp } from '@/lib/actions/admin-prisma'
import { Plus, Trash2 } from 'lucide-react'

const mockApps = [
  {
    id: '1',
    name: 'BacSuccess',
    slug: 'bacsuccess',
    description: 'Plateforme de préparation au baccalauréat',
    category: 'Éducation',
    price: 9.99,
    commissionRate: 0.4,
    status: 'online',
    siteUrl: 'https://bacsuccess.com',
    createdAt: '2025-01-10T00:00:00Z',
  },
]

export default function ApplicationsPage() {
  const [apps, setApps] = useState(mockApps)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    price: 0,
    commissionRate: 0.4,
    status: 'online',
    siteUrl: '',
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getApps()
        if (data.length > 0) {
          setApps(data.map((a: any) => ({
            id: a.id,
            name: a.name,
            slug: a.slug,
            description: a.description,
            category: a.category,
            price: a.price,
            commissionRate: a.commissionRate,
            status: a.status,
            siteUrl: a.siteUrl || '',
            createdAt: a.createdAt.toISOString ? a.createdAt.toISOString() : String(a.createdAt),
          })))
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApps()
  }, [])

  const handleOpenModal = (app?: (typeof mockApps)[0]) => {
    if (app) {
      setEditingId(app.id)
      setFormData({
        name: app.name,
        slug: app.slug,
        description: app.description,
        category: app.category,
        price: app.price,
        commissionRate: app.commissionRate,
        status: app.status,
        siteUrl: app.siteUrl || '',
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        slug: '',
        description: '',
        category: '',
        price: 0,
        commissionRate: 0.4,
        status: 'online',
        siteUrl: '',
      })
    }
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editingId) {
        await updateApp(editingId, formData)
        setApps((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a)))
      } else {
        await createApp(formData)
        const data = await getApps()
        setApps(data.map((a: any) => ({
          id: a.id,
          name: a.name,
          slug: a.slug,
          description: a.description,
          category: a.category,
          price: a.price,
          commissionRate: a.commissionRate,
          status: a.status,
          siteUrl: a.siteUrl || '',
          createdAt: a.createdAt.toISOString ? a.createdAt.toISOString() : String(a.createdAt),
        })))
      }
      setShowModal(false)
    } catch (error) {
      console.error('Error saving application:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette application?')) return

    setDeleting(id)
    try {
      await deleteApp(id)
      setApps((prev) => prev.filter((a) => a.id !== id))
    } catch (error) {
      console.error('Error deleting application:', error)
    } finally {
      setDeleting(null)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Applications</h1>
          <p className="text-zinc-400">Gérez le catalogue SaaS</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 font-medium"
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Nom</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Slug</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-zinc-400">Catégorie</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-zinc-400">Prix</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-zinc-400">Commission</th>
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
                    <td colSpan={6} />
                  </tr>
                ))
              ) : apps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    Aucune application
                  </td>
                </tr>
              ) : (
                apps.map((app) => (
                  <tr key={app.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{app.name}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm font-mono">{app.slug}</td>
                    <td className="py-4 px-6 text-zinc-300 text-sm">{app.category}</td>
                    <td className="py-4 px-6 text-right text-white">{app.price}€</td>
                    <td className="py-4 px-6 text-right text-white">{(app.commissionRate * 100).toFixed(0)}%</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'online'
                            ? 'bg-green-500/20 text-green-400'
                            : app.status === 'coming_soon'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {app.status === 'online' ? 'En ligne' : app.status === 'coming_soon' ? 'À venir' : 'En cours'}
                      </span>
                    </td>
                    <td className="py-4 px-6 space-y-2">
                      <button
                        onClick={() => handleOpenModal(app)}
                        className="block text-indigo-400 hover:text-indigo-300 font-medium text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        disabled={deleting === app.id}
                        className="text-red-400 hover:text-red-300 font-medium text-sm disabled:opacity-50"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{editingId ? 'Modifier l\'application' : 'Nouvelle application'}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Nom de l'application"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  placeholder="slug-de-app"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Description de l'application"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Catégorie"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Commission (%)</label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    step="1"
                    value={formData.commissionRate * 100}
                    onChange={(e) => setFormData({ ...formData, commissionRate: parseInt(e.target.value) / 100 })}
                    className="w-full"
                  />
                  <p className="text-white font-medium mt-2">{(formData.commissionRate * 100).toFixed(0)}%</p>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="online">En ligne</option>
                    <option value="coming_soon">À venir</option>
                    <option value="building">En cours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">URL du site</label>
                <input
                  type="url"
                  value={formData.siteUrl}
                  onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 font-medium"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 font-medium"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
