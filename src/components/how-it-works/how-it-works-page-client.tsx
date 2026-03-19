"use client"

import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Users, Lightbulb, CheckCircle, Code, Rocket, Share2, ArrowRight } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as const }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function HowItWorksPageClient({ locale }: { locale: string }) {
  const t = useTranslations('howItWorks')

  const timelineIcons = [Lightbulb, CheckCircle, Code, Rocket, Share2]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-6"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-foreground/70"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Section 1: SCHÉMA 3 ACTEURS */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* ETUDIA */}
            <motion.div variants={itemVariants} className="relative">
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                <ArrowRight className="w-8 h-8 text-indigo-500/60" />
              </div>
              <Card className="h-full border-border bg-card">
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6 text-indigo-500">
                    <Building2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {t('actors.studio.title')}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {t('actors.studio.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* CRÉATEURS */}
            <motion.div variants={itemVariants} className="relative">
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                <ArrowRight className="w-8 h-8 text-indigo-500/60" />
              </div>
              <Card className="h-full border-border bg-card">
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6 text-indigo-500">
                    <Users className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {t('actors.creators.title')}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {t('actors.creators.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* UTILISATEURS */}
            <motion.div variants={itemVariants} className="relative">
              <Card className="h-full border-border bg-card">
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6 text-indigo-500">
                    <Users className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {t('actors.users.title')}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {t('actors.users.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: POURQUOI ÇA MARCHE (3 blocs) */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground text-center mb-16"
            {...fadeInUp}
          >
            {t('whyItWorks.title')}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Pour Etudia */}
            <motion.div variants={itemVariants}>
              <Card className="h-full border-border bg-card rounded-xl">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {t('whyItWorks.etudia.title')}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.etudia.point1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.etudia.point2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.etudia.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pour les créateurs */}
            <motion.div variants={itemVariants}>
              <Card className="h-full border-border bg-card rounded-xl">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {t('whyItWorks.creators.title')}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.creators.point1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.creators.point2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.creators.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pour les utilisateurs */}
            <motion.div variants={itemVariants}>
              <Card className="h-full border-border bg-card rounded-xl">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {t('whyItWorks.users.title')}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.users.point1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.users.point2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{t('whyItWorks.users.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: PROCESSUS DE CONSTRUCTION (Timeline) */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground text-center mb-16"
            {...fadeInUp}
          >
            {t('process.title')}
          </motion.h2>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Timeline line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {[1, 2, 3, 4, 5].map((step, index) => {
                const Icon = timelineIcons[index]
                return (
                  <motion.div key={index} variants={itemVariants} className="relative">
                    {/* Timeline dot */}
                    <div className="flex justify-center mb-6 md:mb-8">
                      <div className="relative z-10 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center border-4 border-background">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Card */}
                    <Card className="h-full border-border bg-card rounded-xl">
                      <CardContent className="pt-6 text-center">
                        <p className="text-sm font-bold text-indigo-500 mb-2">
                          {t(`process.step${step}.number`)}
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {t(`process.step${step}.title`)}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {t(`process.step${step}.description`)}
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

      {/* Section 4: TRANSPARENCE */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-6"
            {...fadeInUp}
          >
            {t('transparency.title')}
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/70 mb-12 leading-relaxed"
            {...fadeInUp}
          >
            {t('transparency.description')}
          </motion.p>

          <motion.div
            className="flex justify-center"
            {...fadeInUp}
          >
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                {t('transparency.cta')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] text-foreground mb-6"
            {...fadeInUp}
          >
            {locale === 'fr'
              ? 'Prêt à rejoindre l\'aventure ?'
              : 'Ready to join the adventure?'}
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/70 mb-12 leading-relaxed"
            {...fadeInUp}
          >
            {locale === 'fr'
              ? 'Que vous soyez créateur, développeur ou vous ayez une excellente idée, il y a une place pour vous chez Etudia.'
              : 'Whether you\'re a creator, developer, or have a great idea, there\'s a place for you at Etudia.'}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            {...fadeInUp}
          >
            <Link href="/devenir-partenaire">
              <Button variant="primary" size="lg">
                {locale === 'fr'
                  ? 'Je suis créateur'
                  : 'I\'m a creator'}
              </Button>
            </Link>
            <Link href="/soumettre-idee">
              <Button variant="secondary" size="lg">
                {locale === 'fr'
                  ? 'J\'ai une idée'
                  : 'I have an idea'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
