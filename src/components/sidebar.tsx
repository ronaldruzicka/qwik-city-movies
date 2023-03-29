import { component$ } from '@builder.io/qwik';

import { Home } from '~/components/icons/home';
import { Movie } from '~/components/icons/movie';
import { Search } from '~/components/icons/search';
import { TV } from '~/components/icons/tv';

export const Sidebar = component$(() => {
  return (
    <div>
      <button class="btn btn-circle">
        <Home />
      </button>
      <button class="btn btn-circle">
        <Movie />
      </button>
      <button class="btn btn-circle">
        <TV />
      </button>
      <button class="btn btn-circle">
        <Search />
      </button>
    </div>
  );
});
