import { useSignal, useVisibleTask$ } from '@builder.io/qwik';

export function use_locale() {
  const locale = useSignal('');

  useVisibleTask$(
    () => {
      locale.value = document.documentElement.lang || navigator.language;
    },
    { strategy: 'document-ready' },
  );

  return locale.value ?? 'sk-SK';
}
