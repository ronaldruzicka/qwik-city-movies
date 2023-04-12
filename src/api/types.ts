import type { QwikJSX } from '@builder.io/qwik';

export type Maybe<T> = T | null;
export type ID = number;

export type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type ElementType = keyof QwikJSX.IntrinsicElements;

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

export type MovieDetails = Prettify<
  Movie & {
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
    status?: string;
    tagline?: string;
  }
>;

export type LatestMovie = Prettify<
  Movie & {
    belongs_to_collection?: null;
    budget: number;
    genres?: Genre[];
    homepage?: string;
    imdb_id?: ID;
    production_companies: object[];
    production_countries: object[];
    revenue?: number;
    runtime?: number;
    spoken_languages?: object[];
    status?: string;
    tagline?: string;
  }
>;
