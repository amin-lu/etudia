"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Rocket, Users, BookOpen, CheckCircle, Star, Brain, Shield, Award } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

const statIcons = [Rocket, Users, BookOpen, CheckCircle]
const statKeys = ['apps', 'students', 'fields', 'quizzes'] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
}

export function SocialProof() {
  const t = useTranslations('home.socialProof')

  const badgeIcons = [Brain, Award, Shield]
  const badgeKeys = ['science', 'creators', 'france'] as const

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats banner */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statKeys.map((key, i) => {
            const Icon = statIcons[i]
            const value = Number(t(`stats.${key}.value`))
            const label = t(`stats.${key}.label`)
            const suffix = t(`stats.${key}.suffix`)

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="text-center p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                />
                <p className="text-sm text-slate-500 dark:text-white/50 mt-1">{label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] tracking-tight text-center mb-4 text-slate-900 dark:text-white">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {(t.raw('testimonials.items') as Array<{ name: string; role: string; quote: string; rating: number; badge: string }>).map((item, i) => {
            const { name, role, quote, badge } = item
            const rating = Number(item.rating)
            const initials = name.split(' ').map((n: string) => n[0]).join('')

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{name}</p>
                    <p className="text-xs text-slate-500 dark:text-white/40">{role}</p>
                  </div>
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium">
                    {badge}
                  </span>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {badgeKeys.map((key, i) => {
            const Icon = badgeIcons[i]
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-sm text-slate-600 dark:text-white/50"
              >
                <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                {t(`badges.${key}`)}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
