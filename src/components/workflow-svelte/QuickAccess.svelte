<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let visible: boolean = false;

  function closePanel() {
    dispatch('close');
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'q' || event.key === 'Q') {
      visible = !visible;
    }
  }

  function handleMouseLeave() {
    visible = false;
  }

  function openDebugMonitor() {
    dispatch('openDebugMonitor');
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });
</script>

<style>
  .chiselled-border {
    border: 3px solid;
    border-image: linear-gradient(to top left, #342d2d, #ccba9d) 1;
  }
</style>

<div 
  class={`fixed bottom-0 left-0 w-72 h-96 bg-primary-dark shadow-lg transition-transform transform ${visible ? 'translate-y-0' : 'translate-y-full'} chiselled-border`}
  on:mouseleave={handleMouseLeave}
>
  <div class="p-4">
    <h3 class="text-md font-semibold text-primary-light">Quick Access</h3>
    <button class="mt-4 px-3 py-1 bg-gray-200 rounded" on:click={openDebugMonitor}>Debug Monitor</button>
    <!-- Add more content here -->
  </div>
</div>
