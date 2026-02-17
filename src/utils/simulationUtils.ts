import { addDays, format } from 'date-fns';
import type { SimulationParams, SimulationResult } from '../types/analytics';

export function simulateWasteReduction(params: SimulationParams): SimulationResult {
  const baselineDaily = 100; // Example baseline daily waste in kg
  const costPerKg = 2.5; // Example cost per kg of waste
  const carbonPerKg = 2.5; // Example carbon footprint per kg of waste

  const timeline = Array.from({ length: params.timeframe }, (_, i) => {
    const date = addDays(new Date(), i);
    const baseline = baselineDaily;
    const projected = baseline * (1 - params.reductionTarget / 100);
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      baseline,
      projected
    };
  });

  const totalBaseline = timeline.reduce((sum, day) => sum + day.baseline, 0);
  const totalProjected = timeline.reduce((sum, day) => sum + day.projected, 0);
  const projectedReduction = totalBaseline - totalProjected;

  return {
    projectedReduction,
    costSavings: projectedReduction * costPerKg,
    carbonReduction: projectedReduction * carbonPerKg,
    timeline
  };
}