<script lang="ts">
  import { stateStore } from '../../stateStore';
  import type { Section, Step } from '../../types';
  export let section: Section;
  export let step: Step;

  function selectStep() {
    if (!step || !section) return;
    console.log(`Step selected: ${step.title} in section: ${section.title}`);
    stateStore.update(state => {
      console.log(`Current state before update:`, state);
      const newState = { ...state, currentComponent: 'Workflow', currentSection: section, currentStep: step };
      console.log(`New state after update:`, newState);
      return newState;
    });
  }
</script>

{#if step}
  <div 
    class="bg-white border-2 border-primary-dark rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:bg-yellow hover:scale-105 w-full max-w-xs"
    on:click={selectStep}
  >
    {step.title}
  </div>
{/if}
