<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let name: string;
  export let letter: string | undefined = undefined;
  export let active: boolean;
  export let component: string;

  const dispatch = createEventDispatcher();

  const activeClass = "bg-primary-dark text-white";
  const inactiveClass = "text-primary-dark hover:text-primary-light hover:bg-primary-dark";

  function handleClick() {
    console.log(`MenuItem clicked: component=${component}`); // Debug statement
    dispatch('menu-click', component);
  }
</script>

<li>
  <a
    href="#"
    class={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${active ? activeClass : inactiveClass}`}
    on:click|preventDefault={handleClick}
  >
    {#if letter}
      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-primary-light bg-primary-dark text-[0.625rem] font-medium text-white">{letter}</span>
    {/if}
    <slot />
    <span class="truncate">{name}</span>
  </a>
</li>
