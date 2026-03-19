import { createClient } from '@/lib/supabase/server'

export async function getContent(key: string, locale: string = 'fr'): Promise<string> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_content')
      .select('value_fr, value_en')
      .eq('key', key)
      .single()

    if (!data) return key
    return locale === 'en' ? (data.value_en || data.value_fr) : data.value_fr
  } catch {
    return key
  }
}

export async function getContentBySection(
  section: string
): Promise<Record<string, { fr: string; en: string; description?: string }>> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_content')
      .select('key, value_fr, value_en, description')
      .eq('section', section)

    if (!data) return {}
    return Object.fromEntries(
      data.map((item) => [
        item.key,
        {
          fr: item.value_fr,
          en: item.value_en || item.value_fr,
          description: item.description,
        },
      ])
    )
  } catch {
    return {}
  }
}

export async function getAllContentBySection(): Promise<
  Record<string, Array<{ key: string; value_fr: string; value_en: string; description?: string }>>
> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_content')
      .select('key, value_fr, value_en, section, description')

    if (!data) return {}

    const grouped: Record<string, any[]> = {}
    data.forEach((item) => {
      if (!grouped[item.section]) {
        grouped[item.section] = []
      }
      grouped[item.section].push(item)
    })

    return grouped
  } catch {
    return {}
  }
}
