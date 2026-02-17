import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WasteRecord } from '../../types/waste';
import { formatComparisonData } from '../../utils/chartFormatters';

interface ComparisonChartProps {
  currentPeriod: WasteRecord[];
  previousPeriod: WasteRecord[];
  periodType: 'week' | 'month';
}

export function ComparisonChart({ currentPeriod, previousPeriod, periodType }: ComparisonChartProps) {
  const chartData = formatComparisonData(currentPeriod, previousPeriod, periodType);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Period Comparison</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${Number(value).toFixed(1)} kg`} />
            <Legend />
            <Bar 
              dataKey="amount" 
              fill="#3B82F6"
              name="Waste Amount (kg)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}