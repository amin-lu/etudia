'use client';

import { Wallet, Code, Package, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const advantages = [
  { Icon: Wallet, key: 'commission' },
  { Icon: Code, key: 'code' },
  { Icon: Package, key: 'assets' },
  { Icon: BarChart3, key: 'dashboard' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Advantages() {
  const t = useTranslations('creators.advantages');

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {advantages.map(({ Icon, key }) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className={cn(
                'p-6 rounded-lg',
                'bg-card border border-card-border',
                'hover:border-accent/50 transition-colors duration-300'
              )}
            >
              <div className="mb-4">
                <Icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm text-foreground/70">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
