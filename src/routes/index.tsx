import type { DocumentHead } from '@builder.io/qwik-city';
import type { Movie, MovieDetails } from '~/api/types';

import { component$, useContextProvider } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';

import { tmdb_fetch } from '~/api/api-client';
import {
  get_config,
  get_now_playing_movie,
  get_trending_movies,
  get_trending_tv_shows,
} from '~/api/services';
import { ConfigContext } from '~/context/config-context';
import { Hero } from '~/features/hero/hero';
import { TrendingCarousel } from '~/features/trending/trending_carousel';

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
  const config = use_get_config();
  const now_playing_movie = use_get_now_playing_movie();
  const trending_movies = use_get_trending_movies();
  const trending_tv_shows = use_get_trending_tv_shows();

  useContextProvider(ConfigContext, config.value);

  return (
    <>
      {now_playing_movie.value && (
        <Link href={`movie/${now_playing_movie.value.id}`}>
          <Hero data={now_playing_movie.value} />
        </Link>
      )}
      {trending_movies.value.results && (
        <div class="mt-12">
          <TrendingCarousel data={trending_movies.value.results} mediaType="movie" />
        </div>
      )}
      {trending_tv_shows.value.results && (
        <div class="mt-12">
          <TrendingCarousel data={trending_tv_shows.value.results} mediaType="tv" />
        </div>
      )}
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
