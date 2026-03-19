'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent, CardFooter } from '@/components/ui/card'
import type { MetricsSnapshot } from '@/lib/supabase/types'

interface MetricsFormProps {
  snapshot?: MetricsSnapshot
  onSubmit: (data: Partial<MetricsSnapshot>) => Promise<void>
  isLoading: boolean
}

export function MetricsForm({
  snapshot,
  onSubmit,
  isLoading,
}: MetricsFormProps) {
  const [formData, setFormData] = useState<Partial<MetricsSnapshot>>(
    snapshot || {
      date: new Date().toISOString().split('T')[0],
      total_mrr: 0,
      total_saas_count: 0,
      total_creators: 0,
      total_redistributed: 0,
      total_users: 0,
      notes: '',
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement & {
      type?: string
    }
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardContent className="space-y-4 pt-6">
        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date || ''}
          onChange={handleChange}
          required
        />
        <Input
          label="Total MRR (€)"
          name="total_mrr"
          type="number"
          step="0.01"
          value={formData.total_mrr || 0}
          onChange={handleChange}
          required
        />
        <Input
          label="SaaS Count"
          name="total_saas_count"
          type="number"
          value={formData.total_saas_count || 0}
          onChange={handleChange}
          required
        />
        <Input
          label="Total Creators"
          name="total_creators"
          type="number"
          value={formData.total_creators || 0}
          onChange={handleChange}
          required
        />
        <Input
          label="Total Redistributed (€)"
          name="total_redistributed"
          type="number"
          step="0.01"
          value={formData.total_redistributed || 0}
          onChange={handleChange}
          required
        />
        <Input
          label="Total Users"
          name="total_users"
          type="number"
          value={formData.total_users || 0}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Notes (optional)"
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          rows={3}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {snapshot ? 'Mettre à jour' : 'Créer'}
        </Button>
      </CardFooter>
    </form>
  )
}
