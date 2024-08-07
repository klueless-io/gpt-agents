<!-- Select.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import TomSelect from 'tom-select';

  export let options: string[] = [];
  export let selectedValues: string[] = [];

  let selectElement;

  onMount(() => {
    console.log('Component has been mounted');
    const tomSelectInstance = new TomSelect(selectElement, {
      options: options.map(option => ({ value: option, text: option })),
      items: selectedValues,
      create: false,
      maxItems: null,
      plugins: ['remove_button'],
      onChange: (values) => {
        console.log('Selected values changed:', values);
        selectedValues = values;
        dispatch('change', selectedValues);
      }
    });

    console.log('TomSelect instance created:', tomSelectInstance);

    return () => {
      console.log('Component is being destroyed');
      tomSelectInstance.destroy();
    };
  });

  // Create a custom event dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

  <select bind:this={selectElement} multiple></select>
