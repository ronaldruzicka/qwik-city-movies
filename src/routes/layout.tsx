import { component$, Slot } from '@builder.io/qwik';

import { Sidebar } from '~/components/sidebar';

export default component$(() => {
  return (
    <div class="flex items-start h-full">
      <Sidebar />
      <Slot />
    </div>
  );
});
