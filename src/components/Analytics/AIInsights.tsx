import React from 'react';
import { Brain, TrendingUp, LineChart, Lightbulb } from 'lucide-react';
import type { AIInsight } from '../../types/waste';

interface Props {
  insights: AIInsight[];
}

export function AIInsights({ insights }: Props) {
  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-5 h-5" />;
      case 'prediction': return <LineChart className="w-5 h-5" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-purple-500" />
        <h3 className="text-lg font-semibold">AI Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="border-l-4 border-purple-500 pl-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              {getInsightIcon(insight.type)}
              <span className="font-medium">{insight.title}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-purple-600">
                Impact: {insight.impact}%
              </span>
              <span className="text-gray-500">
                Confidence: {insight.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}