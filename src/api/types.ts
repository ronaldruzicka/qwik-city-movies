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
