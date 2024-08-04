<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let name: string;
  export let active: boolean;
  export let component: string;

  const dispatch = createEventDispatcher();

  const activeClass = "bg-primary-dark text-white";
  const inactiveClass = "text-primary-dark hover:text-primary-light hover:bg-primary-dark";

  function handleClick() {
    dispatch('menu-click', component);
  }
</script>

<li>
  <a
    href="#"
    class={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold {active ? activeClass : inactiveClass}`}
    on:click|preventDefault={handleClick}
  >
    <slot />
    {name}
  </a>
</li>
