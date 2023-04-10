export function get_rating(input: number) {
  const output = Math.round(input * 2) / 2;

  return output.toFixed(1);
}
