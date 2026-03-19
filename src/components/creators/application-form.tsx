'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

type Platform = 'youtube' | 'tiktok' | 'instagram' | 'x' | 'linkedin' | 'twitch' | 'other';

export function ApplicationForm() {
  const t = useTranslations('creators.form');
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'youtube' as Platform,
    profile_url: '',
    followers_count: '',
    niche: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t('error'));
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error(t('error'));
      return false;
    }
    if (!formData.profile_url.trim()) {
      toast.error(t('error'));
      return false;
    }
    if (!formData.followers_count.trim() || isNaN(Number(formData.followers_count))) {
      toast.error(t('error'));
      return false;
    }
    if (!formData.niche.trim()) {
      toast.error(t('error'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error: dbError } = await supabase.from('creator_applications').insert({
        name: formData.name,
        email: formData.email,
        platform: formData.platform,
        profile_url: formData.profile_url,
        followers_count: formData.followers_count,
        niche: formData.niche,
        message: formData.message || null,
        status: 'pending',
      });

      if (dbError) {
        throw dbError;
      }

      setSuccess(true);
      toast.success(t('success'));
      setFormData({
        name: '',
        email: '',
        platform: 'youtube',
        profile_url: '',
        followers_count: '',
        niche: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'p-8 rounded-lg',
          'bg-gradient-to-br from-green-500/10 to-transparent',
          'border border-green-500/30'
        )}
      >
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Candidature reçue
          </h3>
          <p className="text-foreground/70 text-sm">
            Merci ! Nous examinerons votre candidature très bientôt.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4')}>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.name')}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder={t('placeholders.name')}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.email')}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder={t('placeholders.email')}
        />
      </div>

      {/* Platform */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.platform')}
        </label>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
        >
          <option value="youtube">YouTube</option>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          <option value="x">X (Twitter)</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitch">Twitch</option>
          <option value="other">{t('fields.platformOther')}</option>
        </select>
      </div>

      {/* Profile URL */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.profileUrl')}
        </label>
        <input
          type="url"
          name="profile_url"
          value={formData.profile_url}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder={t('placeholders.profileUrl')}
        />
      </div>

      {/* Followers Count */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.followersCount')}
        </label>
        <input
          type="number"
          name="followers_count"
          value={formData.followers_count}
          onChange={handleChange}
          required
          min="0"
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder={t('placeholders.followersCount')}
        />
      </div>

      {/* Niche */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.niche')}
        </label>
        <input
          type="text"
          name="niche"
          value={formData.niche}
          onChange={handleChange}
          required
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder={t('placeholders.niche')}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.message')} <span className="text-foreground/50">({t('optional')})</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-card-border',
            'text-foreground placeholder-foreground/40',
            'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50'
          )}
          placeholder={t('placeholders.message')}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full px-6 py-3 rounded-lg font-semibold',
          'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed',
          'text-white transition-colors duration-200'
        )}
      >
        {loading ? t('submitting') : 'Soumettre ma candidature'}
      </button>
    </form>
  );
}
