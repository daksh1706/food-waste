export interface WastePrediction {
  date: string;
  amount: number;
  confidence: number;
  trend_description: string;
  recommendation: string;
}

export interface SimulationParams {
  reductionTarget: number;
  timeframe: number;
  categories: string[];
}

export interface SimulationResult {
  projectedReduction: number;
  costSavings: number;
  carbonReduction: number;
  timeline: Array<{
    date: string;
    baseline: number;
    projected: number;
  }>;
}