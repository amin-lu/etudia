'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SaasIdea } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';
import { VoteButton } from './vote-button';

type SortOption = 'votes' | 'recent';

const mockIdeas: SaasIdea[] = [
  {
    id: '1',
    name: 'JuriQuiz',
    niche: 'Droit',
    problem: "Les étudiants en droit n'ont aucune plateforme de QCM structurée par matière et par année.",
    target_audience: 'Étudiants en Licence et Master de Droit',
    has_audience: false,
    audience_details: null,
    suggested_price: 12.9,
    submitter_email: '',
    votes_count: 47,
    status: 'evaluating',
    admin_notes: null,
    created_at: '2025-02-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'BricoHelper',
    niche: 'Bricolage',
    problem: "Les débutants en bricolage ne savent pas par où commencer.",
    target_audience: 'Bricoleurs débutants',
    has_audience: true,
    audience_details: 'TikTok 45K',
    suggested_price: 8.9,
    submitter_email: '',
    votes_count: 23,
    status: 'submitted',
    admin_notes: null,
    created_at: '2025-02-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'GreenThumb',
    niche: 'Jardinage',
    problem: "Savoir quoi planter, quand, et comment entretenir selon sa région et la saison.",
    target_audience: 'Jardiniers amateurs',
    has_audience: true,
    audience_details: 'YouTube 15K',
    suggested_price: 9.9,
    submitter_email: '',
    votes_count: 31,
    status: 'submitted',
    admin_notes: null,
    created_at: '2025-02-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'PrepaConcours',
    niche: 'Éducation',
    problem: "La préparation aux concours de la fonction publique est chère et les plateformes existantes sont datées.",
    target_audience: 'Candidats aux concours publics',
    has_audience: false,
    audience_details: null,
    suggested_price: 15.9,
    submitter_email: '',
    votes_count: 65,
    status: 'evaluating',
    admin_notes: null,
    created_at: '2025-02-05T00:00:00Z',
  },
];

const getStatusLabel = (status: string, locale: string): string => {
  const statusMap: Record<string, Record<string, string>> = {
    submitted: { fr: 'Soumise', en: 'Submitted' },
    evaluating: { fr: 'En évaluation', en: 'Evaluating' },
    developing: { fr: 'En développement', en: 'Developing' },
    approved: { fr: 'Approuvée', en: 'Approved' },
  };
  return statusMap[status]?.[locale] || status;
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'submitted':
      return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400';
    case 'evaluating':
      return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
    case 'developing':
      return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400';
    case 'approved':
      return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400';
    default:
      return 'bg-zinc-200 dark:bg-zinc-700/20 text-zinc-600 dark:text-zinc-400';
  }
};

export function IdeaWall() {
  const locale = useLocale();
  const supabase = createClient();
  const [ideas, setIdeas] = useState<SaasIdea[]>(mockIdeas);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('votes');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saas_ideas')
        .select('*')
        .order(sortBy === 'votes' ? 'votes_count' : 'created_at', {
          ascending: false,
        });

      if (error) {
        console.error('Error fetching ideas:', error);
        setIdeas(mockIdeas);
      } else {
        setIdeas(data || mockIdeas);
      }
    } catch (err) {
      console.error('Error:', err);
      setIdeas(mockIdeas);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    const sorted = [...ideas].sort((a, b) => {
      if (newSort === 'votes') {
        return b.votes_count - a.votes_count;
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    setIdeas(sorted);
  };

  const handleVoteChange = (ideaId: string, newCount: number) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId ? { ...idea, votes_count: newCount } : idea
      )
    );
  };

  const labels = locale === 'fr' ? {
    sortVotes: 'Plus votées',
    sortRecent: 'Plus récentes',
    loading: 'Chargement...',
    noIdeas: 'Aucune idée pour le moment.',
  } : {
    sortVotes: 'Most voted',
    sortRecent: 'Most recent',
    loading: 'Loading...',
    noIdeas: 'No ideas yet.',
  };

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange('votes')}
          className={cn(
            'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
            sortBy === 'votes'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-500/50'
          )}
        >
          {labels.sortVotes}
        </button>
        <button
          onClick={() => handleSortChange('recent')}
          className={cn(
            'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
            sortBy === 'recent'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-500/50'
          )}
        >
          {labels.sortRecent}
        </button>
      </div>

      {/* Ideas Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-zinc-400">{labels.loading}</p>
        </div>
      ) : ideas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700">
          <Lightbulb className="w-12 h-12 text-zinc-500 dark:text-zinc-600 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 text-center">{labels.noIdeas}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'p-6 rounded-xl',
                'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700',
                'hover:border-indigo-500/50 transition-colors'
              )}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-2">
                    {idea.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                      {idea.niche}
                    </span>
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        getStatusColor(idea.status)
                      )}
                    >
                      {getStatusLabel(idea.status, locale)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-2">
                {idea.problem}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {idea.suggested_price && (
                    <span>{idea.suggested_price.toFixed(2)}€/mois</span>
                  )}
                </div>
                <VoteButton
                  ideaId={idea.id}
                  initialVotes={idea.votes_count}
                  onVoteChange={(newCount) =>
                    handleVoteChange(idea.id, newCount)
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
