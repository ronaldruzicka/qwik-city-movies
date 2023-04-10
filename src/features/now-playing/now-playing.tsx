import type { Movie } from '~/api/types';

import { component$, useContext } from '@builder.io/qwik';

import { Rating } from '~/components/rating';
import { ConfigContext } from '~/context/config-context';

type Props = {
  data: Movie;
};

export const NowPlayingMovie = component$(({ data }: Props) => {
  const config = useContext(ConfigContext);

  const { backdrop_sizes, base_url } = config.images;
  const backdrop_image_size = backdrop_sizes.at(2);

  console.log('data', data);

  return (
    <div class="relative bg-base-100">
      <div class="relative before:block before:absolute before:inset-0 before:bg-gradient-to-r from-base-100">
        <img src={`${base_url}${backdrop_image_size}${data.backdrop_path}`} />
      </div>
      <article class="absolute bottom-0 left-6 flex flex-col justify-end w-1/3 p-7">
        <h1 class="mb-5 text-5xl font-bold">{data.title}</h1>
        <Rating rating={data.vote_average} />
        <p class="text-base">{data.overview}</p>
      </article>
    </div>
  );
});
