'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { MetricsForm } from '@/components/admin/metrics-form'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { MetricsSnapshot } from '@/lib/supabase/types'

export default function MetriquesPage() {
  const supabase = createClient()
  const [snapshots, setSnapshots] = useState<MetricsSnapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSnapshot, setEditingSnapshot] = useState<
    MetricsSnapshot | undefined
  >()
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    fetchSnapshots()
  }, [])

  const fetchSnapshots = async () => {
    try {
      const { data } = await supabase
        .from('metrics_snapshots')
        .select('*')
        .order('date', { ascending: true })

      setSnapshots((data || []) as MetricsSnapshot[])
    } catch (error) {
      console.error('Error fetching snapshots:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (snapshot?: MetricsSnapshot) => {
    setEditingSnapshot(snapshot)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSnapshot(undefined)
  }

  const handleSubmit = async (data: Partial<MetricsSnapshot>) => {
    setFormLoading(true)
    try {
      if (editingSnapshot) {
        // Update
        const { error } = await supabase
          .from('metrics_snapshots')
          .update(data)
          .eq('id', editingSnapshot.id)

        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('metrics_snapshots')
          .insert([data])

        if (error) throw error
      }

      await fetchSnapshots()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving snapshot:', error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('metrics_snapshots')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchSnapshots()
    } catch (error) {
      console.error('Error deleting snapshot:', error)
    }
  }

  const chartData = snapshots.map((s) => ({
    date: new Date(s.date).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
    }),
    mrr: s.total_mrr,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
            Métriques
          </h1>
          <p className="text-gray-400">Manage metrics snapshots</p>
        </div>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
        >
          Ajouter un snapshot
        </Button>
      </div>

      {!loading && snapshots.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Évolution MRR</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="date" stroke="#a1a1a1" style={{ fontSize: '12px' }} />
                <YAxis stroke="#a1a1a1" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #3f3f46',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fafafa' }}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Snapshots</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    MRR
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    SaaS
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Créateurs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Redistribué
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Utilisateurs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Notes
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400">
                      Chargement...
                    </td>
                  </tr>
                ) : snapshots.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400">
                      Aucun snapshot trouvé
                    </td>
                  </tr>
                ) : (
                  [...snapshots].reverse().map((snapshot) => (
                    <tr
                      key={snapshot.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">
                        {new Date(snapshot.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        €{snapshot.total_mrr.toFixed(0)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {snapshot.total_saas_count}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {snapshot.total_creators}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        €{snapshot.total_redistributed.toFixed(0)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {snapshot.total_users}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400 max-w-xs truncate">
                        {snapshot.notes || '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenModal(snapshot)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(snapshot.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingSnapshot ? 'Modifier snapshot' : 'Ajouter un snapshot'}
        size="md"
      >
        <MetricsForm
          snapshot={editingSnapshot}
          onSubmit={handleSubmit}
          isLoading={formLoading}
        />
      </Modal>
    </div>
  )
}
