import { component$, Slot } from '@builder.io/qwik';

export const Layout = component$(() => {
  return (
    <div class="grid grid-cols-layout prose gap-4">
      <Slot />
    </div>
  );
});
