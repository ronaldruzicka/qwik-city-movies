import { languages } from '~/constants/languages';

export function format_language(iso?: string) {
  const full_language = languages.find((language) => language.iso_639_1 === iso);

  if (full_language) {
    return full_language.english_name;
  }

  return iso;
}
