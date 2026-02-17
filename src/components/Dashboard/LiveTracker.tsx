import React from 'react';
import { BarChart, Activity, TrendingDown } from 'lucide-react';
import { useWasteRecords } from '../../hooks/useWasteRecords';

export function LiveTracker() {
  const { records, loading } = useWasteRecords();

  // Calculate metrics
  const todayWaste = records
    .filter(record => {
      const today = new Date();
      const recordDate = new Date(record.date);
      return (
        recordDate.getDate() === today.getDate() &&
        recordDate.getMonth() === today.getMonth() &&
        recordDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, record) => sum + record.waste_amount, 0);

  const weeklyRecords = records.filter(record => {
    const recordDate = new Date(record.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return recordDate >= weekAgo;
  });

  const weeklyAverage = weeklyRecords.length
    ? weeklyRecords.reduce((sum, record) => sum + record.waste_amount, 0) / 7
    : 0;

  // Calculate trend (comparing this week to last week)
  const lastWeekRecords = records.filter(record => {
    const recordDate = new Date(record.date);
    const twoWeeksAgo = new Date();
    const oneWeekAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return recordDate >= twoWeeksAgo && recordDate < oneWeekAgo;
  });

  const lastWeekTotal = lastWeekRecords.reduce((sum, record) => sum + record.waste_amount, 0);
  const thisWeekTotal = weeklyRecords.reduce((sum, record) => sum + record.waste_amount, 0);
  
  const trend = lastWeekTotal ? ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100 : 0;

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Today's Waste</p>
            <h3 className="text-2xl font-bold">{todayWaste.toFixed(1)}kg</h3>
          </div>
          <BarChart className="text-blue-500 w-8 h-8" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Weekly Average</p>
            <h3 className="text-2xl font-bold">{weeklyAverage.toFixed(1)}kg</h3>
          </div>
          <Activity className="text-green-500 w-8 h-8" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Weekly Trend</p>
            <h3 className={`text-2xl font-bold ${trend <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend.toFixed(1)}%
            </h3>
          </div>
          <TrendingDown className={trend <= 0 ? 'text-green-500' : 'text-red-500'} />
        </div>
      </div>
    </div>
  );
}