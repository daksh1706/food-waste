import React from 'react';
import { AlertTriangle, AlertCircle, Bell } from 'lucide-react';
import type { WasteAlert } from '../../types/waste';

interface Props {
  alerts: WasteAlert[];
}

export function WasteAlerts({ alerts }: Props) {
  const getSeverityColor = (severity: WasteAlert['severity']) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">Alerts</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              {alert.severity === 'high' ? (
                <AlertTriangle className="w-5 h-5 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5" />
              )}
              <div>
                <div className="font-medium">{alert.type}</div>
                <p className="text-sm mt-1">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}