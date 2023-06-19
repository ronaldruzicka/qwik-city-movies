import { component$ } from '@builder.io/qwik';

import { use_get_movie } from '~/routes/movie/[id]/layout';

export default component$(() => {
  const { value: movie } = use_get_movie();

  return (
    <section class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 px-16 py-4">
      {movie.videos?.results?.map((video) => (
        <a
          class="aspect-video"
          href={`https://www.youtube.com/watch?v=${video.key}`}
          key={video.id}
          target="_none"
        >
          <img
            alt={video.name}
            class="h-full max-h-full w-full object-cover hover:scale-110 hover:rotate-1 transition-transform duration-200 ease-in-out"
            height={600}
            src={`https://movies-proxy.vercel.app/ipx/f_webp,s_400x600/youtube/vi/${video.key}/maxresdefault.jpg`}
            width={400}
          />
          <div class="mt-2 flex flex-col gap-2">
            <span>{video.name}</span>
            <span class="badge badge-accent badge-outline badge-sm">{video.type}</span>
          </div>
        </a>
      ))}
    </section>
  );
});
