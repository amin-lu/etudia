"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  const t = useTranslations('home');
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devenir-partenaire"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
            >
              {t('cta.partner')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 rounded-xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {t('cta.idea')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
