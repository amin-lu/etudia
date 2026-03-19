'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateSiteContent } from '@/lib/actions/admin'
import { toast } from 'sonner'

interface ContentItem {
  key: string
  value_fr: string
  value_en: string
  description?: string
  section: string
}

const SECTIONS = ['accueil', 'createurs', 'idees', 'comment-ca-marche', 'a-propos', 'dashboard', 'blog', 'footer']

export default function ContenuPage() {
  const [content, setContent] = useState<Record<string, ContentItem[]>>({})
  const [activeTab, setActiveTab] = useState(SECTIONS[0])
  const [modified, setModified] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('site_content')
        .select('key, value_fr, value_en, section, description')
        .in('section', SECTIONS)

      if (data) {
        const grouped: Record<string, ContentItem[]> = {}
        SECTIONS.forEach((section) => {
          grouped[section] = []
        })

        data.forEach((item) => {
          if (grouped[item.section]) {
            grouped[item.section].push(item)
          }
        })

        setContent(grouped)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      toast.error('Erreur lors du chargement du contenu')
    } finally {
      setLoading(false)
    }
  }

  function handleValueChange(section: string, key: string, field: 'value_fr' | 'value_en', value: string) {
    setContent((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      ),
    }))

    const id = `${section}-${key}-${field}`
    setModified((prev) => new Set(prev).add(id))
  }

  async function handleSaveSection() {
    try {
      const items = content[activeTab].map((item) => ({
        key: item.key,
        value_fr: item.value_fr,
        value_en: item.value_en,
      }))

      const result = await updateSiteContent(items)

      if (result.success) {
        setModified((prev) => {
          const next = new Set(prev)
          content[activeTab].forEach((item) => {
            next.delete(`${activeTab}-${item.key}-value_fr`)
            next.delete(`${activeTab}-${item.key}-value_en`)
          })
          return next
        })
        toast.success('Contenu sauvegardé avec succès')
      } else {
        toast.error(result.error || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  if (loading) {
    return <div className="text-zinc-400">Chargement...</div>
  }

  const tabContent = content[activeTab] || []
  const hasChanges = Array.from(modified).some((id) => id.startsWith(activeTab))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Contenu du site</h1>
        <p className="text-zinc-400">Modifiez le contenu de toutes les pages</p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 overflow-x-auto pb-4">
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => setActiveTab(section)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              activeTab === section
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Content Items */}
      <div className="space-y-6">
        {tabContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">Aucun contenu pour cette section</p>
          </div>
        ) : (
          tabContent.map((item) => (
            <div key={item.key} className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 font-mono">{item.key}</p>
                {item.description && (
                  <p className="text-sm text-zinc-400 italic">{item.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Français</label>
                  <textarea
                    value={item.value_fr}
                    onChange={(e) =>
                      handleValueChange(activeTab, item.key, 'value_fr', e.target.value)
                    }
                    className="w-full min-h-[80px] bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">English</label>
                  <textarea
                    value={item.value_en}
                    onChange={(e) =>
                      handleValueChange(activeTab, item.key, 'value_en', e.target.value)
                    }
                    className="w-full min-h-[80px] bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveSection}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-medium transition-colors"
          >
            Sauvegarder cette section
          </button>
        </div>
      )}
    </div>
  )
}
