import type { ProductionMedia } from '~/api/types';

const image_base = 'https://image.tmdb.org/t/p';

type BackdropSizes = 300 | 780 | 1280 | 'original';

export const get_backdrop = (options: { media: ProductionMedia; size: BackdropSizes }) => {
  const { media, size } = options;
  const backdrop_size = typeof size === 'number' ? `w${size}` : size;

  return `${image_base}/${backdrop_size}${media.backdrop_path}`;
};

type PosterSizes = 92 | 154 | 185 | 342 | 500 | 780;

export const get_poster = (options: { path: string; size: PosterSizes }) => {
  const { path, size } = options;

  return `${image_base}/w${size}${path}`;
};

export const get_logo = (path: string) => `${image_base}/original/${path}`;
