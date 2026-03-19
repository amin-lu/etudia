"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/supabase/types"
import { useLocale } from "next-intl"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const locale = useLocale()

  const title = locale === "en" ? post.title_en || post.title : post.title
  const excerpt =
    locale === "en" ? post.excerpt_en || post.excerpt : post.excerpt

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card
          variant="interactive"
          className="h-full overflow-hidden flex flex-col border-card-border bg-card hover:border-white/20"
        >
          {/* Cover Image or Gradient Placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
            {post.cover_image_url ? (
              <img
                src={post.cover_image_url}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center opacity-40">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-foreground mb-2 line-clamp-2 flex-1">
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                {excerpt}
              </p>
            )}

            {/* Date and Reading Time */}
            <div className="pt-3 border-t border-card-border space-y-1">
              <p className="text-xs text-foreground/50">{publishedDate}</p>
              <p className="text-xs text-foreground/50">
                {post.reading_time_minutes} {locale === "en" ? "min read" : "min de lecture"}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
