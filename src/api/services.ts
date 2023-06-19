import type {
  Config,
  Movie,
  MovieDetails,
  PaginatedResponse,
  ProductionMedia,
  RequestTokenResponse,
  SearchCategory,
  TvShow,
  TvShowDetails,
} from '~/api/types';

import { tmdb_fetch } from '~/api/api-client';

export const get_request_token = async () =>
  tmdb_fetch<RequestTokenResponse>('authentication/token/new');

export const get_config = async () => tmdb_fetch<Config>('configuration');

export const get_now_playing_movie = async () => {
  return tmdb_fetch<PaginatedResponse<Movie>>('movie/now_playing', { search: { page: '1' } });
};

export const get_trending_movies = async () => {
  return tmdb_fetch<PaginatedResponse<Movie>>('/trending/movie/week', { search: { page: '1' } });
};

export const get_trending_tv_shows = async () => {
  return tmdb_fetch<PaginatedResponse<TvShow>>('/trending/tv/week', { search: { page: '1' } });
};

export const get_movie = async (id: number) => {
  return tmdb_fetch<MovieDetails>(`/movie/${id}`, {
    search: {
      append_to_response: 'videos,credits,images,release_dates',
      include_image_language: 'en',
    },
  });
};

export const get_tv_show = async (id: number) => {
  return tmdb_fetch<TvShowDetails>(`/tv/${id}`, {
    search: {
      append_to_response: 'videos,credits,images,content_ratings',
      include_image_language: 'en',
    },
  });
};

export const search = (query: string, category: SearchCategory) => {
  return tmdb_fetch<PaginatedResponse<ProductionMedia>>(`search/${category}`, {
    search: {
      query,
    },
  });
};
