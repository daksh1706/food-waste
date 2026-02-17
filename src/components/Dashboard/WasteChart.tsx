import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WasteRecord } from '../../types/waste';
import { formatWasteRecords } from '../../utils/chartFormatters';

interface WasteChartProps {
  data: WasteRecord[];
}

export function WasteChart({ data }: WasteChartProps) {
  const chartData = formatWasteRecords(data);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Waste Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tickFormatter={(value) => value.split('-').slice(1).join('/')}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${Number(value).toFixed(1)} kg`, 'Waste Amount']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#3B82F6"
              name="Waste Amount"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}