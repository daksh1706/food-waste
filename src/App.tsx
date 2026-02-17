import React from 'react';
import { LiveTracker } from './components/Dashboard/LiveTracker';
import { WasteForm } from './components/Dashboard/WasteForm';
import { WasteChart } from './components/Dashboard/WasteChart';
import { DateRangeFilter } from './components/Dashboard/DateRangeFilter';
import { ExportButton } from './components/Dashboard/ExportButton';
import { ComparisonChart } from './components/Dashboard/ComparisonChart';
import { WastePrediction } from './components/Analytics/WastePrediction';
import { WhatIfSimulator } from './components/Analytics/WhatIfSimulator';
import { AIInsights } from './components/Analytics/AIInsights';
import { SustainabilityScore } from './components/Analytics/SustainabilityScore';
import { WasteAlerts } from './components/Alerts/WasteAlerts';
import { GamificationDashboard } from './components/Gamification/GamificationDashboard';
import { useDateRange } from './hooks/useDateRange';
import { useWasteRecords } from './hooks/useWasteRecords';
import { useFilteredRecords } from './hooks/useFilteredRecords';
import { useAIInsights } from './hooks/useAIInsights';

export default function App() {
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange(30);
  const { records, loading } = useWasteRecords();
  const { currentPeriodRecords, previousPeriodRecords } = useFilteredRecords(records, startDate, endDate);
  const insights = useAIInsights(records);

  const sustainabilityScore = {
    score: 85,
    trend: 'up' as const,
    factors: [
      {
        category: 'Waste Reduction',
        impact: 15,
        suggestion: 'Current waste levels are 15% below target'
      },
      {
        category: 'Carbon Footprint',
        impact: 10,
        suggestion: 'Reduced carbon emissions by optimizing disposal methods'
      }
    ]
  };

  const alerts = [
    {
      id: '1',
      type: 'threshold',
      severity: 'high' as const,
      message: 'Perishable waste exceeded daily threshold by 25%',
      date: new Date().toISOString()
    },
    {
      id: '2',
      type: 'expiry',
      severity: 'medium' as const,
      message: '15 items approaching expiry within 48 hours',
      date: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Food Waste Dashboard</h1>
              <p className="text-gray-600">Real-time tracking and insights</p>
            </div>
            <ExportButton records={currentPeriodRecords} type="csv" />
          </div>
        </header>

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <div className="space-y-6 mt-6">
          <LiveTracker />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WasteAlerts alerts={alerts} />
            <SustainabilityScore data={sustainabilityScore} />
            <AIInsights insights={insights} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WastePrediction 
              historicalData={currentPeriodRecords.map(r => r.waste_amount)}
              predictions={[]}
            />
            <WhatIfSimulator />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WasteForm />
            <ComparisonChart
              currentPeriod={currentPeriodRecords}
              previousPeriod={previousPeriodRecords}
              periodType="month"
            />
          </div>

          <WasteChart data={currentPeriodRecords} />
          
          <GamificationDashboard />
        </div>
      </div>
    </div>
  );
}