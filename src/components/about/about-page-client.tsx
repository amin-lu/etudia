'use client'

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Eye,
  Zap,
  Scale,
  Shield,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function AboutPageClient({ locale }: { locale: string }) {
  const t = useTranslations("about")

  const values = [
    {
      icon: Eye,
      key: "value1",
    },
    {
      icon: Zap,
      key: "value2",
    },
    {
      icon: Scale,
      key: "value3",
    },
    {
      icon: Shield,
      key: "value4",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 grid-pattern opacity-10 dark:opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-500/30 dark:to-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-6 tracking-tight"
            variants={itemVariants}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {locale === "fr"
              ? "Un studio qui construit des SaaS. Les créateurs les distribuent. Tout le monde gagne."
              : "A studio that builds SaaS. Creators distribute them. Everyone wins."}
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-8 tracking-tight"
              variants={itemVariants}
            >
              {t("story.title")}
            </motion.h2>

            <motion.div className="space-y-6" variants={itemVariants}>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {t("story.content")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="bg-card/50 border-y border-card-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-12 tracking-tight"
              variants={itemVariants}
            >
              {t("manifesto.title")}
            </motion.h2>

            <motion.p
              className="text-lg text-foreground/80 leading-relaxed max-w-4xl"
              variants={itemVariants}
            >
              {t("manifesto.content")}
            </motion.p>

            <motion.div className="mt-8" variants={itemVariants}>
              <p className="text-lg text-foreground/80 leading-relaxed max-w-4xl">
                {locale === "fr"
                  ? "Pas d'ads. Pas de growth hacks. Juste des bons produits portés par les bonnes personnes."
                  : "No ads. No growth hacks. Just great products carried by the right people."}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-12 tracking-tight text-center"
              variants={itemVariants}
            >
              {t("values.title")}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Card
                      variant="interactive"
                      className="h-full border-card-border bg-card hover:border-zinc-400 dark:hover:border-white/20 rounded-xl"
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg w-fit">
                          <Icon className="w-6 h-6 text-indigo-500" />
                        </div>
                        <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-zinc-950 dark:text-zinc-50 mb-3">
                          {t(`values.${value.key}.title`)}
                        </h3>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                          {t(`values.${value.key}.description`)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 30-Day Program Section */}
      <section className="bg-card/50 border-y border-card-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-8 tracking-tight"
              variants={itemVariants}
            >
              {locale === "fr" ? "Programme SaaS en 30 jours" : "SaaS in 30 Days Program"}
            </motion.h2>

            <motion.p
              className="text-lg text-foreground/80 leading-relaxed max-w-4xl mb-12"
              variants={itemVariants}
            >
              {t("program.description")}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  week: locale === "fr" ? "Semaine 1" : "Week 1",
                  title: locale === "fr" ? "Validation" : "Validation",
                  items: [
                    locale === "fr" ? "Recherche de marché" : "Market research",
                    locale === "fr" ? "Validation du besoin" : "Need validation",
                    locale === "fr" ? "Design des mockups" : "Mockup design",
                  ],
                },
                {
                  week: locale === "fr" ? "Semaine 2-3" : "Week 2-3",
                  title: locale === "fr" ? "Développement" : "Development",
                  items: [
                    locale === "fr" ? "Stack technologique" : "Tech stack setup",
                    locale === "fr"
                      ? "Développement frontend/backend"
                      : "Frontend/backend dev",
                    locale === "fr"
                      ? "Intégration des paiements"
                      : "Payment integration",
                  ],
                },
                {
                  week: locale === "fr" ? "Semaine 4" : "Week 4",
                  title: locale === "fr" ? "Lancement" : "Launch",
                  items: [
                    locale === "fr" ? "Tests finaux" : "Final testing",
                    locale === "fr"
                      ? "Configuration des environnements"
                      : "Environment setup",
                    locale === "fr"
                      ? "Lancement avec partenaires"
                      : "Launch with partners",
                  ],
                },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={itemVariants}
                >
                  {index < 2 && (
                    <div className="hidden md:block absolute top-20 -right-3 w-6 h-1 bg-indigo-500/30" />
                  )}

                  <Card className="border-card-border bg-card h-full rounded-xl">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-500 text-xs font-bold rounded-full">
                          {phase.week}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold font-[family-name:var(--font-display)] text-zinc-950 dark:text-zinc-50 mb-4">
                        {phase.title}
                      </h3>
                      <ul className="space-y-2">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-1">•</span>
                            <span className="text-zinc-700 dark:text-zinc-300 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-xl p-8 md:p-12 text-center border border-indigo-300 dark:border-indigo-500/20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-4 tracking-tight"
              variants={itemVariants}
            >
              {locale === "fr" ? "Rejoins l'aventure" : "Join the adventure"}
            </motion.h2>

            <motion.p
              className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {t("cta.description")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link href="/devenir-partenaire">
                <Button variant="primary" size="lg">
                  {locale === "fr"
                    ? "Je suis créateur"
                    : "I'm a creator"}
                </Button>
              </Link>
              <Link href="/soumettre-idee">
                <Button variant="secondary" size="lg">
                  {locale === "fr"
                    ? "J'ai une idée de SaaS"
                    : "I have a SaaS idea"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
