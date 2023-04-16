import { get_rating } from '~/helpers/get_rating';

type Props = {
  name: string;
  read_only?: boolean;
  value: number | undefined;
};

export function Rating({ name, read_only, value }: Props) {
  if (value === undefined) {
    return null;
  }

  const rating = get_rating(value);

  return (
    <div class="tooltip tooltip-accent" data-tip={`${rating}/10`}>
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
              checked={radio_value === rating}
              class={`mask mask-star-2 bg-orange-400 ${half_class} disabled:cursor-default`}
              disabled={read_only}
              key={index}
              name={name}
              type="radio"
              value={radio_value}
            />
          );
        })}
      </div>
    </div>
  );
}
