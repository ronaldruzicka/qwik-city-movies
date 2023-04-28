import type { QwikIntrinsicElements } from '@builder.io/qwik';

export type Maybe<T> = T | null;
export type ID = number;

export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type ElementType = keyof QwikIntrinsicElements;

export type PaginatedResponse<TData> = {
  dates?: Dates;
  page?: number;
  results?: TData[];
  total_pages?: number;
  total_results?: number;
};

type Dates = {
  maximum?: string;
  minimum?: string;
};

type ImageConfig = {
  backdrop_sizes: string[];
  base_url: string;
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  secure_base_url: string;
  still_sizes: string[];
};

export type Config = {
  change_keys: string[];
  images: ImageConfig;
};

type Genre = {
  id?: number;
  name?: string;
};

export type Movie = {
  adult?: boolean;
  backdrop_path?: Maybe<string>;
  genre_ids?: number[];
  id: ID;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: Maybe<string>;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

type ProductionCompany = {
  id: ID;
  logo_path?: string;
  name?: string;
  origin_country?: string;
};

type ProductionCountry = {
  iso_3166_1?: string;
  name?: string;
};

type SpokenLanguages = {
  iso_639_1?: string;
  name?: string;
};

type MovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

type MovieDetailsProps = {
  belongs_to_collection?: Maybe<Record<string, unknown>>;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguages[];
  status?: MovieStatus;
  tagline?: string;
};

type PersonMedia = {
  adult?: boolean;
  id: number;
  job?: string;
  known_for?: ProductionMedia[];
  media_type?: 'person';
  name?: string;
  popularity?: number;
  profile_path?: string;
};

type Image = {
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  iso_639_1?: string | null;
  vote_average?: number;
  vote_count?: number;
  width?: number;
};

type Video = {
  id?: string;
  iso_3166_1?: string;
  iso_639_1?: string;
  key?: string;
  name?: string;
  official?: boolean;
  published_at?: string;
  site?: string;
  size?: number;
  type?: string;
};

type MovieAddons = {
  credits?: {
    cast?: PersonMedia[];
    crew?: PersonMedia[];
  };
  images?: {
    backdrops?: Image[];
    logos?: Image[];
    posters?: Image[];
  };
  videos?: {
    results?: Video[];
  };
};

export type MovieDetails = Prettify<Movie & MovieDetailsProps & MovieAddons>;

export type TvShow = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: ID;
  media_type: 'tv';
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type ProductionMedia = Movie | TvShow;
