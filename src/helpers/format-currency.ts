type Params = {
  locale?: string;
  value?: number;
};

export function format_currency({ locale, value }: Params) {
  if (value === undefined || !locale) {
    return '';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}
