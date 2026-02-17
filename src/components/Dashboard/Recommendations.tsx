import React from 'react';
import { Lightbulb, TrendingDown, AlertTriangle } from 'lucide-react';
import { Recommendation } from '../../types/waste';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              <h4 className="font-medium">{rec.title}</h4>
            </div>
            <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-medium ${getImpactColor(rec.impact)}`}>
                Impact: {rec.impact}
              </span>
              <span className="text-xs text-gray-500">Category: {rec.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}