import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp } from 'lucide-react';
import { formatPredictionData } from '../../utils/predictionFormatters';
import type { WastePrediction } from '../../types/analytics';

interface Props {
  historicalData: number[];
  predictions: WastePrediction[];
}

export function WastePrediction({ historicalData, predictions }: Props) {
  const chartData = formatPredictionData(historicalData, predictions);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-500" />
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI Waste Forecast</h3>
          <p className="text-sm text-gray-600">Next 7 days prediction</p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)} kg`, 'Predicted Waste']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3B82F6"
              name="Historical"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8B5CF6"
              name="Predicted"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="font-medium">Trend Analysis</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {predictions[0]?.trend_description || 'Analyzing trends...'}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            <span className="font-medium">AI Insights</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {predictions[0]?.recommendation || 'Generating insights...'}
          </p>
        </div>
      </div>
    </div>
  );
}