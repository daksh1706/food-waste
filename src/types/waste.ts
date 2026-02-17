export type WasteCategory = 'perishable' | 'non-perishable' | 'prepared-food' | 'packaging';

export interface WasteRecord {
  id: string;
  date: string;
  waste_amount: number;
  category: WasteCategory;
  comments: string;
  created_at: string;
  carbon_footprint?: number;
  inventory_id?: string;
}

export interface SustainabilityScore {
  score: number;
  trend: 'up' | 'down' | 'stable';
  factors: {
    category: string;
    impact: number;
    suggestion: string;
  }[];
}

export interface WasteAlert {
  id: string;
  type: 'threshold' | 'expiry' | 'trend';
  severity: 'low' | 'medium' | 'high';
  message: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'trend' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  date: string;
}