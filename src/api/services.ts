import type { Config, Movie, PaginatedResponse } from '~/api/types';

import { tmdb_client } from '~/api/api-client';

export const get_config = async () => tmdb_client.get<Config>('configuration');

export const get_now_playing_movie = async () => {
  return tmdb_client.get<PaginatedResponse<Movie>>('movie/now_playing?page=1');
};

export const get_trending_movies = async () => {
  return tmdb_client.get<PaginatedResponse<Movie>>('/trending/movie/week?page=1');
};
