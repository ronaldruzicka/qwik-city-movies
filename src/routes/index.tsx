import type { DocumentHead } from '@builder.io/qwik-city';
import type { Response, UpcomingMovie } from '~/api/types';

import { component$, Resource, useResource$ } from '@builder.io/qwik';

import { api_client } from '~/api/api-client';

export default component$(() => {
  const resource = useResource$<Response<UpcomingMovie>>(async ({ cleanup }) => {
    const abort_controller = new AbortController();

    cleanup(() => abort_controller.abort('cleanup'));

    const response = await api_client.get('movie/upcoming', {
      signal: abort_controller.signal,
    });

    const data = await response.data;

    return data;
  });

  return (
    <>
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to person data</div>}
        onResolved={(resource) => {
          return (
            <div>
              {resource.results?.map((movie) => (
                <div key={movie.id}>{movie.original_title}</div>
              ))}
            </div>
          );
        }}
      />
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
