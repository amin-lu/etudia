'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

type Platform = 'youtube' | 'tiktok' | 'instagram' | 'x' | 'linkedin' | 'twitch' | 'other';

export function ApplicationForm() {
  const t = useTranslations('creators.form');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'youtube' as Platform,
    profileUrl: '',
    followers: '',
    thematic: '',
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
    if (!formData.profileUrl.trim()) {
      toast.error(t('error'));
      return false;
    }
    if (!formData.followers.trim() || isNaN(Number(formData.followers))) {
      toast.error(t('error'));
      return false;
    }
    if (!formData.thematic.trim()) {
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
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          platform: formData.platform,
          profileUrl: formData.profileUrl,
          followers: formData.followers,
          thematic: formData.thematic,
          message: formData.message || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la soumission');
      }

      setSuccess(true);
      toast.success(t('success'));
      setFormData({
        name: '',
        email: '',
        platform: 'youtube',
        profileUrl: '',
        followers: '',
        thematic: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
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
            {t('successTitle')}
          </h3>
          <p className="text-foreground/70 text-sm">
            {t('successMessage')}
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
          name="profileUrl"
          value={formData.profileUrl}
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
          name="followers"
          value={formData.followers}
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

      {/* Thematic */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('fields.niche')}
        </label>
        <input
          type="text"
          name="thematic"
          value={formData.thematic}
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
        {loading ? t('submitting') : t('submitButton')}
      </button>
    </form>
  );
}
