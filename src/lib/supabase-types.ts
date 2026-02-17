export type WasteRecord = {
  id: string;
  date: string;
  waste_amount: number;
  comments: string;
  created_at: string;
};

export type Recommendation = {
  id: string;
  date: string;
  recommendation_text: string;
  created_at: string;
};