import { component$ } from '@builder.io/qwik';

import { get_poster } from '~/api/image-service';
import { use_get_movie } from '~/routes/movie/[id]/layout';

export default component$(() => {
  const { value: movie } = use_get_movie();

  return (
    <div class="grid grid-cols-[repeat(auto-fill,_minmax(185px,_1fr))] gap-3">
      {movie.images?.posters?.map((poster, index) =>
        poster.file_path ? (
          <img
            key={index}
            alt={`${movie.title} poster ${index}`}
            src={get_poster({ path: poster.file_path, size: 185 })}
            width={185}
          />
        ) : null,
      )}
    </div>
  );
});
