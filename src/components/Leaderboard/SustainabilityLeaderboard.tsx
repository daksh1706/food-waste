import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  location: string;
  score: number;
  trend: number;
  rank: number;
}

interface Props {
  entries: LeaderboardEntry[];
}

export function SustainabilityLeaderboard({ entries }: Props) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Location Rankings</h3>
      
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getRankIcon(entry.rank)}
              <div>
                <div className="font-medium">{entry.location}</div>
                <div className="text-sm text-gray-500">
                  Score: {entry.score}
                </div>
              </div>
            </div>
            <div className={`text-sm ${
              entry.trend > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {entry.trend > 0 ? '+' : ''}{entry.trend}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}