import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { Home } from '~/components/icons/home';
import { Movie } from '~/components/icons/movie';
import { Search } from '~/components/icons/search';
import { TV } from '~/components/icons/tv';

export const Sidebar = component$(() => {
  return (
    <nav class="h-full flex-none">
      <ul class="flex flex-col gap-y-5 h-full p-5 bg-base-300">
        <li>
          <Link href="/" class="btn btn-circle">
            <Home />
          </Link>
        </li>
        <li>
          <Link href="/movie" class="btn btn-circle">
            <Movie />
          </Link>
        </li>
        <li>
          <Link href="/tv" class="btn btn-circle">
            <TV />
          </Link>
        </li>
        <li>
          <Link href="/search" class="btn btn-circle">
            <Search />
          </Link>
        </li>
        {/* <li>
          <Link href="/login" class="btn btn-circle">
            Sign in
          </Link>
        </li> */}
      </ul>
    </nav>
  );
});
