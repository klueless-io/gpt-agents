<script lang="ts">
  import type { Section, Step, Workflow } from '../../types';
  import StepControls from './StepControls.svelte';
  import { stateStore } from '../../stateStore';

  export let workflow: Workflow;
  export let currentSection: Section;
  export let currentStep: Step;

  function handleCopy() {
    // Get the interpolated prompt from the current step
    const interpolatedPrompt = currentStep.prompt.replace(/\[([^\]]+)\]/g, (_, placeholder) => {
      const matchingAttr = workflow.attributes[placeholder];
      return matchingAttr && matchingAttr.value ? matchingAttr.value : `[${placeholder}]`;
    });

    // Copy to clipboard
    navigator.clipboard.writeText(interpolatedPrompt).then(() => {
      stateStore.update(state => ({
        ...state,
        toastMessage: 'Copied to clipboard!',
        toastVisible: true,
      }));

      setTimeout(() => {
        stateStore.update(state => ({
          ...state,
          toastVisible: false,
        }));
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
</script>

<div class="flex gap-4 items-center">
  <button 
    class="px-3 py-1 h-[30px] bg-gray-700 hover:bg-gray-600 text-white rounded inline-flex items-center justify-center"
    on:click={handleCopy}
  >
    Copy
  </button>
  <StepControls 
    {workflow} 
    {currentSection} 
    {currentStep} 
    showStartButton={true}
    variant="header" 
  />
</div> 