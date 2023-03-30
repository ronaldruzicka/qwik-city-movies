import type { DocumentHead } from '@builder.io/qwik-city';
import type { Config } from '~/api/types';

import { component$, useContextProvider } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { api_client } from '~/api/api-client';
import { ConfigContext } from '~/context/config-context';
import { UpcomingMovies } from '~/features/upcoming-movies/upcoming-movies';

export const use_get_config = routeLoader$(async () => {
  const response = await api_client.get<Config>('configuration');

  return response.data;
});

export default component$(() => {
  const config = use_get_config();

  useContextProvider(ConfigContext, config.value);

  return (
    <>
      <UpcomingMovies />
    </>
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
