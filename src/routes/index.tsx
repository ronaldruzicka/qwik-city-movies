import type { DocumentHead } from '@builder.io/qwik-city';

import { component$, useContextProvider } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { ConfigContext } from '~/context/config-context';
import { HeroMovie } from '~/features/hero/hero-movie';
import { TrendingCarousel } from '~/features/trending/trending-carousel';
import {
  use_get_config,
  use_get_now_playing_movie,
  use_get_trending_movies,
  use_get_trending_tv_shows,
} from '~/routes/layout';

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
          <HeroMovie data={now_playing_movie.value} />
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
