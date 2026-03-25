"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, Users, BookOpen } from 'lucide-react'

function PhoneMockup({ color, appName, delay }: { color: string; appName: string; delay: number }) {
  return (
    <motion.div
      className="relative w-[100px] sm:w-[140px] lg:w-[180px] h-[200px] sm:h-[280px] lg:h-[360px] rounded-[1.5rem] sm:rounded-[2rem] border-2 border-white/10 dark:border-white/10 bg-zinc-900/80 dark:bg-zinc-900/90 shadow-2xl overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>
        <div className="w-8 h-1.5 rounded-full bg-white/20" />
      </div>

      {/* App header */}
      <div className={`mx-3 mt-1 rounded-xl p-3 ${color}`}>
        <div className="text-white font-semibold text-xs">{appName}</div>
        <div className="w-16 h-1 rounded-full bg-white/40 mt-1.5" />
      </div>

      {/* Quiz cards */}
      <div className="px-3 mt-3 space-y-2">
        <div className="bg-white/5 rounded-lg p-2.5">
          <div className="w-full h-1.5 rounded-full bg-white/15" />
          <div className="w-3/4 h-1.5 rounded-full bg-white/10 mt-1.5" />
          <div className="flex gap-1.5 mt-2.5">
            <div className={`flex-1 h-6 rounded-md ${color} opacity-80`} />
            <div className="flex-1 h-6 rounded-md bg-white/10" />
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5">
          <div className="w-full h-1.5 rounded-full bg-white/15" />
          <div className="w-1/2 h-1.5 rounded-full bg-white/10 mt-1.5" />
          <div className="flex gap-1.5 mt-2.5">
            <div className="flex-1 h-6 rounded-md bg-white/10" />
            <div className={`flex-1 h-6 rounded-md ${color} opacity-80`} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-3 mt-3">
        <div className="flex items-center justify-between mb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
          <div className="w-6 h-1 rounded-full bg-white/15" />
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${color}`}
            initial={{ width: "0%" }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-around border-t border-white/5">
        <div className="w-4 h-4 rounded-full bg-white/15" />
        <div className={`w-4 h-4 rounded-full ${color} opacity-60`} />
        <div className="w-4 h-4 rounded-full bg-white/15" />
      </div>
    </motion.div>
  )
}

export function Hero() {
  const t = useTranslations('home.hero')

  const stats = [
    { icon: Rocket, value: '2', label: t('stats.apps') },
    { icon: Users, value: '500+', label: t('stats.students') },
    { icon: BookOpen, value: '3', label: t('stats.fields') },
  ]

  return (
    <section className="relative lg:min-h-[100dvh] flex items-start lg:items-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/20 via-purple-500/15 to-amber-500/10 dark:from-indigo-500/30 dark:via-purple-500/20 dark:to-amber-500/10 rounded-full filter blur-[120px]" />
      </div>

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 md:py-32">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-6 gradient-text leading-[1.1]">
                {t('title')}
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-slate-600 dark:text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Stats bar */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</span>
                    <span className="text-sm text-slate-500 dark:text-white/50 ml-1">{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            >
              <a href="#applications">
                <Button variant="cta" size="lg">
                  {t('cta1')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <Link href="/devenir-partenaire">
                <Button variant="secondary" size="lg">
                  {t('cta2')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Phone mockups */}
          <motion.div
            className="flex justify-center lg:justify-end items-end gap-4 lg:gap-6 mt-8 lg:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="translate-y-8">
              <PhoneMockup color="bg-emerald-500" appName="ETUDIET" delay={0.5} />
            </div>
            <div className="-translate-y-4">
              <PhoneMockup color="bg-blue-500" appName="BacSuccess" delay={0.7} />
            </div>
            <div className="translate-y-12 hidden sm:block">
              <PhoneMockup color="bg-purple-500" appName="EtuDroit" delay={0.9} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
