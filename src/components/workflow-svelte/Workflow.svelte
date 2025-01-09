<script lang="ts">
  import { stateStore } from '../../stateStore';
  import type { Section, Step } from '../../types';
  import InfoCard from './InfoCard.svelte';
  import WorkflowSectionProgress from './SectionProgress.svelte';
  import WorkflowStep from './Step.svelte';
  import WorkflowSectionHeader from './SectionHeader.svelte';

  export let workflow: Workflow;
  export let currentSection: Section;
  export let currentStep: Step;

  // Debugging statements
  // console.log('1:Current Workflow:', workflow);
  // console.log('1:Current Section:', currentSection);
  // console.log('1:Current Step:', currentStep);

  function handleStepSelect(event) {
    const selectedStep = event.detail;
    stateStore.update(state => ({
      ...state,
      currentStep: selectedStep
    }));
  }
</script>

{#if currentSection && currentStep}
<div class="container mx-auto mt-8 px-4">
  <WorkflowSectionHeader {currentSection} />
  <WorkflowSectionProgress {currentSection} {currentStep} on:step-select={handleStepSelect} />
  <WorkflowStep {workflow} {currentSection} {currentStep} />
  <div>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4 mb-4">
      <InfoCard label="Section Name" value={currentSection.name} />
      <InfoCard label="Section Title" value={currentSection.title} />
      <InfoCard label="Step Name" value={currentStep.name} />
      <InfoCard label="Step Title" value={currentStep.title} />
      </dl>
  </div>
</div>
{/if}
