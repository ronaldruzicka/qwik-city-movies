type Params = {
  locale?: string;
  value?: string[];
};

export function format_list({ locale, value }: Params) {
  if (!locale || !value) {
    return '';
  }

  const formatter = new Intl.ListFormat(locale, {
    type: 'conjunction',
    style: 'long',
  });

  return formatter.format(value);
}
