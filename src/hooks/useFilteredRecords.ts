import { useMemo } from 'react';
import { WasteRecord } from '../types/waste';

export function useFilteredRecords(
  records: WasteRecord[],
  startDate: Date,
  endDate: Date
) {
  return useMemo(() => {
    const currentPeriodRecords = records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });

    const previousStart = new Date(startDate);
    previousStart.setMonth(previousStart.getMonth() - 1);
    const previousEnd = new Date(endDate);
    previousEnd.setMonth(previousEnd.getMonth() - 1);

    const previousPeriodRecords = records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= previousStart && recordDate <= previousEnd;
    });

    return {
      currentPeriodRecords,
      previousPeriodRecords
    };
  }, [records, startDate, endDate]);
}