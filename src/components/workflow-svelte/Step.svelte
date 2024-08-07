<script lang="ts">
  import { stateStore } from '../../stateStore';
  import type { Section, Step, Workflow } from '../../types';
  import TagSelect from './TagSelect.svelte';
  import LeftArrowIcon from './icons/LeftArrowIcon.svelte';
  import RightArrowIcon from './icons/RightArrowIcon.svelte';

  export let workflow: Workflow;
  export let currentSection: Section;
  export let currentStep: Step;

  let options = ['ChatGPT 4o', 'ChatGPT 4.0', 'Claude 3.5', 'Gemini'];
  let selectedOptions: string[] = [];

  function handleSelectionChange(event) {
    selectedOptions = event.detail;
  }

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

  // Debugging statements
  // console.log('Step::Workflow:', workflow);
  // console.log('Step::Current Section:', currentSection);
  // console.log('Step::Current Step:', currentStep);
</script>

<div class="w-full bg-white shadow-md rounded-md overflow-hidden my-4 flex flex-col p-6">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">{currentStep.name}</h2>
  <div class="flex gap-8">
    <!-- Input Parameters (Left Column) -->
    <div class="flex-1">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Input Parameters</h3>
      <div class="space-y-2">
        {#each currentStep.input_attributes as attr}
          <div data-key={attr.name}>
            <label for={attr.name} class="block text-sm font-medium text-gray-700">
              {attr.title} {attr.isRequired ? "*" : ""}
            </label>
            <input
              type="text"
              id={attr.name}
              name={attr.name}
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            />
          </div>
        {/each}
      </div>
    </div>

    <!-- Prompt (Right Column) -->
    <div class="flex-1">
      <label for="prompt" class="block text-sm font-medium text-gray-700 mb-2">Prompt</label>
      <textarea
        id="prompt"
        name="prompt"
        rows="20"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
      >{currentStep.prompt}</textarea>

      <!-- Output Attributes (Below Prompt) -->
      <h3 class="text-sm font-medium text-gray-700 mt-4 mb-2">Output Attributes</h3>
      <div class="flex flex-wrap gap-2">
        {#each currentStep.output_attributes as attr}
          <span
            data-key={attr.name}
            class="inline-block bg-primary-light text-primary-dark text-xs font-medium px-2.5 py-0.5 rounded"
          >
            {attr.name}
          </span>
        {/each}
      </div>
    </div>
  </div>

  <!-- Controls (Below Input Parameters and Prompt) -->
  <div class="mt-6 flex items-center gap-4">
    <!-- Language Model Selector -->
    <div class="flex-1 relative">
      <label for="language-model" class="absolute -top-5 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Language Model</label>
      <TagSelect {options} bind:selectedValues={selectedOptions} on:change={handleSelectionChange} />
      <!-- 
      <select
        id="language-model"
        name="language-model"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="model1">ChatGPT 4.0</option>
        <option value="model2">Claude 3.5</option>
        <option value="model3">Gemini</option>
      </select>
      -->
    </div>

    <!-- Controls -->
    <span class="isolate inline-flex rounded-md shadow-sm">
      <button type="button" class="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-primary-dark ring-1 ring-inset ring-gray-300 hover:bg-primary-dark hover:text-primary-light focus:z-10" on:click={goToPreviousStep}>
        <span class="sr-only">Previous</span>
        <LeftArrowIcon />
      </button>
      <button type="button" class="bg-primary-light text-primary-dark relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-primary-dark hover:text-primary-light focus:z-10">Start</button>
      <button type="button" class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-primary-dark ring-1 ring-inset ring-gray-300 hover:bg-primary-dark hover:text-primary-light focus:z-10" on:click={goToNextStep}>
        <span class="sr-only">Next</span>
        <RightArrowIcon />
      </button>
    </span>
  </div>
</div>
