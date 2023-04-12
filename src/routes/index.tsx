import type { DocumentHead } from '@builder.io/qwik-city';
import type { Config, Movie, MovieDetails, PaginatedResponse } from '~/api/types';

import { component$, useContextProvider } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { api_client } from '~/api/api-client';
import { ConfigContext } from '~/context/config-context';
import { Hero } from '~/features/hero/hero';

const with_poster = (movie: Movie) => movie.backdrop_path !== null;
const get_random_number = (multiplier: number) => Math.floor(Math.random() * multiplier);

export const use_get_config = routeLoader$(async () => {
  const response = await api_client.get<Config>('configuration');

  return response.data;
});

export const use_get_now_playing_movie = routeLoader$(async () => {
  const now_playing_response = await api_client.get<PaginatedResponse<Movie>>(
    'movie/now_playing?page=1',
  );

  const random_movie = now_playing_response.data.results
    ?.filter(with_poster)
    .at(get_random_number(now_playing_response.data.results.length));

  const movie_details = random_movie?.id
    ? await api_client.get<MovieDetails>(`movie/${random_movie.id}`)
    : null;

  return movie_details?.data;
});

export default component$(() => {
  const config = use_get_config();
  const now_playing_movie = use_get_now_playing_movie();

  useContextProvider(ConfigContext, config.value);

  return (
    <main class="flex-1">{now_playing_movie.value && <Hero data={now_playing_movie.value} />}</main>
  );
});

export const head: DocumentHead = {
  title: 'Qwik City movies app',
  meta: [
    {
      name: 'description',
      content: 'A movies app made by Qwik City using TMDB API',
    },
  ],
};
