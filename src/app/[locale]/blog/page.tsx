import { getTranslations } from "next-intl/server"
import { createClient } from "@/lib/supabase/server"
import { BlogCard } from "@/components/blog/blog-card"
import { EmptyState } from "@/components/ui/empty-state"
import { BlogPost } from "@/lib/supabase/types"
import { FileText } from "lucide-react"

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
    reading_time_minutes: 3,
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

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })

    if (data && data.length > 0) {
      return data as BlogPost[]
    }
  } catch {
    // Fall back to mock data
  }

  return mockBlogPosts
}

export default async function BlogPage() {
  const t = await getTranslations("blog")
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-3">
              {t("title")}
            </h1>
            <p className="text-lg text-foreground/70">
              {t("subtitle")}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title={t("noResults")}
              description="Check back soon for new articles"
            />
          )}
        </div>
      </section>
    </div>
  )
}
