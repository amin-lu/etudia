'use client'

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { IdeaForm } from '@/components/ideas/idea-form';
import { IdeaWall } from '@/components/ideas/idea-wall';

export default function SoumettreIdeePage() {
  const locale = useLocale();

  const labels = locale === 'fr' ? {
    title: 'Soumettre une idée de SaaS',
    subtitle: 'Vous avez identifié un besoin ? Proposez une idée de SaaS',
    description: 'Aidez-nous à identifier les prochaines niches à explorer. Vos meilleures idées pourraient devenir nos prochains SaaS.',
    wallTitle: 'Idées de la communauté',
  } : {
    title: 'Submit a SaaS Idea',
    subtitle: 'Identified a need? Propose a SaaS idea',
    description: 'Help us identify the next niches to explore. Your best ideas could become our next SaaS.',
    wallTitle: 'Community ideas',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-zinc-950 dark:text-white mb-4">
            {labels.title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-3">
            {labels.subtitle}
          </p>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            {labels.description}
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-8 sticky top-4">
              <IdeaForm />
            </div>
          </motion.div>

          {/* Right: Idea Wall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-zinc-950 dark:text-white mb-6">
                {labels.wallTitle}
              </h2>
              <IdeaWall />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
