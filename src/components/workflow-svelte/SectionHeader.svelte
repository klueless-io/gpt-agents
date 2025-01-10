<script lang="ts">
  import type { Section, Step, Workflow } from '../../types';
  import SectionHeaderTools from './SectionHeaderTools.svelte';

  export let workflow: Workflow;
  export let currentSection: Section;
  export let currentStep: Step;

  // Debug log to check if props are received
  $: console.log('SectionHeader props:', { workflow, currentSection, currentStep });
</script>

<div class="flex justify-between items-center mb-4">
  <h2 class="text-2xl font-semibold text-white">{currentSection.title}</h2>
  {#if workflow && currentSection && currentStep}
    <SectionHeaderTools {workflow} {currentSection} {currentStep} />
  {/if}
</div> 