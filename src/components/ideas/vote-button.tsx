'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ThumbsUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

interface VoteButtonProps {
  ideaId: string;
  initialVotes: number;
  onVoteChange?: (newCount: number) => void;
}

export function VoteButton({ ideaId, initialVotes, onVoteChange }: VoteButtonProps) {
  const locale = useLocale();
  const supabase = createClient();
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const labels = locale === 'fr' ? {
    alreadyVoted: 'Vous avez déjà voté pour cette idée.',
    voteSuccess: 'Vote enregistré !',
  } : {
    alreadyVoted: 'You already voted for this idea.',
    voteSuccess: 'Vote recorded!',
  };

  useEffect(() => {
    const voteKey = `voted_${ideaId}`;
    const existingVote = localStorage.getItem(voteKey);
    setHasVoted(!!existingVote);
  }, [ideaId]);

  const generateVoterId = (): string => {
    let voterId = localStorage.getItem('etudia_voter_id');
    if (!voterId) {
      voterId = Math.random().toString(36).substring(2);
      localStorage.setItem('etudia_voter_id', voterId);
    }
    return voterId;
  };

  const handleVote = async () => {
    if (hasVoted || loading) return;

    setLoading(true);

    try {
      const voterId = generateVoterId();
      const { error } = await supabase.from('idea_votes').insert({
        idea_id: ideaId,
        voter_id: voterId,
      });

      if (error) throw error;

      const newVoteCount = votes + 1;
      setVotes(newVoteCount);
      setHasVoted(true);
      localStorage.setItem(`voted_${ideaId}`, 'true');

      toast.success(labels.voteSuccess);

      if (onVoteChange) {
        onVoteChange(newVoteCount);
      }
    } catch (err) {
      console.error('Failed to vote:', err);
      toast.error('Failed to vote');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (hasVoted) {
      toast.error(labels.alreadyVoted);
      return;
    }
    handleVote();
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={loading}
      whileHover={!hasVoted ? { scale: 1.05 } : {}}
      whileTap={!hasVoted ? { scale: 0.95 } : {}}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg',
        'font-semibold text-sm transition-all duration-200',
        hasVoted
          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30 cursor-default'
          : 'bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500/50 text-zinc-950 dark:text-white dark:hover:text-indigo-300'
      )}
    >
      <motion.div
        key={votes}
        initial={{ scale: 1 }}
        animate={hasVoted ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <ThumbsUp
          className={cn('w-4 h-4', hasVoted && 'fill-current')}
        />
      </motion.div>
      <span>{votes}</span>
    </motion.button>
  );
}
