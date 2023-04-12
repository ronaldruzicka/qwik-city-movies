import type { MovieDetails } from '~/api/types';

import { component$, useContext } from '@builder.io/qwik';

import { Rating } from '~/components/rating';
import { TextSubtle } from '~/components/text-subtle';
import { ConfigContext } from '~/context/config-context';
import { get_runtime } from '~/helpers/get_runtime';

type Props = {
  data: MovieDetails;
};

export const Hero = component$<Props>(({ data }) => {
  const config = useContext(ConfigContext);

  const { backdrop_sizes, base_url } = config.images;
  const backdrop_image_size = backdrop_sizes.at(2);

  return (
    <div class="relative flex-1">
      <div class="relative before:block before:absolute before:inset-0 before:bg-gradient-to-r from-base-100">
        <img class="w-full" src={`${base_url}${backdrop_image_size}${data.backdrop_path}`} />
      </div>
      <article class="absolute bottom-0 left-0 flex flex-col justify-end w-1/3 p-7 ">
        <h1 class="mb-3 text-5xl font-bold">{data.title}</h1>
        <div class="flex gap-x-2 items-center mb-5">
          <Rating value={data.vote_average} name={`rating-${data.id}`} read_only />
          <TextSubtle>
            {data.vote_count} reviews,{' '}
            {data.release_date && `${new Date(data.release_date).toLocaleDateString()}, `}
            {get_runtime(data.runtime)}
          </TextSubtle>
        </div>
        <p class="text-base">{data.overview}</p>
      </article>
    </div>
  );
});
