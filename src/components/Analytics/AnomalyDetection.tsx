import React from 'react';
import { AlertOctagon, Activity } from 'lucide-react';
import { analyzeWastePatterns } from '../../lib/ml/anomalyDetection';
import type { WasteRecord } from '../../types/waste';

interface Props {
  records: WasteRecord[];
}

export function AnomalyDetection({ records }: Props) {
  const analyzedData = analyzeWastePatterns(records);
  const anomalies = analyzedData.filter(record => record.isAnomaly);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-indigo-500" />
          <h3 className="text-lg font-semibold">Anomaly Detection</h3>
        </div>
        <span className="text-sm text-gray-500">
          {anomalies.length} anomalies detected
        </span>
      </div>

      <div className="space-y-4">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg"
          >
            <AlertOctagon className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <div className="font-medium">
                Unusual pattern detected
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {anomaly.waste_amount}kg waste recorded on{' '}
                {new Date(anomaly.date).toLocaleDateString()}
              </p>
              <div className="text-sm text-indigo-600 mt-2">
                Confidence: {anomaly.confidence.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}