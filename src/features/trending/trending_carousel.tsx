import type { Movie, TvShow } from '~/api/types';

import { component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { ConfigContext } from '~/context/config-context';

function is_movie(media: Movie | TvShow): media is Movie {
  return 'title' in media;
}

type MovieProps = {
  data: Movie[];
  mediaType: 'movie';
};

type TvShowProps = {
  data: TvShow[];
  mediaType: 'tv';
};

type Props = MovieProps | TvShowProps;

export const TrendingCarousel = component$<Props>(({ data, mediaType }) => {
  const config = useContext(ConfigContext);

  return (
    <div class="pl-7">
      <h2 class="text-2xl mb-5">Trending {mediaType === 'movie' ? 'movies' : 'TV Shows'}</h2>
      <div class="carousel gap-x-4">
        {data.map((media) => {
          const media_title = is_movie(media) ? media.title : media.name;

          return (
            <Link href={`/${mediaType}/${media.id}`} key={media.id} class="carousel-item flex-col">
              <img
                src={`${config.images.base_url}${config.images.poster_sizes[3]}${media.poster_path}`}
                height={556}
                width={370}
                alt={media_title}
              />
              <h3 class="text-lg py-2">{media_title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
});
