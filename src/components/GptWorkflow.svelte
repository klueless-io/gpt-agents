<script lang="ts">
  import { stateStore, type AppState } from '../stateStore';
  import type { Workflow } from '../types';
  import { workflowStore } from '../workflowStore';
  import TopBar from './workflow-svelte/TopBar.svelte';
// import SidebarMobileContainer from './workflow-svelte/SidebarMobileContainer.sveltexxx';
  // import SidebarMobile from './workflow-svelte/SidebarMobile.sveltexxxc';
  import Attributes from './workflow-svelte/Attributes.svelte';
  import Prompts from './workflow-svelte/Prompts.svelte';
  import Settings from './workflow-svelte/Settings.svelte';
  import SidebarDesktop from './workflow-svelte/SidebarDesktop.svelte';
  import SidebarDesktopContainer from './workflow-svelte/SidebarDesktopContainer.svelte';

  export let gpt: Workflow;
  let workflow: Workflow;
  let sections = [];
  let attributes = {};
  let prompts = {};
  let settings = {};
  let open = false;

  let state: AppState;

  $: workflowStore.set(gpt);
  $: stateStore.subscribe(value => {
    state = value;
  });

  workflowStore.subscribe(value => {
    workflow = value;
    sections = workflow.sections;
    settings = workflow.settings;
    attributes = workflow.attributes;
    prompts = workflow.prompts;
  });

  // onMount(() => {
  //   // console.log('gpt', JSON.stringify(gpt, null, 2));
  //   workflowStore.set(gpt);
  //   workflowStore.subscribe((value) => {
  //     workflow = value;
  //     sections = workflow.sections;
  //     settings = workflow.settings;
  //     prompts = workflow.prompts;
  //     attributes = workflow.attributes;

  //     // console.log('workflow', JSON.stringify(workflow, null, 2));
  //     // console.log('sections', JSON.stringify(sections, null, 2));
  //     // console.log('attributes', JSON.stringify(attributes, null, 2));
  //     console.log('prompts', JSON.stringify(prompts, null, 2));
  //     // console.log('settings', JSON.stringify(settings, null, 2));
  //   });
  // });

  function handleMenuClick(event) {
    console.log('GptWorkflow handleMenuClick:', event.detail); // Debug statement
    console.log('GptWorkflow handleMenuClick 2:', event.detail.detail); // Debug statement
    stateStore.update(s => ({
      ...s,
      currentMenuItem: event.detail,
      currentComponent: event.detail,
    }));
    open = false;
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      open = false;
    }
  }
</script>

<div on:keydown={handleEscapeKey}>
  <!-- 
  <SidebarMobileContainer {open}>
    <SidebarMobile {sections} {currentComponent} {activeMenuItem} on:menu-click={handleMenuClick} />
  </SidebarMobileContainer>
  -->

  <SidebarDesktopContainer>
    <SidebarDesktop {sections} currentComponent={state.currentComponent} activeMenuItem={state.currentMenuItem} on:menu-click={handleMenuClick} />
  </SidebarDesktopContainer>

  <div class="lg:pl-72">
    <TopBar {workflow} />
    <main class="py-10">
      <div class="px-4 sm:px-6 lg:px-8">
        {#if state.currentComponent === 'Attributes'}
          <Attributes {attributes} />
        {:else if state.currentComponent === 'Prompts'}
          <Prompts {prompts} />
        {:else if state.currentComponent === 'Settings'}
          <Settings {settings} />
        {/if}
      </div>
    </main>
  </div>
</div>
