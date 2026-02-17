import { format, addDays } from 'date-fns';
import type { WastePrediction } from '../types/analytics';

export function formatPredictionData(historicalData: number[], predictions: WastePrediction[]) {
  const today = new Date();
  
  const historical = historicalData.map((amount, index) => ({
    date: format(addDays(today, -historicalData.length + index), 'MMM dd'),
    actual: amount,
    predicted: null
  }));

  const predicted = predictions.map((pred) => ({
    date: format(new Date(pred.date), 'MMM dd'),
    actual: null,
    predicted: pred.amount
  }));

  return [...historical, ...predicted];
}