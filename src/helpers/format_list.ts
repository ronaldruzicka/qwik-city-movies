export function format_list(value?: string[]) {
  if (!value) {
    return '';
  }

  const formatter = new Intl.ListFormat('en-US', {
    type: 'conjunction',
    style: 'long',
  });

  return formatter.format(value);
}
