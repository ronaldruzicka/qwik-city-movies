import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { get_poster } from '~/api/image-service';
import { use_get_trending_movies } from '~/routes/layout';

export default component$(() => {
  const { value: movies } = use_get_trending_movies();

  return (
    <article class="pt-5 px-7">
      <header class="prose mb-10">
        <h1>Trending Movies</h1>
      </header>
      <section class="grid grid-cols-[repeat(auto-fill,_minmax(185px,_1fr))] gap-5">
        {movies.results?.map((movie, index) => {
          return (
            movie.poster_path && (
              <Link href={`/movie/${movie.id}`} key={index} class="flex flex-col">
                <img
                  class="mb-2"
                  alt={`${movie.title} poster ${index}`}
                  src={get_poster({ path: movie.poster_path, size: 185 })}
                  width={185}
                />
                <span>{movie.title}</span>
              </Link>
            )
          );
        })}
      </section>
    </article>
  );
});
