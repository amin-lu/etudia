"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Repeat, Smile, Heart, Eye } from 'lucide-react'

interface WhyCreatorItem {
  icon: React.ReactNode
  titleKey: string
  descKey: string
}

export function WhyCreators() {
  const t = useTranslations('home.whyCreators')

  const items: WhyCreatorItem[] = [
    {
      icon: <Repeat className="w-8 h-8" />,
      titleKey: 'item1.title',
      descKey: 'item1.description',
    },
    {
      icon: <Smile className="w-8 h-8" />,
      titleKey: 'item2.title',
      descKey: 'item2.description',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titleKey: 'item3.title',
      descKey: 'item3.description',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      titleKey: 'item4.title',
      descKey: 'item4.description',
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{}}
          whileInView={{ transition: { staggerChildren: 0.1 } }}
          viewport={{ once: true }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              <div className="flex justify-start mb-4">
                <div className="p-3 bg-accent/10 rounded-full text-accent">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {t(item.titleKey)}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
