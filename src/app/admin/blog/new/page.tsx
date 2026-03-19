'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronLeft, Bold, Italic, Heading2, Heading3, Link as LinkIcon, Code, List } from 'lucide-react'
import { Markdown } from '@/components/ui/markdown'

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default function NewBlogPage() {
  const router = useRouter()
  const supabase = createClient()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [activeTab, setActiveTab] = useState<'fr' | 'en'>('fr')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    slug: '',
    excerpt: '',
    excerpt_en: '',
    content: '',
    content_en: '',
    cover_image_url: '',
    tags: [] as string[],
    published: false,
  })
  const [tagsInput, setTagsInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement & { type?: string }
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))

    if (name === 'title' && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }))
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tag = tagsInput.trim()
      if (tag && !formData.tags.includes(tag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tag],
        }))
        setTagsInput('')
      }
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = activeTab === 'fr' ? formData.content : formData.content_en
    const selected = text.substring(start, end)
    const newText =
      text.substring(0, start) +
      prefix +
      selected +
      suffix +
      text.substring(end)

    setFormData((prev) => ({
      ...prev,
      [activeTab === 'fr' ? 'content' : 'content_en']: newText,
    }))

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + prefix.length + selected.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const getReadingTime = (content: string) => {
    return Math.ceil(content.split(/\s+/).length / 200)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const readingTime = getReadingTime(formData.content)
      const { error } = await supabase.from('blog_posts').insert([
        {
          ...formData,
          reading_time_minutes: readingTime,
          published_at: formData.published ? new Date().toISOString() : null,
        },
      ])

      if (error) throw error
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const currentContent = activeTab === 'fr' ? formData.content : formData.content_en

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">
          Nouvel article
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Informations</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Titre (FR)"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              label="Titre (EN)"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
            />
            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="auto-generated"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Extrait (FR) ({formData.excerpt.length}/300)
                </label>
                <Textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  maxLength={300}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Extrait (EN) ({formData.excerpt_en.length}/300)
                </label>
                <Textarea
                  name="excerpt_en"
                  value={formData.excerpt_en}
                  onChange={handleChange}
                  rows={3}
                  maxLength={300}
                />
              </div>
            </div>

            <Input
              label="Cover Image URL"
              name="cover_image_url"
              type="url"
              value={formData.cover_image_url}
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Tags
              </label>
              <div className="flex gap-2 items-center mb-3">
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  onKeyPress={handleAddTag}
                  placeholder="Entrez un tag et appuyez sur Entrée"
                  className="flex-1"
                />
              </div>
              {formData.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-lg text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-zinc-400 hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 rounded border border-white/10 bg-white/5 cursor-pointer"
              />
              <label htmlFor="published" className="text-sm font-medium">
                Publié
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Markdown Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Contenu</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('fr')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'fr'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Français
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'en'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Toolbar */}
            <div className="flex gap-1 p-2 bg-zinc-800 rounded-lg flex-wrap">
              <button
                type="button"
                onClick={() => insertMarkdown('**', '**')}
                title="Bold"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('*', '*')}
                title="Italic"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('## ')}
                title="Heading 2"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('### ')}
                title="Heading 3"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('[', '](url)')}
                title="Link"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('```\n', '\n```')}
                title="Code Block"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('- ')}
                title="List"
                className="p-2 hover:bg-zinc-700 rounded transition-colors"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Split View */}
            <div className="grid grid-cols-2 gap-4">
              {/* Textarea */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Markdown
                </label>
                <Textarea
                  ref={textareaRef}
                  name={activeTab === 'fr' ? 'content' : 'content_en'}
                  value={currentContent}
                  onChange={handleChange}
                  rows={15}
                  className="font-mono"
                  required={activeTab === 'fr'}
                />
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Aperçu
                </label>
                <div className="bg-zinc-900 rounded-lg p-4 min-h-[360px] overflow-auto border border-zinc-800">
                  <Markdown>{currentContent}</Markdown>
                </div>
              </div>
            </div>

            <div className="text-sm text-zinc-400">
              Temps de lecture estimé: {getReadingTime(formData.content)} min
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {formData.published ? 'Publier' : 'Sauvegarder (brouillon)'}
          </Button>
          <Link href="/admin/blog">
            <Button variant="secondary">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
