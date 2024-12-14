<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import DebugMonitor from './DebugMonitor.svelte';
  import CogIcon from './icons/CogIcon.svelte';
  import HomeIcon from './icons/HomeIcon.svelte';
  import SectionIcon from './icons/SectionIcon.svelte';
  import MenuItem from './MenuItem.svelte';
  import QuickAccess from './QuickAccess.svelte';

  export let sections = [];
  export let currentComponent: string;
  export let activeMenuItem: string;

  let showQuickAccessPanel = false;
  let showDebugMonitor = false;

  const dispatch = createEventDispatcher();

  function handleMenuClick(component: string) {
    console.log('Sidebar Menu Clicked:', component.detail);  // Debug statement
    dispatch('menu-click', component.detail);
  }

  function toggleQuickAccessPanel() {
    console.log('Toggling Quick Access Panel:', showQuickAccessPanel); // Debug statement
    showQuickAccessPanel = !showQuickAccessPanel;
  }

  function handleOpenDebugMonitor() {
    console.log('Opening Debug Monitor');  // Debug statement
    showDebugMonitor = true;
  }

  function handleCloseDebugMonitor() {
    console.log('Closing Debug Monitor');  // Debug statement
    showDebugMonitor = false;
    showQuickAccessPanel = false;
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'q' || event.key === 'Q') {
      console.log('Key Pressed:', event.key);  // Debug statement
      toggleQuickAccessPanel();
    }
  }

  onMount(() => {
    console.log('SidebarDesktop::Component mounted');  // Debug statement
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
    }
  });

  onDestroy(() => {
    console.log('SidebarDesktop::Component being destroyed');  // Debug statement
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });
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
      <li class="mt-auto">
        <a
          href="#"
          class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-dark hover:bg-primary-dark hover:text-primary-light"
          on:mouseover|preventDefault={toggleQuickAccessPanel}
        >
          <CogIcon />
          Quick Access
        </a>
      </li>
    </ul>
  </nav>
  {#if showQuickAccessPanel}
    <QuickAccess visible={showQuickAccessPanel} on:close={() => showQuickAccessPanel = false} on:openDebugMonitor={handleOpenDebugMonitor} />
  {/if}
  {#if showDebugMonitor}
    <DebugMonitor visible={showDebugMonitor} on:close={handleCloseDebugMonitor} />
  {/if}
</div>
