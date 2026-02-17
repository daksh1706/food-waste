import { WasteRecord } from '../types/waste';
import { format } from 'date-fns';

export interface ChartDataPoint {
  date: string;
  amount: number;
}

export function formatWasteRecords(records: WasteRecord[]): ChartDataPoint[] {
  return records.map(record => ({
    date: format(new Date(record.date), 'yyyy-MM-dd'),
    amount: Number(record.waste_amount)
  }));
}

export function calculatePeriodTotal(records: WasteRecord[]): number {
  return records.reduce((sum, record) => sum + Number(record.waste_amount), 0);
}

export function formatComparisonData(currentPeriod: WasteRecord[], previousPeriod: WasteRecord[], periodType: string) {
  return [
    {
      name: `Current ${periodType}`,
      amount: calculatePeriodTotal(currentPeriod),
    },
    {
      name: `Previous ${periodType}`,
      amount: calculatePeriodTotal(previousPeriod),
    },
  ];
}