'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FAQ() {
  const t = useTranslations('creators.faq');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqItems = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground mb-12 text-center">
          {t('title')}
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={false}
              className={cn(
                'rounded-lg border transition-colors',
                expandedId === index
                  ? 'bg-card border-indigo-500/50'
                  : 'bg-card border-card-border hover:border-card-border/80'
              )}
            >
              <button
                onClick={() => setExpandedId(expandedId === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card/80 transition-colors"
              >
                <span className="font-semibold text-foreground">{item.q}</span>
                <motion.div
                  animate={{ rotate: expandedId === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-indigo-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-card-border"
                  >
                    <p className="px-6 py-4 text-foreground/70 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
