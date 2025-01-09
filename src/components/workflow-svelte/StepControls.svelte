<script lang="ts">
  import type { Section, Step, Workflow } from '../../types';
  import { stateStore } from '../../stateStore';
  import LeftArrowIcon from './icons/LeftArrowIcon.svelte';
  import LeftUpArrowIcon from './icons/LeftUpArrowIcon.svelte';
  import RightArrowIcon from './icons/RightArrowIcon.svelte';
  import RightDownArrowIcon from './icons/RightDownArrowIcon.svelte';

  export let workflow: Workflow;
  export let currentSection: Section;
  export let currentStep: Step;
  export let showStartButton: boolean = true;

  function goToPreviousStep() {
    const currentStepIndex = currentSection.steps.findIndex(step => step.name === currentStep.name);
    if (currentStepIndex > 0) {
      const previousStep = currentSection.steps[currentStepIndex - 1];
      updateCurrentStep(previousStep);
    } else {
      const currentSectionIndex = workflow.sections.findIndex(section => section.name === currentSection.name);
      if (currentSectionIndex > 0) {
        const previousSection = workflow.sections[currentSectionIndex - 1];
        const previousStep = previousSection.steps[previousSection.steps.length - 1];
        updateCurrentStep(previousStep, previousSection);
      }
    }
  }

  function goToNextStep() {
    const currentStepIndex = currentSection.steps.findIndex(step => step.name === currentStep.name);
    if (currentStepIndex < currentSection.steps.length - 1) {
      const nextStep = currentSection.steps[currentStepIndex + 1];
      updateCurrentStep(nextStep);
    } else {
      const currentSectionIndex = workflow.sections.findIndex(section => section.name === currentSection.name);
      if (currentSectionIndex < workflow.sections.length - 1) {
        const nextSection = workflow.sections[currentSectionIndex + 1];
        const nextStep = nextSection.steps[0];
        updateCurrentStep(nextStep, nextSection);
      }
    }
  }

  function updateCurrentStep(step: Step, section: Section = currentSection) {
    stateStore.update(state => ({
      ...state,
      currentSection: section,
      currentStep: step,
    }));
  }
</script>

<span class="isolate inline-flex rounded-md shadow-sm">
  <button 
    type="button" 
    class="relative inline-flex items-center {!showStartButton ? 'rounded-r-md' : 'rounded-l-md'} bg-white px-2 py-2 text-primary-dark ring-1 ring-inset ring-gray-300 hover:bg-primary-dark hover:text-primary-light focus:z-10" 
    on:click={goToPreviousStep}
  >
    <span class="sr-only">Previous</span>
    {#if currentSection && workflow.sections.findIndex(section => section.name === currentSection.name) > 0 && currentSection.steps.findIndex(step => step.name === currentStep.name) === 0}
      <LeftUpArrowIcon />
    {:else}
      <LeftArrowIcon />
    {/if}
  </button>
  {#if showStartButton}
    <button 
      type="button" 
      class="bg-primary-light text-primary-dark relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-primary-dark hover:text-primary-light focus:z-10"
    >
      Start
    </button>
  {/if}
  <button 
    type="button" 
    class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-primary-dark ring-1 ring-inset ring-gray-300 hover:bg-primary-dark hover:text-primary-light focus:z-10" 
    on:click={goToNextStep}
  >
    <span class="sr-only">Next</span>
    {#if currentSection && workflow.sections.findIndex(section => section.name === currentSection.name) < workflow.sections.length - 1 && currentSection.steps.findIndex(step => step.name === currentStep.name) === currentSection.steps.length - 1}
      <RightDownArrowIcon />
    {:else}
      <RightArrowIcon />
    {/if}
  </button>
</span> 