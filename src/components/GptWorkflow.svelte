<script lang="ts">
  import { onMount } from 'svelte';
  import { workflowStore } from '../workflowStore';
  import type { Workflow } from '../types';

  // Importing the TopBar component
  import TopBar from './TopBar.svelte';

  export let gpt: Workflow;

  onMount(() => {
    workflowStore.set(gpt);
  });

  $: workflow = $workflowStore;
</script>

<div>
  <TopBar {workflow} />
</div>

<style>
  /* Your styles here */
</style>
