'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type ActionResult = { success: boolean; error?: string; data?: unknown }

// === SaaS Products ===
export async function createSaasProduct(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const slug = formData.get('slug') as string
    const name = formData.get('name') as string
    const name_en = formData.get('name_en') as string | null
    const description_short = formData.get('description_short') as string
    const description_short_en = formData.get('description_short_en') as string | null
    const description_long = formData.get('description_long') as string | null
    const description_long_en = formData.get('description_long_en') as string | null
    const niche = formData.get('niche') as string
    const niche_en = formData.get('niche_en') as string | null
    const logo_url = formData.get('logo_url') as string | null
    const screenshot_url = formData.get('screenshot_url') as string | null
    const external_url = formData.get('external_url') as string | null
    const commission_rate = parseFloat(formData.get('commission_rate') as string) || 0
    const price_monthly = formData.get('price_monthly') ? parseFloat(formData.get('price_monthly') as string) : null
    const status = formData.get('status') as string
    const featured = formData.get('featured') === 'true'
    const display_order = parseInt(formData.get('display_order') as string) || 0
    const launched_at = formData.get('launched_at') as string | null

    const { error } = await supabase.from('saas_products').insert({
      slug,
      name,
      name_en,
      description_short,
      description_short_en,
      description_long,
      description_long_en,
      niche,
      niche_en,
      logo_url,
      screenshot_url,
      external_url,
      commission_rate,
      price_monthly,
      status,
      featured,
      display_order,
      launched_at,
    })

    if (error) throw error

    revalidatePath('/admin/saas')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateSaasProduct(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const slug = formData.get('slug') as string
    const name = formData.get('name') as string
    const name_en = formData.get('name_en') as string | null
    const description_short = formData.get('description_short') as string
    const description_short_en = formData.get('description_short_en') as string | null
    const description_long = formData.get('description_long') as string | null
    const description_long_en = formData.get('description_long_en') as string | null
    const niche = formData.get('niche') as string
    const niche_en = formData.get('niche_en') as string | null
    const logo_url = formData.get('logo_url') as string | null
    const screenshot_url = formData.get('screenshot_url') as string | null
    const external_url = formData.get('external_url') as string | null
    const commission_rate = parseFloat(formData.get('commission_rate') as string) || 0
    const price_monthly = formData.get('price_monthly') ? parseFloat(formData.get('price_monthly') as string) : null
    const status = formData.get('status') as string
    const featured = formData.get('featured') === 'true'
    const display_order = parseInt(formData.get('display_order') as string) || 0
    const launched_at = formData.get('launched_at') as string | null

    const { error } = await supabase
      .from('saas_products')
      .update({
        slug,
        name,
        name_en,
        description_short,
        description_short_en,
        description_long,
        description_long_en,
        niche,
        niche_en,
        logo_url,
        screenshot_url,
        external_url,
        commission_rate,
        price_monthly,
        status,
        featured,
        display_order,
        launched_at,
      })
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/saas')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function deleteSaasProduct(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('saas_products').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/admin/saas')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// === Creator Applications ===
export async function updateCreatorStatus(id: string, status: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('creator_applications').update({ status }).eq('id', id)

    if (error) throw error

    revalidatePath('/admin/createurs')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateCreatorNotes(id: string, notes: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('creator_applications').update({ admin_notes: notes }).eq('id', id)

    if (error) throw error

    revalidatePath('/admin/createurs')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// === SaaS Ideas ===
export async function updateIdeaStatus(id: string, status: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('saas_ideas').update({ status }).eq('id', id)

    if (error) throw error

    revalidatePath('/admin/idees')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateIdeaNotes(id: string, notes: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('saas_ideas').update({ admin_notes: notes }).eq('id', id)

    if (error) throw error

    revalidatePath('/admin/idees')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function deleteIdea(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('saas_ideas').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/admin/idees')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// === Blog Posts ===
export async function createBlogPost(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const slug = formData.get('slug') as string
    const title = formData.get('title') as string
    const title_en = formData.get('title_en') as string | null
    const excerpt = formData.get('excerpt') as string
    const excerpt_en = formData.get('excerpt_en') as string | null
    const content = formData.get('content') as string
    const content_en = formData.get('content_en') as string | null
    const cover_image_url = formData.get('cover_image_url') as string | null
    const tags = JSON.parse((formData.get('tags') as string) || '[]')
    const reading_time_minutes = parseInt((formData.get('reading_time_minutes') as string) || '0')
    const published = formData.get('published') === 'true'
    const published_at = formData.get('published_at') as string | null

    const { error } = await supabase.from('blog_posts').insert({
      slug,
      title,
      title_en,
      excerpt,
      excerpt_en,
      content,
      content_en,
      cover_image_url,
      tags,
      reading_time_minutes,
      published,
      published_at,
    })

    if (error) throw error

    revalidatePath('/admin/blog')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateBlogPost(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const slug = formData.get('slug') as string
    const title = formData.get('title') as string
    const title_en = formData.get('title_en') as string | null
    const excerpt = formData.get('excerpt') as string
    const excerpt_en = formData.get('excerpt_en') as string | null
    const content = formData.get('content') as string
    const content_en = formData.get('content_en') as string | null
    const cover_image_url = formData.get('cover_image_url') as string | null
    const tags = JSON.parse((formData.get('tags') as string) || '[]')
    const reading_time_minutes = parseInt((formData.get('reading_time_minutes') as string) || '0')
    const published = formData.get('published') === 'true'
    const published_at = formData.get('published_at') as string | null

    const { error } = await supabase
      .from('blog_posts')
      .update({
        slug,
        title,
        title_en,
        excerpt,
        excerpt_en,
        content,
        content_en,
        cover_image_url,
        tags,
        reading_time_minutes,
        published,
        published_at,
      })
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/blog')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('blog_posts').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/admin/blog')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function togglePublishBlogPost(id: string, publish: boolean): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('blog_posts')
      .update({
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
      })
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/blog')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// === Metrics Snapshots ===
export async function createMetricsSnapshot(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const date = formData.get('date') as string
    const total_mrr = parseFloat(formData.get('total_mrr') as string) || 0
    const total_saas_count = parseInt((formData.get('total_saas_count') as string) || '0')
    const total_creators = parseInt((formData.get('total_creators') as string) || '0')
    const total_redistributed = parseFloat((formData.get('total_redistributed') as string) || '0')
    const total_users = parseInt((formData.get('total_users') as string) || '0')
    const notes = formData.get('notes') as string | null

    const { error } = await supabase.from('metrics_snapshots').insert({
      date,
      total_mrr,
      total_saas_count,
      total_creators,
      total_redistributed,
      total_users,
      notes,
    })

    if (error) throw error

    revalidatePath('/admin/metriques')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateMetricsSnapshot(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const date = formData.get('date') as string
    const total_mrr = parseFloat(formData.get('total_mrr') as string) || 0
    const total_saas_count = parseInt((formData.get('total_saas_count') as string) || '0')
    const total_creators = parseInt((formData.get('total_creators') as string) || '0')
    const total_redistributed = parseFloat((formData.get('total_redistributed') as string) || '0')
    const total_users = parseInt((formData.get('total_users') as string) || '0')
    const notes = formData.get('notes') as string | null

    const { error } = await supabase
      .from('metrics_snapshots')
      .update({
        date,
        total_mrr,
        total_saas_count,
        total_creators,
        total_redistributed,
        total_users,
        notes,
      })
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/metriques')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function deleteMetricsSnapshot(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('metrics_snapshots').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/admin/metriques')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// === Site Content ===
export async function updateSiteContent(
  items: { key: string; value_fr: string; value_en?: string }[]
): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    for (const item of items) {
      const { error: checkError } = await supabase
        .from('site_content')
        .select('id')
        .eq('key', item.key)
        .single()

      if (checkError?.code === 'PGRST116') {
        // Does not exist, insert
        const { error } = await supabase.from('site_content').insert({
          key: item.key,
          value_fr: item.value_fr,
          value_en: item.value_en,
          section: 'general',
        })
        if (error) throw error
      } else {
        // Exists, update
        const { error } = await supabase
          .from('site_content')
          .update({
            value_fr: item.value_fr,
            value_en: item.value_en,
          })
          .eq('key', item.key)
        if (error) throw error
      }
    }

    revalidatePath('/admin/contenu')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// === Settings ===
export async function updatePassword(currentPassword: string, newPassword: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error

    revalidatePath('/admin/parametres')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateSocialLinks(links: Record<string, string>): Promise<ActionResult> {
  try {
    const items = Object.entries(links).map(([key, value]) => ({
      key: `social_${key}`,
      value_fr: value,
    }))

    await updateSiteContent(items)

    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function updateSEOSettings(
  seo: { title: string; description: string; ogImage: string }
): Promise<ActionResult> {
  try {
    const items = [
      { key: 'seo_title', value_fr: seo.title },
      { key: 'seo_description', value_fr: seo.description },
      { key: 'seo_ogImage', value_fr: seo.ogImage },
    ]

    await updateSiteContent(items)

    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
