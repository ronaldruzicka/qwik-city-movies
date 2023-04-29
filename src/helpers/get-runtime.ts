export function get_runtime(minutes?: number) {
  if (!minutes) {
    return '';
  }

  const hours = Math.floor(minutes / 60);
  const remaining_minutes = minutes % 60;

  return `${hours}h ${remaining_minutes ? `${remaining_minutes}min` : ''}`;
}
