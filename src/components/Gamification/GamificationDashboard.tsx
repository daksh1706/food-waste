import React from 'react';
import { Badges } from './Badges';
import { Challenges } from './Challenges';
import { useGamification } from '../../hooks/useGamification';

export function GamificationDashboard() {
  const { badges, challenges, joinChallenge } = useGamification();

  return (
    <div className="space-y-6">
      <Badges badges={badges} />
      <Challenges 
        challenges={challenges}
        onJoinChallenge={joinChallenge}
      />
    </div>
  );
}