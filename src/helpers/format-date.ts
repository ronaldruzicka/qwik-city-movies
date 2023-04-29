type Params = {
  date?: string;
  dateStyle?: 'long' | 'short';
  locale?: string;
};

export function format_date({ date, dateStyle, locale }: Params) {
  if (!date || !locale) {
    return '';
  }

  const formatter = new Intl.DateTimeFormat(locale, { dateStyle });

  return formatter.format(new Date(date));
}
