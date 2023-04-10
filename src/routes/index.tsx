import type { DocumentHead } from '@builder.io/qwik-city';
import type { Config, Movie, Response, LatestMovie as TLatestMovie } from '~/api/types';

import { component$, useContextProvider } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { api_client } from '~/api/api-client';
import { ConfigContext } from '~/context/config-context';
import { NowPlayingMovie } from '~/features/now-playing/now-playing';

const with_poster = (movie: Movie) => movie.backdrop_path !== null;
const get_random_number = (multiplier: number) => Math.floor(Math.random() * multiplier);

export const use_get_config = routeLoader$(async () => {
  const response = await api_client.get<Config>('configuration');

  return response.data;
});

export const use_get_now_playing_movie = routeLoader$(async () => {
  const response = await api_client.get<Response<Movie>>('movie/now_playing?page=1');
  const random_movie = response.data.results
    ?.filter(with_poster)
    .at(get_random_number(response.data.results.length));

  return random_movie;
});

export default component$(() => {
  const config = use_get_config();
  const now_playing_movie = use_get_now_playing_movie();

  useContextProvider(ConfigContext, config.value);

  return <>{now_playing_movie.value && <NowPlayingMovie data={now_playing_movie.value} />}</>;
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
