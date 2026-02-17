import { useState, useCallback } from 'react';
import { subDays } from 'date-fns';

export function useDateRange(defaultDays = 30) {
  const [startDate, setStartDate] = useState(() => subDays(new Date(), defaultDays));
  const [endDate, setEndDate] = useState(() => new Date());

  const setRange = useCallback((start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setRange,
  };
}