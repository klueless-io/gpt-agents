<script lang="ts">
  import type { Section, Workflow } from '../../types';
  import FlowSectionButton from './FlowSectionButton.svelte';
  import FlowStepButton from './FlowStepButton.svelte';
  import InfoCard from './InfoCard.svelte';

  export let workflow: Workflow;
  const totalSteps = workflow.sections.reduce((total: number, section: Section) => total + section.steps.length, 0);
</script>

<div>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
    <InfoCard label="Sections" value={workflow.sections.length} />
    <InfoCard label="Steps" value={totalSteps} />
    <InfoCard label="Attributes" value={Object.keys(workflow.attributes).length} />
    <InfoCard label="Prompts" value={Object.keys(workflow.prompts).length} />
  </dl>
</div>

<div class="container mx-auto mt-8 px-4">
  <div class="overflow-hidden rounded-lg bg-primary-light px-4 py-5 shadow sm:p-6">
    <h3 class="text-4xl text-primary-dark bebas text-center">{workflow.title}</h3>
    <div class="flex flex-col items-center pt-8">
      {#each workflow.sections as section}
        <div class="flex justify-center mb-6 w-full">
          <FlowSectionButton {section} />
        </div>
        <div class="arrow"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 w-full">
          {#each section.steps as step}
            <div class="flex justify-center">
              <FlowStepButton {section} {step} />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .arrow {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid #342d2d;
    margin: 10px 0;
  }
</style>
