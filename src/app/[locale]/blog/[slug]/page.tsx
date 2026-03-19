import { getLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { BlogPost } from "@/lib/supabase/types"
import { ArrowLeft } from "lucide-react"
import "highlight.js/styles/atom-one-dark.css"

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "pourquoi-on-construit-etudia",
    title: "Pourquoi on construit Etudia",
    title_en: "Why we are building Etudia",
    excerpt:
      "L'histoire derrière Etudia et notre vision pour l'avenir du SaaS en affiliation.",
    excerpt_en:
      "The story behind Etudia and our vision for the future of SaaS distribution.",
    content: `# Pourquoi on construit Etudia

Bienvenue sur notre blog. Etudia est une plateforme unique qui connecte trois mondes : les studios de développement, les créateurs de contenu et les utilisateurs.

## Le problème

Les créateurs de contenu ont des audiences incroyablement engagées mais peu de moyens de monétisation au-delà de la publicité. Les studios SaaS ont besoin de distribution mais peu d'accès direct aux créateurs.

## Notre solution

Etudia crée un marché équitable où :

- Les studios construisent des SaaS de qualité
- Les créateurs les distribuent à leur audience
- Tout le monde en bénéficie

## L'impact

En trois mois, nous avons :

1. Construit 2 SaaS en production
2. Partenariat avec 8 créateurs
3. Redistribué plus de 1500€ aux partenaires

C'est le début d'une belle aventure.`,
    content_en: `# Why we are building Etudia

Welcome to our blog. Etudia is a unique platform that connects three worlds: development studios, content creators, and users.

## The problem

Content creators have incredibly engaged audiences but limited monetization options beyond advertising. SaaS studios need distribution but limited access to creators.

## Our solution

Etudia creates a fair marketplace where:

- Studios build high-quality SaaS products
- Creators distribute them to their audience
- Everyone benefits

## The impact

In three months, we have:

1. Built 2 SaaS products in production
2. Partnered with 8 creators
3. Redistributed over €1500 to partners

This is the beginning of a beautiful journey.`,
    cover_image_url: null,
    tags: ["build-in-public", "annonces"],
    published: true,
    published_at: "2025-01-10",
    created_at: "2025-01-10",
    updated_at: "2025-01-10",
    reading_time_minutes: 5,
  },
  {
    id: "2",
    slug: "comment-on-construit-un-saas-en-30-jours",
    title: "Comment on construit un SaaS en 30 jours",
    title_en: "How we build a SaaS in 30 days",
    excerpt:
      "Notre processus pour passer d'une idée à un produit live en 30 jours.",
    excerpt_en:
      "Our process to go from idea to live product in 30 days.",
    content: `# Comment on construit un SaaS en 30 jours

Le délai standard pour construire un SaaS est mesuré en mois, voire en années. Chez Etudia, nous avons développé un processus qui permet de passer du concept au produit lancé en 30 jours.

## Le processus

### Semaine 1 : Validation
- Recherche de marché
- Validation du besoin
- Design des mockups

### Semaine 2-3 : Développement MVP
- Stack technologique rapide
- Développement frontend et backend
- Intégration des paiements

### Semaine 4 : Lancement et partenaires
- Tests finaux
- Configuration des environnements
- Lancement avec nos créateurs partenaires

## Les outils

- Next.js pour la vitesse
- Supabase pour la base de données
- Stripe pour les paiements
- Vercel pour le déploiement

## Les résultats

Nos deux premiers SaaS lancés en 30 jours ont généré des revenus en première semaine. La vitesse est un avantage compétitif réel.

## Les leçons

1. Minimiser les features, maximiser la valeur
2. Automatiser tout ce qui peut l'être
3. Impliquer les partenaires tôt dans le processus

C'est possible. Venez nous rejoindre.`,
    content_en: `# How we build a SaaS in 30 days

The standard timeline for building a SaaS is measured in months, sometimes years. At Etudia, we've developed a process that takes us from concept to launched product in 30 days.

## The process

### Week 1: Validation
- Market research
- Need validation
- Mockup design

### Week 2-3: MVP Development
- Fast technology stack
- Frontend and backend development
- Payment integration

### Week 4: Launch and Partners
- Final testing
- Environment setup
- Launch with partner creators

## The tools

- Next.js for speed
- Supabase for database
- Stripe for payments
- Vercel for deployment

## The results

Our first two SaaS products launched in 30 days generated revenue in the first week. Speed is a real competitive advantage.

## The lessons

1. Minimize features, maximize value
2. Automate everything that can be automated
3. Involve partners early in the process

It's possible. Come join us.`,
    cover_image_url: null,
    tags: ["build-in-public", "tutoriels"],
    published: true,
    published_at: "2025-02-05",
    created_at: "2025-02-05",
    updated_at: "2025-02-05",
    reading_time_minutes: 5,
  },
]

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (data) {
      return data as BlogPost
    }
  } catch {
    // Fall back to mock data
  }

  return mockBlogPosts.find((post) => post.slug === slug) || null
}

interface BlogArticlePageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Article not found",
    }
  }

  const title = locale === "en" ? post.title_en || post.title : post.title
  const description =
    locale === "en" ? post.excerpt_en || post.excerpt : post.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at || undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
    },
  }
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const locale = await getLocale()
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const title = locale === "en" ? post.title_en || post.title : post.title
  const content =
    locale === "en"
      ? post.content_en || post.content
      : post.content

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  const readingTime = Math.ceil(content.split(/\s+/).length / 200)

  const backLabel = locale === "en" ? "Back to blog" : "Retour au blog"
  const cta1Label = locale === "en" ? "I'm a creator" : "Je suis créateur"
  const cta2Label = locale === "en" ? "I have an idea" : "J'ai une idée"
  const ctaTitle = locale === "en" ? "Ready to join Etudia?" : "Prêt à rejoindre Etudia ?"
  const ctaSubtitle = locale === "en" ? "Whether you're a creator or have a SaaS idea" : "Que vous soyez créateur ou que vous ayez une idée de SaaS"

  return (
    <div className="min-h-screen bg-background">
      {post.cover_image_url && (
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-500/20 dark:to-purple-500/20">
          <img
            src={post.cover_image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Button>
        </Link>

        <article>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-4">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-card-border">
            <time className="text-sm text-foreground/70">
              {publishedDate}
            </time>
            <span className="text-sm text-foreground/70">
              {readingTime} min {locale === "en" ? "read" : "de lecture"}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-foreground mt-8 mb-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-foreground mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-foreground mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-foreground/80 space-y-2 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-foreground/80">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="bg-card-border text-accent px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/70 my-4">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline">
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-card-border">
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] text-foreground mb-3">
              {ctaTitle}
            </h3>
            <p className="text-foreground/70 mb-6">
              {ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/devenir-partenaire">
                <Button variant="primary">{cta1Label}</Button>
              </Link>
              <Link href="/soumettre-idee">
                <Button variant="secondary">{cta2Label}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
