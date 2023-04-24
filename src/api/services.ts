import type { Config, Movie, MovieDetails, PaginatedResponse, TvShow } from '~/api/types';

import { tmdb_client } from '~/api/api-client';

export const get_config = async () => tmdb_client.get<Config>('configuration');

export const get_now_playing_movie = async () => {
  return tmdb_client.get<PaginatedResponse<Movie>>('movie/now_playing?page=1');
};

export const get_trending_movies = async () => {
  return tmdb_client.get<PaginatedResponse<Movie>>('/trending/movie/week?page=1');
};

export const get_trending_tv_shows = async () => {
  return tmdb_client.get<PaginatedResponse<TvShow>>('/trending/tv/week?page=1');
};

export const get_movie = async (id: number) => {
  return tmdb_client.get<MovieDetails>(`/movie/${id}`);
};
