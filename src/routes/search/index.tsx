import type { SearchCategory } from '~/api/types';

import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Form, Link, routeAction$ } from '@builder.io/qwik-city';

import { get_poster } from '~/api/image-service';
import { search } from '~/api/services';

export const use_search = routeAction$(async (data) => {
  const response = await search(data.search as string, data.category as SearchCategory);

  return response.results;
});

export default component$(() => {
  const action = use_search();
  const input_ref = useSignal<HTMLInputElement>();
  const category = useSignal<SearchCategory>('multi');

  useVisibleTask$(
    ({ track }) => {
      track(() => input_ref.value);

      input_ref.value?.focus();
    },
    { strategy: 'document-ready' },
  );

  return (
    <>
      <Form action={action} class="p-5">
        <div class="join">
          <input
            ref={input_ref}
            name="search"
            type="search"
            class="input input-bordered join-item"
            placeholder="Search..."
          />

          <select
            class="select select-bordered join-item items-center"
            name="category"
            bind:value={category}
          >
            <option value="multi">All</option>
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
          <div class="indicator">
            <button class="btn join-item btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </Form>

      <section class="grid grid-cols-[repeat(auto-fill,_minmax(185px,_1fr))] gap-5">
        {Array.isArray(action?.value)
          ? action.value.map((result) => {
              const title = 'title' in result && result.title;
              const name = 'name' in result && result.name;
              const result_title = title || name || '';

              return (
                result.poster_path && (
                  <Link href={`/movie/${result.id}`} key={result.id} class="flex flex-col">
                    <img
                      class="mb-2"
                      alt={result_title}
                      src={get_poster({ path: result.poster_path, size: 185 })}
                      width={185}
                    />
                    <span>{result_title}</span>
                  </Link>
                )
              );
            })
          : null}
      </section>
    </>
  );
});
