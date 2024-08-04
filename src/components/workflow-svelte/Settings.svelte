<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Setting } from '../../types';

  export let settings: Record<string, Setting> = {};

  // Use reactive store to watch for changes in settings
  const settingsStore = writable(settings);

  $: settingsStore.set(settings);

  // $: console.log('settingsStore', $settingsStore);  // Debug statement
</script>

<div class="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden my-4 p-6">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
  <form>
    {#each Object.keys($settingsStore) as key}
      <div class="mb-4 flex items-center" data-key={key}>
        <label for={key} class="block text-sm font-medium text-gray-700 w-1/3">{$settingsStore[key].title}</label>
        <input
          type="text"
          id={key}
          name={key}
          value={$settingsStore[key].value}
          class="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
        />
      </div>
    {/each}
    <div class="flex justify-end">
      <button
        type="submit"
        class="px-4 py-2 bg-primary-dark text-white font-semibold rounded-md shadow hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light"
      >
        Save
      </button>
    </div>
  </form>
</div>
