'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export function Steps() {
  const t = useTranslations('creators.steps');

  const steps = [
    { number: 1, key: 'choose' },
    { number: 2, key: 'assets' },
    { number: 3, key: 'promote' },
    { number: 4, key: 'earn' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.key}
              custom={step.number - 1}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="relative"
            >
              {step.number < 4 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-500/20" />
              )}

              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'w-24 h-24 rounded-full mb-4',
                    'bg-indigo-500/10 border-2 border-indigo-500',
                    'flex items-center justify-center',
                    'font-bold text-2xl text-indigo-500 font-[family-name:var(--font-display)]'
                  )}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`items.${step.key}.title`)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
