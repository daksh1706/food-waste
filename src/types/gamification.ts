export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned: boolean;
  progress: number;
  earnedDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  target: number;
  current_progress: number;
  reward: {
    points: number;
    badge?: Badge;
  };
  participants: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  level: 'bronze' | 'silver' | 'gold';
  progress: number;
  completed: boolean;
}