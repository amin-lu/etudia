'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { BlogPost } from '@/lib/supabase/types'

export default function BlogPage() {
  const supabase = createClient()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      setPosts((data || []) as BlogPost[])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          published: !published,
          published_at: !published ? new Date().toISOString() : null,
        })
        .eq('id', id)

      if (error) throw error
      await fetchPosts()
    } catch (error) {
      console.error('Error toggling publish:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
            Blog
          </h1>
          <p className="text-gray-400">Manage blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary">Nouvel article</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Articles de blog</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Titre
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Tags
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Temps de lecture
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Statut
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      Chargement...
                    </td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      Aucun article trouvé
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm font-medium">{post.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        <div className="flex gap-1 flex-wrap">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {post.reading_time_minutes} min
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={post.published ? 'success' : 'warning'}
                        >
                          {post.published ? 'Publié' : 'Brouillon'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {new Date(post.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/blog/edit/${post.id}`}>
                            <Button
                              variant="secondary"
                              size="sm"
                            >
                              Modifier
                            </Button>
                          </Link>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleTogglePublish(post.id, post.published)}
                          >
                            {post.published ? 'Dépublier' : 'Publier'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
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
    </div>
  )
}
