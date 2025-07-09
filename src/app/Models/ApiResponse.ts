export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      email_verified_at: null;
      created_at: string;
      updated_at: string;
      role: string;
    };
    token: string;
  };
}

export interface ConfessionResponse extends ConfessionData {
  message: string;
  category: string;
  emotion: string;
  created_at: string;
  updated_at: string;
}

export interface ConfessionData {
  id: number;
  content?: string;
  is_approved: boolean;
}

export interface SingleConfessionResponse {
  status: string;
  data: ConfessionData;
}

export interface deleteResponse {
  status: string;
  message: string;
}
export interface playlistResponse {
  status: string;
  data: playlistData[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface playlistData {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  posted_on: string;
}
export interface SingleEpisode {
  status: string;
  data: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;

    episodes: Episode[];
  };
}
