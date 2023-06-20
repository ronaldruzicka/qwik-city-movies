import { component$, useSignal } from '@builder.io/qwik';

import { get_rating } from '~/helpers/get-rating';

type Props = {
  name: string;
  read_only?: boolean;
  value: number | undefined;
};

export const Rating = component$(({ name, read_only, value }: Props) => {
  if (value === undefined) {
    return null;
  }

  const rating = useSignal(String(get_rating(value)));

  return (
    <>
      <div
        class={{ 'tooltip tooltip-accent': read_only, 'flex items-center': true }}
        data-tip={`${rating.value}/10`}
      >
        <div class="rating rating-md rating-half -ml-2">
          <input
            class="rating-hidden disabled:cursor-default"
            disabled={read_only}
            name={name}
            type="radio"
            value="0"
          />
          {Array.from({ length: 10 }, (_, index) => {
            const half_class = index % 2 === 0 ? 'mask-half-1' : 'mask-half-2';
            const radio_value = index + 1;

            return (
              <input
                checked={radio_value === Number(rating.value)}
                class={`mask mask-star-2 bg-orange-400 ${half_class} disabled:cursor-default`}
                disabled={read_only}
                key={index}
                name={name}
                type="radio"
                value={radio_value}
                onChange$={(_, input) => {
                  rating.value = input.value;
                }}
              />
            );
          })}
        </div>
      </div>
      {!read_only && <span class="ml-2 text-sm text-white/70">{rating.value}</span>}
    </>
  );
});
