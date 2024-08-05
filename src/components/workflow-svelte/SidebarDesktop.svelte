<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import MenuItem from './MenuItem.svelte';
  import HomeIcon from './icons/HomeIcon.svelte';
  import SectionIcon from './icons/SectionIcon.svelte';

  export let sections = [];
  export let currentComponent: string;
  export let activeMenuItem: string;

  const dispatch = createEventDispatcher();

  function handleMenuClick(component: string) {
    console.log('Sidebar Menu Clicked:', component.detail);  // Debug statement
    dispatch('menu-click', component.detail);
  }
</script>

<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-light px-6 pb-4">
  <div class="flex h-16 shrink-0 items-center">
    <img src="/images/logo-appy-cast-image.png" alt="AppyDave" class='my-w-60px my-h-60px' />
    <h3 class="text-3xl text-white bebas">Agent <span class="text-primary-dark">Workflow</span></h3>
  </div>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <li>
            <MenuItem name="Overview" active={activeMenuItem === 'Overview'} component="Overview" on:menu-click={handleMenuClick}>
              <HomeIcon />
            </MenuItem>
          </li>
          <div class="text-xs font-semibold leading-6 text-primary-dark">Sections</div>
          {#each sections as section, index}
            <li>
              <MenuItem name={section.name} active={activeMenuItem === section.name} component={section.name} on:menu-click={handleMenuClick}>
                <SectionIcon />
              </MenuItem>
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <div class="text-xs font-semibold leading-6 text-primary-dark">Common</div>
        <ul role="list" class="-mx-2 mt-2 space-y-1">
          <MenuItem name="Attributes" letter="A" active={activeMenuItem === 'Attributes'} component="Attributes" on:menu-click={handleMenuClick} />
          <MenuItem name="Prompts" letter="P" active={activeMenuItem === 'Prompts'} component="Prompts" on:menu-click={handleMenuClick} />
          <MenuItem name="Settings" letter="S" active={activeMenuItem === 'Settings'} component="Settings" on:menu-click={handleMenuClick} />
        </ul>
      </li>
    </ul>
  </nav>
</div>
