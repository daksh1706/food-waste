import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Badge, Challenge } from '../types/gamification';

export function useGamification() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamificationData();
  }, []);

  const fetchGamificationData = async () => {
    try {
      const { data: badgesData } = await supabase
        .from('badges')
        .select('*')
        .order('created_at', { ascending: true });

      const { data: challengesData } = await supabase
        .from('challenges')
        .select('*')
        .gte('end_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (badgesData) setBadges(badgesData);
      if (challengesData) setChallenges(challengesData);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('challenge_participants')
        .insert([{ challenge_id: challengeId, user_id: user.id }]);

      if (!error) {
        setChallenges(current =>
          current.map(c =>
            c.id === challengeId
              ? { ...c, participants: (c.participants || 0) + 1 }
              : c
          )
        );
      }
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  return {
    badges,
    challenges,
    loading,
    joinChallenge
  };
}