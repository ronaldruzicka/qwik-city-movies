export function format_date(date?: string, dateStyle?: 'long' | 'short') {
  if (!date) {
    return '';
  }

  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle });

  return formatter.format(new Date(date));
}
