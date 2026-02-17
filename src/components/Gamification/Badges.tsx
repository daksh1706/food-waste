import React from 'react';
import { Award, Shield, Star } from 'lucide-react';
import type { Badge } from '../../types/gamification';

interface Props {
  badges: Badge[];
}

export function Badges({ badges }: Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award': return <Award className="w-6 h-6" />;
      case 'shield': return <Shield className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative p-4 rounded-lg border-2 ${
              badge.earned ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-2 ${badge.earned ? 'text-green-500' : 'text-gray-400'}`}>
                {getIcon(badge.icon)}
              </div>
              <div className="font-medium text-sm">{badge.name}</div>
              <div className="text-xs text-gray-500 mt-1">{badge.description}</div>
              {!badge.earned && badge.progress > 0 && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}