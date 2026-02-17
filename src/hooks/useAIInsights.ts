import { useState, useEffect } from 'react';
import type { WasteRecord, AIInsight } from '../types/waste';

export function useAIInsights(records: WasteRecord[]) {
  const [insights, setInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    if (records.length === 0) return;

    // Analyze trends and generate insights
    const newInsights: AIInsight[] = [];

    // Calculate week-over-week change
    const currentWeek = records.slice(0, 7);
    const previousWeek = records.slice(7, 14);
    
    const currentTotal = currentWeek.reduce((sum, r) => sum + r.waste_amount, 0);
    const previousTotal = previousWeek.reduce((sum, r) => sum + r.waste_amount, 0);
    const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;

    if (Math.abs(percentChange) > 10) {
      newInsights.push({
        id: 'trend-1',
        type: 'trend',
        title: 'Significant Waste Change Detected',
        description: `Waste has ${percentChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(percentChange).toFixed(1)}% compared to last week`,
        impact: Math.abs(percentChange),
        confidence: 90,
        date: new Date().toISOString()
      });
    }

    // Analyze patterns by category
    const categoryTotals = records.reduce((acc, record) => {
      acc[record.category] = (acc[record.category] || 0) + record.waste_amount;
      return acc;
    }, {} as Record<string, number>);

    const highestCategory = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)[0];

    if (highestCategory) {
      newInsights.push({
        id: 'pattern-1',
        type: 'prediction',
        title: 'Category Analysis',
        description: `${highestCategory[0]} represents the highest waste category. Consider reviewing handling procedures.`,
        impact: 75,
        confidence: 85,
        date: new Date().toISOString()
      });
    }

    setInsights(newInsights);
  }, [records]);

  return insights;
}