import React from 'react';
import { TrendingUp, TrendingDown, Minus, Leaf } from 'lucide-react';
import type { SustainabilityScore } from '../../types/waste';

interface Props {
  data: SustainabilityScore;
}

export function SustainabilityScore({ data }: Props) {
  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Sustainability Score</h3>
        <Leaf className="w-6 h-6 text-green-500" />
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl font-bold">{data.score}</div>
        {getTrendIcon()}
      </div>

      <div className="space-y-4">
        {data.factors.map((factor, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-3">
            <div className="text-sm font-medium">{factor.category}</div>
            <div className="text-sm text-gray-600">{factor.suggestion}</div>
          </div>
        ))}
      </div>
    </div>
  );
}