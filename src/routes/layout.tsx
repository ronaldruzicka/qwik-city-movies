import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const use_server_time_loader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class="page">
      <main>
        <Slot />
      </main>
      <div class="section dark">
        <div class="container"></div>
      </div>
    </div>
  );
});
