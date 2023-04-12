import type { QwikJSX } from '@builder.io/qwik';
import type { ElementType } from '~/api/types';

import { component$, Slot } from '@builder.io/qwik';

type Props<TTag extends ElementType> = QwikJSX.IntrinsicElements[TTag] & {
  as?: TTag;
};

export const TextSubtle = component$(
  <TComponent extends ElementType>({ as }: Props<TComponent>) => {
    const Component = as ?? 'p';

    return (
      // @ts-ignore - TODO: how to make this work? There is no autocomplete
      <Component class="text-sm text-white/60">
        <Slot />
      </Component>
    );
  },
);
