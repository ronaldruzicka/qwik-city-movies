import type { Movie, TvShow } from '~/api/types';

import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { get_poster } from '~/api/image-service';

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
  return (
    <div class="pl-7">
      <h2 class="text-2xl mb-5">Trending {mediaType === 'movie' ? 'movies' : 'TV Shows'}</h2>
      <div class="carousel gap-x-4">
        {data.map((media) => {
          const media_title = is_movie(media) ? media.title : media.name;

          return (
            media.poster_path && (
              <Link
                href={`/${mediaType}/${media.id}`}
                key={media.id}
                class="carousel-item flex-col"
              >
                <img
                  src={get_poster({ path: media.poster_path, size: 342 })}
                  height={556}
                  width={370}
                  alt={media_title}
                />
                <h3 class="text-lg py-2">{media_title}</h3>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
});
