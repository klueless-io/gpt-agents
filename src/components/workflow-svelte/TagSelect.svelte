<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import TomSelect from 'tom-select';

  export let options: string[] = [];
  export let selectedValues: string[] = [];

  let selectElement;
  let tomSelectInstance;

  // Create a custom event dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  onMount(() => {
    console.log('TagSelect::onMount::Options:', options);  // Debugging statement
    console.log('TagSelect::onMount::Selected Values:', selectedValues);  // Debugging statement

    tomSelectInstance = new TomSelect(selectElement, {
      options: options.map(option => ({ value: option, text: option })),
      items: selectedValues,
      create: false,
      maxItems: null,
      plugins: ['remove_button'],
      onChange: (values) => {
        console.log('TagSelect::Selected values changed:', values);  // Debugging statement
        selectedValues = values;
        dispatch('change', selectedValues);
      }
    });

    console.log('TagSelect::TomSelect instance created:', tomSelectInstance);  // Debugging statement
  });

  onDestroy(() => {
    console.log('TagSelect::Component is being destroyed');  // Debugging statement
    tomSelectInstance.destroy();
  });
</script>

<select bind:this={selectElement} multiple></select>
