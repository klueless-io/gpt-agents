<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Section, Step } from '../../types';

  export let currentSection: Section;
  export let currentStep: Step;

  // Create an event dispatcher
  const dispatch = createEventDispatcher();

  // Dispatch an event when a step is clicked
  function selectStep(step: Step) {
    dispatch('step-select', step);
  }

  // Debugging statements
  console.log('Current Section:', currentSection);
  console.log('Current Step:', currentStep);
</script>

{#if currentSection && currentSection.steps.length > 0 && currentStep}
  <nav aria-label="Progress">
    <ol role="list" class="divide-y divide-gray-600 rounded-md border border-gray-300 md:flex md:divide-y-0 bg-primary-light">
      {#each currentSection.steps as step, index}
        <li class="relative md:flex md:flex-1" data-key={step.name} on:click={() => selectStep(step)}>
          <a href="#" class={`group flex w-full items-center ${index <= currentSection.steps.indexOf(currentStep) ? 'text-primary-dark' : 'text-primary-dark'}`}>
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span class={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${index < currentSection.steps.indexOf(currentStep) ? 'bg-primary-dark' : (index === currentSection.steps.indexOf(currentStep) ? 'bg-white border-2 border-primary-dark' : 'border-2 border-primary-dark')}`}>
                {#if index < currentSection.steps.indexOf(currentStep)}
                  <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
                {:else}
                  <span class={index === currentSection.steps.indexOf(currentStep) ? 'text-primary-dark' : 'text-primary-dark'}>{String(index + 1).padStart(2, '0')}</span>
                {/if}
              </span>
              <span class="ml-4 text-sm font-medium">{step.name}</span>
            </span>
          </a>
          {#if index < currentSection.steps.length - 1}
            <div class="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
              <svg class="h-full w-full text-gray-600" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
              </svg>
            </div>
          {/if}
        </li>
      {/each}
    </ol>
  </nav>
{/if}
