"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Hammer, Megaphone, Users, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

interface Step {
  icon: React.ReactNode
  titleKey: string
  descKey: string
}

export function HowItWorksSummary() {
  const t = useTranslations('home.howItWorks')
  const ct = useTranslations('common.buttons')

  const steps: Step[] = [
    {
      icon: <Hammer className="w-8 h-8" />,
      titleKey: 'step1.title',
      descKey: 'step1.description',
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      titleKey: 'step2.title',
      descKey: 'step2.description',
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleKey: 'step3.title',
      descKey: 'step3.description',
    },
  ]

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-display)] text-foreground mb-4 tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{}}
          whileInView={{ transition: { staggerChildren: 0.1 } }}
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-accent/10 rounded-full text-accent">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <Link href="/comment-ca-marche">
            <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {ct('learnMore')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
