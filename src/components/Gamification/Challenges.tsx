import React from 'react';
import { Trophy, Users, Clock } from 'lucide-react';
import type { Challenge } from '../../types/gamification';

interface Props {
  challenges: Challenge[];
  onJoinChallenge: (challengeId: string) => void;
}

export function Challenges({ challenges, onJoinChallenge }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Monthly Challenges</h3>
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{challenge.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
              </div>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2 transition-all"
                  style={{ width: `${(challenge.currentProgress / challenge.target) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {challenge.participants} participants
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(challenge.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <button
              onClick={() => onJoinChallenge(challenge.id)}
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Join Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}