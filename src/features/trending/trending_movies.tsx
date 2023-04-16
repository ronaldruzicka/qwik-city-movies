import type { Movie } from '~/api/types';

import { component$, useContext } from '@builder.io/qwik';

import { ConfigContext } from '~/context/config-context';

type Props = {
  data: Movie[];
};

export const TrendingMovies = component$<Props>(({ data }) => {
  const config = useContext(ConfigContext);

  return (
    <div class="pl-7">
      <h2 class="text-2xl mb-5">Trending movies</h2>
      <div class="carousel gap-x-4">
        {data.map((movie) => {
          return (
            <div key={movie.id} class="carousel-item flex-col">
              <img
                src={`${config.images.base_url}${config.images.poster_sizes[3]}${movie.poster_path}`}
                height={556}
                width={370}
                alt={movie.title}
              />
              <h3 class="text-lg py-2">{movie.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
});
