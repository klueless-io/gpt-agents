<script lang="ts">
  export let message: string = '';
  export let visible: boolean = false;

  let timeoutId;

  // Automatically hide the toast after a few seconds when visible
  $: if (visible) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      visible = false;
    }, 3000);
  }
</script>

<div class={`fixed bottom-4 left-4 z-50 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
  <div class="bg-yellow text-primary-dark px-4 py-2 rounded shadow-md">
    {message}
  </div>
</div>
