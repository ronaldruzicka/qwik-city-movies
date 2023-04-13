import type { QwikIntrinsicElements } from '@builder.io/qwik';
import type { ElementType } from '~/api/types';

import { component$, Slot } from '@builder.io/qwik';

type Props<TElement extends ElementType> = QwikIntrinsicElements[TElement] & {
  as?: TElement;
};

export const TextSubtle = component$(
  <TElement extends ElementType>({ as, htmlAttributes }: Props<TElement>) => {
    const Component = (as ?? 'p') as string;

    return (
      <Component class="text-sm text-white/60" {...htmlAttributes}>
        <Slot />
      </Component>
    );
  },
);
