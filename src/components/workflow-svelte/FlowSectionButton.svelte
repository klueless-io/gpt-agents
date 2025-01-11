<script lang="ts">
  import { stateStore } from '../../stores/stateStore';
  import type { Section } from '../../types';
  export let section: Section;

  function selectSection() {
    if (!section) return;
    console.log(`Section selected: ${section.title}`);
    stateStore.update(state => {
      console.log(`Current state before update:`, state);
      const newState = { ...state, currentComponent: 'Workflow', currentSection: section, currentStep: section.steps[0] || null };
      console.log(`New state after update:`, newState);
      return newState;
    });
  }
</script>

<div 
  class="bg-primary-dark text-white py-4 px-6 rounded-lg mb-6 w-full max-w-xs text-center font-bold shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
  on:click={selectSection}
>
  {section.title}
</div>
