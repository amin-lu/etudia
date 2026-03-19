'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function IdeaForm() {
  const locale = useLocale();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [hasAudience, setHasAudience] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    niche: '',
    problem: '',
    target_audience: '',
    has_audience: false,
    audience_details: '',
    suggested_price: '',
    submitter_email: '',
  });

  const labels = locale === 'fr' ? {
    title: 'Propose ton idée',
    saasName: 'Nom du SaaS',
    niche: 'Niche / Catégorie',
    problem: 'Problème à résoudre',
    targetAudience: 'Public cible',
    hasAudience: "J'ai une audience pour promouvoir ce SaaS",
    audienceDetails: 'Détails de ton audience',
    suggestedPrice: 'Prix suggéré (€/mois)',
    email: 'Email',
    optional: '(optionnel)',
    submit: 'Soumettre l\'idée',
    submitting: 'Envoi...',
    successToast: 'Idée soumise avec succès !',
    errorToast: 'Une erreur est survenue. Réessayez.',
    minChars: 'Min. 20 caractères',
  } : {
    title: 'Submit your idea',
    saasName: 'SaaS name',
    niche: 'Niche / Category',
    problem: 'Problem to solve',
    targetAudience: 'Target audience',
    hasAudience: 'I have an audience to promote this SaaS',
    audienceDetails: 'Audience details',
    suggestedPrice: 'Suggested price (€/month)',
    email: 'Email',
    optional: '(optional)',
    submit: 'Submit idea',
    submitting: 'Sending...',
    successToast: 'Idea submitted successfully!',
    errorToast: 'Something went wrong. Please try again.',
    minChars: 'Min. 20 characters',
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    if (name === 'problem') {
      setCharCount(value.length);
    }
  };

  const handleAudienceCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setHasAudience(checked);
    setFormData((prev) => ({
      ...prev,
      has_audience: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: dbError } = await supabase.from('saas_ideas').insert({
        name: formData.name,
        niche: formData.niche,
        problem: formData.problem,
        target_audience: formData.target_audience,
        has_audience: formData.has_audience,
        audience_details: formData.audience_details || null,
        suggested_price: formData.suggested_price ? parseFloat(formData.suggested_price) : null,
        submitter_email: formData.submitter_email,
        status: 'submitted',
      });

      if (dbError) throw dbError;

      toast.success(labels.successToast);
      setFormData({
        name: '',
        niche: '',
        problem: '',
        target_audience: '',
        has_audience: false,
        audience_details: '',
        suggested_price: '',
        submitter_email: '',
      });
      setHasAudience(false);
      setCharCount(0);
    } catch (err) {
      toast.error(labels.errorToast);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {labels.saasName}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
            'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder="Ex: JardinPro"
        />
      </div>

      {/* Niche */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {labels.niche}
        </label>
        <input
          type="text"
          name="niche"
          value={formData.niche}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
            'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder="Ex: Jardinage"
        />
      </div>

      {/* Problem */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            {labels.problem}
          </label>
          <span className={cn(
            'text-xs',
            charCount < 20 ? 'text-red-500 dark:text-red-400' : 'text-zinc-500 dark:text-zinc-400'
          )}>
            {charCount}/20 {labels.minChars}
          </span>
        </div>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          required
          minLength={20}
          rows={4}
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
            'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder="Quel problème ce SaaS résout-il ?"
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {labels.targetAudience}
        </label>
        <textarea
          name="target_audience"
          value={formData.target_audience}
          onChange={handleChange}
          required
          rows={3}
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
            'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder="Qui sont les utilisateurs ?"
        />
      </div>

      {/* Has Audience */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="has_audience"
          checked={hasAudience}
          onChange={handleAudienceCheckbox}
          className="w-4 h-4 rounded accent-indigo-500"
        />
        <label className="text-sm font-medium text-foreground">{labels.hasAudience}</label>
      </div>

      {/* Audience Details (conditional) */}
      {hasAudience && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            {labels.audienceDetails}
          </label>
          <textarea
            name="audience_details"
            value={formData.audience_details}
            onChange={handleChange}
            rows={3}
            className={cn(
              'w-full px-4 py-2 rounded-lg',
              'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
              'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
              'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
            )}
            placeholder="Ex: YouTube 15K abonnés"
          />
        </motion.div>
      )}

      {/* Suggested Price */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {labels.suggestedPrice} {labels.optional}
        </label>
        <input
          type="number"
          name="suggested_price"
          value={formData.suggested_price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
            'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder="9.90"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {labels.email}
        </label>
        <input
          type="email"
          name="submitter_email"
          value={formData.submitter_email}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
            'text-zinc-950 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder="toi@example.com"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || charCount < 20}
        className={cn(
          'w-full px-6 py-3 rounded-lg font-semibold',
          'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed',
          'text-white transition-colors duration-200'
        )}
      >
        {loading ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
