import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { tmdb_fetch } from '~/api/api-client';
import { get_request_token } from '~/api/services';

export const use_request_token = routeLoader$(async () => {
  const response = await get_request_token();

  return response;
});

export default component$(() => {
  const response = use_request_token();

  console.log('token', response.value.request_token);

  return (
    <button
      class="btn btn-primary"
      onClick$={() => tmdb_fetch(`authenticate/${response.value.request_token}`)}
    >
      Login
    </button>
  );
});
