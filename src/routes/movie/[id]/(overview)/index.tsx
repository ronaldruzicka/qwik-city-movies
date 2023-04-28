import { component$ } from '@builder.io/qwik';

import { get_poster } from '~/api/image-service';
import { format_currency } from '~/helpers/format_currency';
import { format_date } from '~/helpers/format_date';
import { format_language } from '~/helpers/format_language';
import { format_list } from '~/helpers/format_list';
import { get_runtime } from '~/helpers/get_runtime';
import { use_get_movie } from '~/routes/movie/layout';

export default component$(() => {
  const { value: movie } = use_get_movie();

  const release_date = format_date(movie.release_date, 'long');
  const director = movie.credits?.crew?.find((person) => person.job === 'Director');
  const genres = movie.genres?.map(({ name }) => name).filter(Boolean);
  const genres_list = format_list(genres);
  const production_companies = movie.production_companies?.map(({ name }) => name).filter(Boolean);
  const production_companies_list = format_list(production_companies);

  return (
    <section class="mt-10">
      <div class="flex gap-x-10 justify-center max-w-6xl mx-auto">
        <picture class="flex-none">
          <img src={get_poster({ media: movie, size: 342 })} alt={movie.title} />
        </picture>
        <article class="flex flex-col justify-center">
          <header>
            <h1 class="text-3xl mb-4">Storyline</h1>
          </header>
          <p class="leading-7 text-white">{movie.overview}</p>
          <div class="grid grid-cols-[max-content_1fr_max-content_1fr] gap-3 mt-5 text-sm">
            <strong>Released:</strong>
            <div>{release_date}</div>

            <strong>Runtime:</strong>
            <div>{get_runtime(movie.runtime)}</div>

            <strong>Director:</strong>
            <div>{director?.name}</div>

            <strong>Budget:</strong>
            <div>{format_currency(movie.budget)}</div>

            <strong>Revenue:</strong>
            <div>{format_currency(movie.revenue)}</div>

            <strong>Genre:</strong>
            <div>{genres_list}</div>

            <strong>Status:</strong>
            <div>{movie.status}</div>

            <strong>Language:</strong>
            <div>{format_language(movie.original_language)}</div>

            <strong>Production:</strong>
            <div>{production_companies_list}</div>
          </div>
        </article>
      </div>
    </section>
  );
});
