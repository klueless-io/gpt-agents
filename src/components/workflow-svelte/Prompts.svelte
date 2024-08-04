<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Prompt } from '../../types';

  export let prompts: Record<string, Prompt> = {};

  const promptsStore = writable(prompts);

  $: promptsStore.set(prompts);

  $: console.log('promptsStore', $promptsStore);  // Debug statement
</script>

<div class="mt-8">
  <h2 class="text-2xl font-semibold text-white mb-4">Prompts</h2>
  <ul class="flex flex-col space-y-4">
    {#each Object.values($promptsStore) as prompt}
      <li class="bg-white p-4 rounded shadow" data-key={prompt.name}>
        <h3 class="text-xl font-bold text-primary-dark mb-2">{prompt.name}</h3>
        <textarea
          id={prompt.name}
          name={prompt.name}
          rows="10"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm bg-white text-primary-dark"
        >{prompt.content}</textarea>
      </li>
    {/each}
  </ul>
</div>
