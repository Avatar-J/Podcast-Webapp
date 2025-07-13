export interface Confession {
  category: string;
  emotion: string;
  message: string;
}

export interface AdminConfession {
  id: number;
  message: string;
  category: string;
  emotion: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}
