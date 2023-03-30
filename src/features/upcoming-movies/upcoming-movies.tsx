import type { Response, UpcomingMovie } from '~/api/types';

import { component$, Resource, useContext, useResource$ } from '@builder.io/qwik';

import { api_client } from '~/api/api-client';
import { ConfigContext } from '~/context/config-context';

export const UpcomingMovies = component$(() => {
  const config = useContext(ConfigContext);

  const resource = useResource$<Response<UpcomingMovie>>(async ({ cleanup }) => {
    const abort_controller = new AbortController();

    cleanup(() => abort_controller.abort('cleanup'));

    const response = await api_client.get('movie/upcoming', {
      signal: abort_controller.signal,
    });

    const data = await response.data;

    return data;
  });

  const { backdrop_sizes, base_url } = config.images;
  const backdrop_image_size = backdrop_sizes.at(2);

  return (
    <div class="w-full">
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={(reason) => {
          return <div>Error occurred {reason?.toString()}</div>;
        }}
        onResolved={(resource) => {
          return (
            <div class="flex-1 carousel">
              {resource.results?.map((movie) => {
                return (
                  movie.backdrop_path && (
                    <div
                      key={movie.id}
                      class="carousel-item relative justify-end w-full bg-base-100"
                    >
                      <div class="relative before:block before:absolute before:inset-0 before:bg-gradient-to-r from-base-100">
                        <img src={`${base_url}${backdrop_image_size}${movie.backdrop_path}`} />
                      </div>
                      <article class="absolute left-6 h-full flex flex-col justify-end w-1/3 p-7">
                        <h1 class="mb-5 text-5xl font-bold">{movie.title}</h1>
                        <p class="text-base">{movie.overview}</p>
                      </article>
                    </div>
                  )
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
});
