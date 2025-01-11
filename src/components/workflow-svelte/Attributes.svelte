<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Attribute } from '../../types';
  import { workflowStore } from '../../stores/workflowStore';

  export let attributes: Record<string, Attribute> = {};

  const attributesStore = writable(attributes);

  $: attributesStore.set(attributes);

  function handleValueChange(event, attributeName) {
    const newValue = event.target.value;
    attributesStore.update(attrs => {
      attrs[attributeName].value = newValue;
      return attrs;
    });

    // Update the value in the workflowStore
    workflowStore.update(workflow => {
      workflow.attributes[attributeName].value = newValue;
      return workflow;
    });
  }
</script>

<div class="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden my-4 p-6">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">Attributes</h2>
  <form>
    <div class="grid grid-cols-4 gap-4">
      <div class="text-sm font-medium text-gray-700">Name</div>
      <div class="text-sm font-medium text-gray-700">Type</div>
      <div class="text-sm font-medium text-gray-700">Is Array</div>
      <div class="text-sm font-medium text-gray-700">Value</div>

      {#each Object.values($attributesStore) as attribute}
        <div class="flex items-center" data-key={`${attribute.name}-name`}>
          <input
            type="text"
            id={`${attribute.name}-name`}
            name={`${attribute.name}-name`}
            value={attribute.name}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            readonly
          />
        </div>
        <div class="flex items-center" data-key={`${attribute.name}-type`}>
          <input
            type="text"
            id={`${attribute.name}-type`}
            name={`${attribute.name}-type`}
            value={attribute.type}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            readonly
          />
        </div>
        <div class="flex items-center justify-center" data-key={`${attribute.name}-is_array`}>
          <input
            type="checkbox"
            id={attribute.name}
            name={attribute.name}
            checked={attribute.is_array}
            disabled
            class="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
          />
        </div>
        <div class="flex items-center" data-key={`${attribute.name}-value`}>
          <input
            type="text"
            id={`${attribute.name}-value`}
            name={`${attribute.name}-value`}
            value={attribute.value || ''}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            on:input={(event) => handleValueChange(event, attribute.name)}
          />
        </div>
      {/each}
    </div>
  </form>
</div>
