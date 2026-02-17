import type { WasteRecord } from '../types/waste';

// Simple implementation of Z-score based anomaly detection
export function detectAnomalies(data: number[], threshold = 2): number[] {
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const stdDev = Math.sqrt(
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  );

  return data.map((value) => Math.abs((value - mean) / stdDev));
}

export function analyzeWastePatterns(records: WasteRecord[]) {
  const amounts = records.map(r => r.waste_amount);
  const zScores = detectAnomalies(amounts);
  
  return records.map((record, index) => ({
    ...record,
    isAnomaly: zScores[index] > 2,
    confidence: (1 - (zScores[index] / Math.max(...zScores))) * 100
  }));
}