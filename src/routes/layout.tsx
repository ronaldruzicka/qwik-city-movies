import type { Movie, MovieDetails } from '~/api/types';

import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { tmdb_fetch } from '~/api/api-client';
import {
  get_config,
  get_now_playing_movie,
  get_trending_movies,
  get_trending_tv_shows,
} from '~/api/services';
import { Sidebar } from '~/components/sidebar';

const with_poster = (movie: Movie) => movie.backdrop_path !== null;
const get_random_number = (multiplier: number) => Math.floor(Math.random() * multiplier);

export const use_get_config = routeLoader$(async () => {
  const response = await get_config();

  return response;
});

export const use_get_now_playing_movie = routeLoader$(async () => {
  const now_playing_response = await get_now_playing_movie();

  const random_movie = now_playing_response.results
    ?.filter(with_poster)
    .at(get_random_number(now_playing_response.results.length));

  const movie_details = random_movie?.id
    ? await tmdb_fetch<MovieDetails>(`movie/${random_movie.id}`)
    : null;

  return movie_details;
});

export const use_get_trending_movies = routeLoader$(async () => {
  const response = await get_trending_movies();

  return response;
});

export const use_get_trending_tv_shows = routeLoader$(async () => {
  const response = await get_trending_tv_shows();

  return response;
});

export default component$(() => {
  return (
    <div class="flex items-start h-full">
      <Sidebar />
      <main class="flex-1 pb-36">
        <Slot />
      </main>
    </div>
  );
});
