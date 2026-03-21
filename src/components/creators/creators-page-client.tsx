'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Advantages } from '@/components/creators/advantages';
import { RevenueSimulator } from '@/components/creators/revenue-simulator';
import { Steps } from '@/components/creators/steps';
import { FAQ } from '@/components/creators/faq';
import { ApplicationForm } from '@/components/creators/application-form';

export function CreatorsPageClient({ locale }: { locale: string }) {
  const t = useTranslations('creators.hero');
  const formT = useTranslations('creators.form');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-display)] text-foreground mb-5 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 mb-10">
            {t('subtitle')}
          </p>
          <button className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors shadow-lg shadow-amber-500/25">
            {t('cta')}
          </button>
        </motion.div>
      </section>

      {/* Advantages */}
      <Advantages />

      {/* Revenue Simulator */}
      <RevenueSimulator />

      {/* Steps */}
      <Steps />

      {/* FAQ */}
      <FAQ />

      {/* Application Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground mb-4 text-center tracking-tight">
              {formT('title')}
            </h2>
            <p className="text-center text-slate-600 dark:text-white/50 mb-12">
              {formT('subtitle')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-8"
          >
            <ApplicationForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
