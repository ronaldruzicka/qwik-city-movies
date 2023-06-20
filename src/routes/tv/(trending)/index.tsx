import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { get_poster } from '~/api/image-service';
import { use_get_trending_tv_shows } from '~/routes/layout';

export default component$(() => {
  const { value: tv_shows } = use_get_trending_tv_shows();

  return (
    <article class="pt-5 px-7">
      <header class="prose mb-10">
        <h1>Trending TV Shows</h1>
      </header>
      <section class="grid grid-cols-[repeat(auto-fill,_minmax(185px,_1fr))] gap-5">
        {tv_shows.results?.map((tv_show, index) => {
          return (
            tv_show.poster_path && (
              <Link href={`/tv/${tv_show.id}`} key={index} class="flex flex-col">
                <img
                  class="mb-2"
                  alt={`${tv_show.name} poster ${index}`}
                  src={get_poster({ path: tv_show.poster_path, size: 185 })}
                  width={185}
                />
                <span>{tv_show.name}</span>
              </Link>
            )
          );
        })}
      </section>
    </article>
  );
});
