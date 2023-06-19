import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { get_logo, get_poster } from '~/api/image-service';
import { get_tv_show } from '~/api/services';
import { HeroTvShow } from '~/features/hero/hero-tv-show';
import { format_date } from '~/helpers/format-date';
import { format_language } from '~/helpers/format-language';
import { format_list } from '~/helpers/format-list';
import { use_locale } from '~/hooks/use-locale';

type RouteParams = {
  id: number;
};

export const use_get_tv_show = routeLoader$(async ({ params }) => {
  const response = await get_tv_show((params as unknown as RouteParams).id);

  return response;
});

export default component$(() => {
  const { value: tv_show } = use_get_tv_show();
  const locale = use_locale();

  const genres = tv_show.genres?.map(({ name }) => name).filter(Boolean);
  const genres_list = format_list({ locale, value: genres });
  const production_companies = tv_show.production_companies
    ?.map(({ name }) => name)
    .filter(Boolean);

  const production_companies_list = format_list({ locale, value: production_companies });

  return (
    <>
      <header>
        <HeroTvShow data={tv_show} />
      </header>
      <section class="mt-10">
        <div class="flex gap-x-10 justify-center max-w-6xl mx-auto">
          <picture class="flex-none">
            <img src={get_poster({ path: tv_show.poster_path, size: 342 })} alt={tv_show.name} />
          </picture>
          <article class="flex flex-col justify-center">
            <header>
              <h1 class="text-3xl mb-4">Storyline</h1>
            </header>
            <p class="leading-7 text-white">{tv_show.overview}</p>
            <div class="grid grid-cols-[max-content_1fr_max-content_1fr] gap-3 mt-5 text-sm">
              <strong>Released:</strong>
              <div>
                {format_date({
                  date: tv_show.first_air_date,
                  dateStyle: 'long',
                  locale,
                })}
              </div>

              <strong>Number of seasons:</strong>
              <div>{tv_show.number_of_seasons}</div>

              <strong>Genre:</strong>
              <div>{genres_list}</div>

              <strong>Status:</strong>
              <div>{tv_show.status}</div>

              <strong>Language:</strong>
              <div>{format_language(tv_show.original_language)}</div>

              <strong>Production:</strong>
              <div>{production_companies_list}</div>

              <strong class="self-center">Networks:</strong>
              <div class="carousel gap-x-6 col-span-3 self-center">
                {tv_show.networks.map((network) => (
                  <img
                    class="flex-none max-h-[30px]"
                    key={network.id}
                    src={get_logo(network.logo_path)}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
});
