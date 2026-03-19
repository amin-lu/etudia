'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Advantages } from '@/components/creators/advantages';
import { RevenueSimulator } from '@/components/creators/revenue-simulator';
import { Steps } from '@/components/creators/steps';
import { FAQ } from '@/components/creators/faq';
import { ApplicationForm } from '@/components/creators/application-form';

export default function DevnirPartenairePage() {
  const t = useTranslations('creators.hero');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-display)] text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8">
            {t('subtitle')}
          </p>
          <button className="px-8 py-3 rounded-lg bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold transition-colors">
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
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-card-border">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground mb-4 text-center">
              Rejoignez-nous
            </h2>
            <p className="text-center text-foreground/70 mb-12">
              Remplissez le formulaire pour devenir partenaire
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-card-border rounded-lg p-8"
          >
            <ApplicationForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
