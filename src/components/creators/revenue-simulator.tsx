'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function RevenueSimulator() {
  const t = useTranslations('creators.simulator');

  const [subscribers, setSubscribers] = useState(10000);
  const [conversionRate, setConversionRate] = useState(2);
  const [monthlyPrice, setMonthlyPrice] = useState(12.9);
  const [commissionRate, setCommissionRate] = useState(40);

  const estimatedRevenue = useMemo(() => {
    return subscribers * (conversionRate / 100) * monthlyPrice * (commissionRate / 100);
  }, [subscribers, conversionRate, monthlyPrice, commissionRate]);

  const annualRevenue = estimatedRevenue * 12;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-foreground mb-4 text-center">
          {t('title')}
        </h2>
        <p className="text-center text-foreground/70 mb-12">
          {t('subtitle')}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            'p-8 rounded-lg',
            'bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-500/10 dark:to-indigo-500/5',
            'border border-indigo-200 dark:border-indigo-500/20'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Subscribers Slider */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('labels.subscribers')}
              </label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-foreground/50 mt-2">
                {subscribers.toLocaleString()} {t('units.subscribers')}
              </p>
            </div>

            {/* Conversion Rate Slider */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('labels.conversionRate')} ({conversionRate.toFixed(1)}%)
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-foreground/50 mt-2">
                Min: 0.5% • Max: 10%
              </p>
            </div>

            {/* Monthly Price Slider */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('labels.monthlyPrice')} (€{monthlyPrice.toFixed(2)})
              </label>
              <input
                type="range"
                min="4.9"
                max="49.9"
                step="1"
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-foreground/50 mt-2">
                Min: €4.90 • Max: €49.90
              </p>
            </div>

            {/* Commission Rate Slider */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('labels.commissionRate')} ({commissionRate}%)
              </label>
              <input
                type="range"
                min="30"
                max="50"
                step="5"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-foreground/50 mt-2">
                Min: 30% • Max: 50%
              </p>
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center pt-8 border-t border-indigo-500/20">
            <p className="text-foreground/60 text-sm mb-3">
              {t('result.label')}
            </p>
            <motion.div
              key={estimatedRevenue}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-bold text-indigo-500 font-[family-name:var(--font-display)] mb-1"
            >
              €{estimatedRevenue.toFixed(2)}
            </motion.div>
            <p className="text-foreground/50 text-sm mb-4">
              {t('result.perMonth')}
            </p>
            <p className="text-foreground/60 text-sm mb-6">
              {t('result.perYear')}: €{annualRevenue.toFixed(2)}
            </p>
            <p className="text-foreground/40 text-xs">
              {subscribers.toLocaleString()} × {conversionRate.toFixed(1)}% × €{monthlyPrice.toFixed(2)} × {commissionRate}% = €{estimatedRevenue.toFixed(2)}/mois
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
