<script lang="ts">
  import { stateStore } from '../../stateStore';
  import type { Section, Step, Workflow } from '../../types';
  import InfoCard from './InfoCard.svelte';
  import WorkflowSectionProgress from './SectionProgress.svelte';
  import WorkflowStep from './Step.svelte';
  import WorkflowSectionHeader from './SectionHeader.svelte';

  // Export the workflow prop
  export let workflow: Workflow;
  
  // Initialize state variables
  let currentSection: Section | null = null;
  let currentStep: Step | null = null;
  
  // Subscribe to the state store
  stateStore.subscribe(state => {
    if (state) {
      currentSection = state.currentSection;
      currentStep = state.currentStep;
      console.log('Workflow component state updated:', { currentSection, currentStep });
    }
  });

  function handleStepSelect(event) {
    const { step, attributes } = event.detail;
    stateStore.update(state => ({
      ...state,
      currentStep: step,
      // Preserve the attributes when changing steps
      attributes: {
        ...state.attributes,
        ...(attributes || {})
      }
    }));
  }
</script>

{#if currentSection && currentStep}
<div class="container mx-auto mt-8 px-4">
  <WorkflowSectionHeader 
    {workflow} 
    {currentSection} 
    {currentStep} 
  />
  <WorkflowSectionProgress 
    {currentSection} 
    {currentStep} 
    on:step-select={handleStepSelect} 
  />
  <WorkflowStep 
    {workflow} 
    {currentSection} 
    {currentStep} 
  />
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
