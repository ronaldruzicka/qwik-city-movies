import type { MovieDetails } from '~/api/types';

import { component$ } from '@builder.io/qwik';

import { get_backdrop } from '~/api/image-service';
import { Rating } from '~/components/rating';
import { TextSubtle } from '~/components/text-subtle';
import { format_date } from '~/helpers/format-date';
import { get_runtime } from '~/helpers/get-runtime';
import { use_locale } from '~/hooks/use-locale';

type Props = {
  data: MovieDetails;
};

export const HeroMovie = component$<Props>(({ data }) => {
  const locale = use_locale();

  const image_width = 1280;
  const release_date = format_date({ date: data.release_date, dateStyle: 'short', locale });

  return (
    <div class="relative">
      <div class="relative aspect-[25/9] ">
        <div class="absolute bottom-0 right-0 top-0 lg:left-1/3 [mask-image:linear-gradient(to_left,#000,transparent)]">
          <img
            class="w-full"
            src={get_backdrop({ media: data, size: image_width })}
            width={image_width}
          />
        </div>
      </div>

      <article class="absolute bottom-0 left-0 flex flex-col justify-end w-5/12 p-10 bg-gradient-to-r from-black/20">
        <h1 class="mb-3 text-5xl font-bold">{data.title}</h1>
        <div class="flex gap-x-2 items-center mb-5">
          <Rating value={data.vote_average} name={`rating-${data.id}`} read_only />
          <TextSubtle>
            {data.vote_count} reviews, {release_date}, {get_runtime(data.runtime)}
          </TextSubtle>
        </div>
        <p class="text-base">{data.overview}</p>
      </article>
    </div>
  );
});
