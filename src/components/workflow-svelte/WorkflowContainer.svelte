<script lang="ts">
  import type { Section, Step } from '../../types';
  import SectionProgress from './SectionProgress.svelte';

  export let currentSection: Section;
  export let currentStep: Step;

  // Debugging statements
  console.log('1:Current Section:', currentSection);
  console.log('1:Current Step:', currentStep);
</script>

<div class="container mx-auto mt-8 px-4">
  <div class="overflow-hidden rounded-lg bg-primary-light px-4 py-5 shadow sm:p-6">
    <h3 class="text-4xl text-primary-dark bebas text-center">Workflow Status</h3>
    <div class="flex flex-col items-center pt-8">
      {#if currentSection && currentStep}
        <div class="text-center mb-4">
          <h4 class="text-2xl text-primary-dark">Current Section</h4>
          <p class="text-lg text-primary-dark"><strong>Name:</strong> {currentSection.name}</p>
          <p class="text-lg text-primary-dark"><strong>Title:</strong> {currentSection.title}</p>
        </div>
        <div class="text-center">
          <h4 class="text-2xl text-primary-dark">Current Step</h4>
          <p class="text-lg text-primary-dark"><strong>Name:</strong> {currentStep.name}</p>
          <p class="text-lg text-primary-dark"><strong>Title:</strong> {currentStep.title}</p>
        </div>
        <SectionProgress {currentSection} {currentStep} />
      {/if}
    </div>
  </div>
</div>
