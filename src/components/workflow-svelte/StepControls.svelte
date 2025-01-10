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
  export let variant: 'header' | 'body' = 'body';

  $: buttonClasses = variant === 'header' 
    ? 'bg-gray-700 hover:bg-gray-600 text-white ring-1 ring-inset ring-gray-600'
    : 'bg-white hover:bg-primary-dark hover:text-primary-light text-primary-dark ring-1 ring-inset ring-gray-300';

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
    class="relative inline-flex items-center justify-center {!showStartButton ? 'rounded-r-md' : 'rounded-l-md'} {buttonClasses} w-[30px] h-[30px]" 
    on:click={goToPreviousStep}
  >
    <span class="sr-only">Previous</span>
    <span class="flex items-center justify-center">
      {#if currentSection && workflow.sections.findIndex(section => section.name === currentSection.name) > 0 && currentSection.steps.findIndex(step => step.name === currentStep.name) === 0}
        <LeftUpArrowIcon />
      {:else}
        <LeftArrowIcon />
      {/if}
    </span>
  </button>
  {#if showStartButton}
    <button 
      type="button" 
      class="relative -ml-px inline-flex items-center justify-center {buttonClasses} px-3 h-[30px] text-sm font-semibold"
    >
      Start
    </button>
  {/if}
  <button 
    type="button" 
    class="relative -ml-px inline-flex items-center justify-center rounded-r-md {buttonClasses} w-[30px] h-[30px]" 
    on:click={goToNextStep}
  >
    <span class="sr-only">Next</span>
    <span class="flex items-center justify-center">
      {#if currentSection && workflow.sections.findIndex(section => section.name === currentSection.name) < workflow.sections.length - 1 && currentSection.steps.findIndex(step => step.name === currentStep.name) === currentSection.steps.length - 1}
        <RightDownArrowIcon />
      {:else}
        <RightArrowIcon />
      {/if}
    </span>
  </button>
</span> 