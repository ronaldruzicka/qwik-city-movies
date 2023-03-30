export type Maybe<T> = T | null;
export type ID = number;

export type Response<TData> = {
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

export type UpcomingMovie = {
  adult?: boolean;
  backdrop_path?: Maybe<string>;
  genre_ids?: number[];
  id?: ID;
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
