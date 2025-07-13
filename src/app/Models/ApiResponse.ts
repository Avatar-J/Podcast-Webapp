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

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export interface ConfessionResponse extends ConfessionData {
  status: string;
  data: ConfessionData[];
  meta: Meta;
}

export interface Meta {
  total: number;
  page: number;
  last_page: number;
}
export interface ConfessionData {
  id: number;
  message: string;
  category: string;
  emotion: string;
  created_at: string;
  updated_at: string;
  is_approved: string;
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
  data: {
    current_page: number;
    data: playlistData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface playlistData {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  episodes?: any[];
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

export interface MeetTheTeamResponse {
  status: string;
  data: TeamProfile[];
  meta: Meta;
}

export interface TeamProfile {
  id: number;
  name: string;
  role: string;
  bio: string;
  profile_image: string;
  social_media_links: Social[];
  created_at: string;
  updated_at: string;
}

export interface Social {
  id: 5;
  platform: string;
  url: string;
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  img_url: string;
  audio_url: string;
  duration: string;
  posted_on: string;
  season: string;
  episode: string;
  spotify_url: string;
  apple_podcasts_url: string;
  archive: string;
  featured: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface EpisodesResponse {
  status: string;
  data: Episode[];
  meta: Meta;
}
