"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function SocialProof() {
  const t = useTranslations('home');
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-12 px-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
            {t('socialProof.title')}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-xl mx-auto">
            {t('socialProof.subtitle')}
          </p>
          <Link
            href="/devenir-partenaire"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
          >
            {t('socialProof.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
