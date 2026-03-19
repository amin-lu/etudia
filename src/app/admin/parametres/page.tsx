'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updatePassword, updateSocialLinks, updateSEOSettings } from '@/lib/actions/admin'
import { toast } from 'sonner'

interface SocialLinks {
  [key: string]: string
  youtube: string
  tiktok: string
  instagram: string
  linkedin: string
  x: string
}

interface SEOSettings {
  title: string
  description: string
  ogImage: string
}

export default function ParametresPage() {
  const [user, setUser] = useState<any>(null)
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' })
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    youtube: '',
    tiktok: '',
    instagram: '',
    linkedin: '',
    x: '',
  })
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    title: '',
    description: '',
    ogImage: '',
  })
  const [loading, setLoading] = useState(true)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingSocial, setSavingSocial] = useState(false)
  const [savingSEO, setSavingSEO] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)

      // Get social links from site_content
      const { data: socialData } = await supabase
        .from('site_content')
        .select('key, value_fr')
        .like('key', 'social_%')

      if (socialData) {
        const social: SocialLinks = {
          youtube: '',
          tiktok: '',
          instagram: '',
          linkedin: '',
          x: '',
        }

        socialData.forEach((item) => {
          const key = item.key.replace('social_', '')
          if (key in social) {
            social[key as keyof SocialLinks] = item.value_fr
          }
        })

        setSocialLinks(social)
      }

      // Get SEO settings from site_content
      const { data: seoData } = await supabase
        .from('site_content')
        .select('key, value_fr')
        .like('key', 'seo_%')

      if (seoData) {
        const seo: SEOSettings = {
          title: '',
          description: '',
          ogImage: '',
        }

        seoData.forEach((item) => {
          const key = item.key.replace('seo_', '')
          if (key === 'title') seo.title = item.value_fr
          if (key === 'description') seo.description = item.value_fr
          if (key === 'ogImage') seo.ogImage = item.value_fr
        })

        setSeoSettings(seo)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Erreur lors du chargement des paramètres')
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setSavingPassword(true)
    try {
      const result = await updatePassword('', passwordForm.newPassword)

      if (result.success) {
        toast.success('Mot de passe changé avec succès')
        setPasswordForm({ newPassword: '', confirmPassword: '' })
      } else {
        toast.error(result.error || 'Erreur lors du changement de mot de passe')
      }
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe')
    } finally {
      setSavingPassword(false)
    }
  }

  async function handleSaveSocial() {
    setSavingSocial(true)
    try {
      const result = await updateSocialLinks(socialLinks)

      if (result.success) {
        toast.success('Réseaux sociaux sauvegardés')
      } else {
        toast.error(result.error || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setSavingSocial(false)
    }
  }

  async function handleSaveSEO() {
    setSavingSEO(true)
    try {
      const result = await updateSEOSettings(seoSettings)

      if (result.success) {
        toast.success('Paramètres SEO sauvegardés')
      } else {
        toast.error(result.error || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setSavingSEO(false)
    }
  }

  if (loading) {
    return <div className="text-zinc-400">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-zinc-400">Gérez votre compte et les paramètres du site</p>
      </div>

      {/* Section 1: Account */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Mon compte</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 text-sm"
          />
          <p className="text-xs text-zinc-500">Votre email Supabase</p>
        </div>

        <div className="border-t border-zinc-700 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Changer le mot de passe</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Nouveau mot de passe</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Confirmer le mot de passe</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
            >
              {savingPassword ? 'Changement en cours...' : 'Changer le mot de passe'}
            </button>
          </form>
        </div>
      </div>

      {/* Section 2: Social Links */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Réseaux sociaux</h2>

        <div className="space-y-4">
          {Object.entries(socialLinks).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="url"
                value={value}
                onChange={(e) => setSocialLinks((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder={`https://${key}.com/...`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveSocial}
          disabled={savingSocial}
          className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
        >
          {savingSocial ? 'Sauvegarde en cours...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Section 3: SEO */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">SEO par défaut</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Titre</label>
            <input
              type="text"
              value={seoSettings.title}
              onChange={(e) => setSeoSettings((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Titre du site"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Description</label>
            <textarea
              value={seoSettings.description}
              onChange={(e) =>
                setSeoSettings((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full min-h-[80px] px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
              placeholder="Description du site"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">URL image Open Graph</label>
            <input
              type="url"
              value={seoSettings.ogImage}
              onChange={(e) => setSeoSettings((prev) => ({ ...prev, ogImage: e.target.value }))}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <button
          onClick={handleSaveSEO}
          disabled={savingSEO}
          className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
        >
          {savingSEO ? 'Sauvegarde en cours...' : 'Sauvegarder'}
        </button>
      </div>
    </div>
  )
}
