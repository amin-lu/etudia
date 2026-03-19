export interface SaasProduct {
  id: string
  slug: string
  name: string
  name_en: string | null
  description_short: string
  description_short_en: string | null
  description_long: string | null
  description_long_en: string | null
  niche: string
  niche_en: string | null
  logo_url: string | null
  screenshot_url: string | null
  external_url: string | null
  commission_rate: number
  price_monthly: number | null
  status: 'live' | 'building' | 'coming_soon'
  active_users: number
  mrr: number
  price: number
  launched_at: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface CreatorApplication {
  id: string
  name: string
  email: string
  platform: 'youtube' | 'tiktok' | 'instagram' | 'x' | 'linkedin' | 'twitch' | 'other'
  profile_url: string | null
  followers_count: number | null
  niche: string | null
  message: string | null
  status: 'pending' | 'accepted' | 'rejected' | 'contacted'
  admin_notes: string | null
  created_at: string
}

export interface SaasIdea {
  id: string
  name: string
  niche: string
  problem: string
  target_audience: string | null
  has_audience: boolean
  audience_details: string | null
  suggested_price: number | null
  submitter_email: string
  votes_count: number
  status: 'submitted' | 'evaluating' | 'accepted' | 'rejected' | 'built'
  admin_notes: string | null
  created_at: string
}

export interface IdeaVote {
  id: string
  idea_id: string
  voter_id: string
  created_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  title_en: string | null
  excerpt: string
  excerpt_en: string | null
  content: string
  content_en: string | null
  cover_image_url: string | null
  tags: string[]
  reading_time_minutes: number
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface MetricsSnapshot {
  id: string
  date: string
  total_mrr: number
  total_saas_count: number
  total_creators: number
  total_redistributed: number
  total_users: number
  notes: string | null
  created_at: string
}
