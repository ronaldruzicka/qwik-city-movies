import { component$, Slot } from '@builder.io/qwik';

import { Sidebar } from '~/components/sidebar';

export default component$(() => {
  return (
    <div class="flex items-start h-full">
      <Sidebar />
      <main class="flex-1 pb-36">
        <Slot />
      </main>
    </div>
  );
});
