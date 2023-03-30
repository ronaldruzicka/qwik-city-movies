import { component$, Slot } from '@builder.io/qwik';

import { Sidebar } from '~/components/sidebar';

export default component$(() => {
  return (
    <div class="flex gap-x-5 h-full">
      <Sidebar />
      <Slot />
    </div>
  );
});
