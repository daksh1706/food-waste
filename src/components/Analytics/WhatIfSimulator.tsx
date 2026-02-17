import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sliders, Calculator } from 'lucide-react';
import { simulateWasteReduction } from '../../utils/simulationUtils';
import type { SimulationParams, SimulationResult } from '../../types/analytics';

export function WhatIfSimulator() {
  const [params, setParams] = useState<SimulationParams>({
    reductionTarget: 20,
    timeframe: 30,
    categories: ['perishable', 'packaging']
  });

  const [results, setResults] = useState<SimulationResult | null>(null);

  const handleSimulate = () => {
    const simulationResults = simulateWasteReduction(params);
    setResults(simulationResults);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-indigo-500" />
        <h3 className="text-xl font-bold text-gray-900">What-If Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reduction Target (%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={params.reductionTarget}
              onChange={(e) => setParams(p => ({ ...p, reductionTarget: Number(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600">{params.reductionTarget}%</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timeframe (days)
            </label>
            <select
              value={params.timeframe}
              onChange={(e) => setParams(p => ({ ...p, timeframe: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>

          <button
            onClick={handleSimulate}
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          >
            Run Simulation
          </button>
        </div>

        {results && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Projected Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Waste Reduction</span>
                <span className="font-medium">{results.projectedReduction.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost Savings</span>
                <span className="font-medium">${results.costSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Carbon Impact</span>
                <span className="font-medium">-{results.carbonReduction.toFixed(1)} kg CO₂</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}