<script lang="ts">
  import { stateStore, type AppState } from '../stateStore';
  import type { Workflow } from '../types';
  import { workflowStore } from '../workflowStore';
  import Attributes from './workflow-svelte/Attributes.svelte';
  import Overview from './workflow-svelte/Overview.svelte';
  import Prompts from './workflow-svelte/Prompts.svelte';
  import Settings from './workflow-svelte/Settings.svelte';
  import SidebarDesktop from './workflow-svelte/SidebarDesktop.svelte';
  import SidebarDesktopContainer from './workflow-svelte/SidebarDesktopContainer.svelte';
  import Toast from './workflow-svelte/Toast.svelte';
  import TopBar from './workflow-svelte/TopBar.svelte';
  import WorkflowContainer from './workflow-svelte/Workflow.svelte';

  export let gpt: Workflow;
  let workflow: Workflow;
  let sections = [];
  let attributes = {};
  let prompts = {};
  let settings = {};
  let currentSection = null;
  let currentStep = null;
  let open = false;

  let state: AppState;

  $: workflowStore.set(gpt);
  $: stateStore.subscribe(value => {
    state = value;
    currentSection = state.currentSection;
    currentStep = state.currentStep;
  });

  workflowStore.subscribe(value => {
    workflow = value;
    sections = workflow.sections;
    settings = workflow.settings;
    attributes = workflow.attributes;
    prompts = workflow.prompts;
  });

  function handleMenuClick(event) {
    // console.log('GptWorkflow handleMenuClick:', event.detail); // Debug statement
    // console.log('GptWorkflow handleMenuClick 2:', event.detail.detail); // Debug statement
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
        {#if state.currentComponent === 'Overview'}
          <Overview {workflow} />
        {:else if state.currentComponent === 'Workflow' && currentSection && currentStep}
          <WorkflowContainer {workflow} {currentSection} {currentStep} />
        {:else if state.currentComponent === 'Attributes'}
          <Attributes {attributes} />
        {:else if state.currentComponent === 'Prompts'}
          <Prompts {prompts} />
        {:else if state.currentComponent === 'Settings'}
          <Settings {settings} />
        {/if}
      </div>
    </main>
  </div>
  <Toast visible={state.toastVisible} message={state.toastMessage} />
</div>
