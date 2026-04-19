// Type definitions for Anime app

export type Anime = {
  id: string;
  userId: string;
  title: string;
  coverUrl: string | null;
  isFavorite: boolean;
  notes: string | null;
  currentSeason: number | null;
  currentEpisode: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAnimeInput = {
  title: string;
  currentSeason?: number;
  currentEpisode: number;
  notes?: string;
  coverUrl?: string;
};

export type UpdateAnimeInput = Partial<CreateAnimeInput> & {
  isFavorite?: boolean;
};

export type AnimeListResponse = {
  data: Anime[];
  total: number;
  page: number;
  limit: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
