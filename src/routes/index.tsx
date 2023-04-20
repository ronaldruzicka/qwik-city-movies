import type { DocumentHead } from '@builder.io/qwik-city';
import type { Movie, MovieDetails } from '~/api/types';

import { component$, useContextProvider } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { tmdb_client } from '~/api/api-client';
import { get_config, get_now_playing_movie, get_trending_movies } from '~/api/services';
import { ConfigContext } from '~/context/config-context';
import { Hero } from '~/features/hero/hero';
import { TrendingMovies } from '~/features/trending/trending_movies';

const with_poster = (movie: Movie) => movie.backdrop_path !== null;
const get_random_number = (multiplier: number) => Math.floor(Math.random() * multiplier);

export const use_get_config = routeLoader$(async () => {
  const response = await get_config();

  return response.data;
});

export const use_get_now_playing_movie = routeLoader$(async () => {
  const now_playing_response = await get_now_playing_movie();

  const random_movie = now_playing_response.data.results
    ?.filter(with_poster)
    .at(get_random_number(now_playing_response.data.results.length));

  const movie_details = random_movie?.id
    ? await tmdb_client.get<MovieDetails>(`movie/${random_movie.id}`)
    : null;

  return movie_details?.data;
});

export const use_get_trending_movies = routeLoader$(async () => {
  const response = await get_trending_movies();

  return response.data;
});

export default component$(() => {
  const config = use_get_config();
  const now_playing_movie = use_get_now_playing_movie();
  const trending_movies = use_get_trending_movies();

  useContextProvider(ConfigContext, config.value);

  return (
    <main class="flex-1">
      {now_playing_movie.value && <Hero data={now_playing_movie.value} />}
      {trending_movies.value.results && (
        <div class="mt-12">
          <TrendingMovies data={trending_movies.value.results} />
        </div>
      )}
    </main>
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
