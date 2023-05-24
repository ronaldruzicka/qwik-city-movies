import { component$, Slot } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import clsx from 'clsx';

import { get_movie } from '~/api/services';
import { Hero } from '~/features/hero/hero';

type RouteParams = {
  id: number;
};

export const use_get_movie = routeLoader$(async ({ params }) => {
  const response = await get_movie((params as unknown as RouteParams).id);

  return response;
});

export default component$(() => {
  const { params, url } = useLocation();
  const movie = use_get_movie();

  const tabs = [
    { href: `/movie/${params.id}/`, title: 'Overview' },
    { href: `/movie/${params.id}/videos/`, title: 'Videos' },
    { href: `/movie/${params.id}/photos/`, title: 'Photos' },
  ];

  return (
    <>
      <header>
        <Hero data={movie.value} />
      </header>
      <div class="flex justify-center mt-7">
        <div class="tabs tab-lg">
          {tabs.map((tab) => {
            return (
              <Link
                key={tab.title}
                href={tab.href}
                class={clsx('tab tab-lg tab-bordered', { 'tab-active': url.pathname === tab.href })}
              >
                {tab.title}
              </Link>
            );
          })}
        </div>
      </div>
      <Slot />
    </>
  );
});
