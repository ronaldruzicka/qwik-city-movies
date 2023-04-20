import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { get_movie } from '~/api/services';

type RouteParams = {
  id: number;
};

export const use_get_movie = routeLoader$(async ({ params }) => {
  const response = await get_movie((params as unknown as RouteParams).id);

  return response.data;
});

export default component$(() => {
  const movie = use_get_movie();

  return <div>{movie.value.title}</div>;
});
