type Props = {
  rating: number;
};

export function Rating({ rating }: Props) {
  if (rating === undefined) {
    return null;
  }

  return (
    <div class="rating">
      {Array.from({ length: 5 }, (_, index) => {
        const checked = rating === index - 1;

        console.log('rating', rating);
        console.log('checked', checked);

        return (
          <input
            key={index}
            type="radio"
            name={`rating-${index}`}
            class="mask mask-star"
            checked={checked}
          />
        );
      })}
    </div>
  );
}
