<script lang="ts">
  import { stateStore } from '../../stores/stateStore';
  import type { Section, Step, Workflow } from '../../types';
  import { providers } from '../../types';
  import { workflowStore } from '../../stores/workflowStore';

  import LeftArrowIcon from './icons/LeftArrowIcon.svelte';
  import LeftUpArrowIcon from './icons/LeftUpArrowIcon.svelte';
  import RightArrowIcon from './icons/RightArrowIcon.svelte';
  import RightDownArrowIcon from './icons/RightDownArrowIcon.svelte';
  import TagSelect from './TagSelect.svelte';
  import StepControls from './StepControls.svelte';

  export let workflow: Workflow;
  export let currentSection: Section;
  export let currentStep: Step;

  let options: string[] = [];
  let selectedOptions: string[] = currentStep.language_models;
  let interpolatedPrompt: string = currentStep.prompt;

  let isCollapsed: boolean = true; // To manage the collapsible state

  // Populate options for language models
  options = providers.flatMap(provider => provider.models.map(model => model.apiCode));

  // Function to update the interpolated prompt
  function updateInterpolatedPrompt(prompt: string) {
    interpolatedPrompt = prompt.replace(/\[([^\]]+)\]/g, (_, placeholder) => {
      const matchingAttr = workflow.attributes[placeholder];
      return matchingAttr && matchingAttr.value ? matchingAttr.value : `[${placeholder}]`;
    });
  }

  // Call the update function whenever the input fields change
  $: currentStep.input_attributes, updateInterpolatedPrompt(currentStep.prompt);

  function handleSelectionChange(event) {
    selectedOptions = event.detail;
  }

  function handlePromptChange(event) {
    currentStep.prompt = event.target.value;
    updateInterpolatedPrompt(currentStep.prompt);
  }

  function handleInputChange(event, attrName) {
    const newValue = event.target.value;

    // Update the corresponding attribute's value in the workflow store
    workflowStore.update(workflow => {
      if (workflow.attributes[attrName]) {
        workflow.attributes[attrName].value = newValue;
      }
      return workflow;
    });

    updateInterpolatedPrompt(currentStep.prompt);
  }

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }

  function copyToClipboard() {
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

<div class="w-full bg-white shadow-md rounded-md overflow-hidden my-4 flex flex-col p-6 py-16">
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
              value={workflow.attributes[attr.name]?.value || ''}
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
              on:input={(event) => handleInputChange(event, attr.name)}
            />
          </div>
        {/each}
      </div>

      <!-- Collapsible Interpolated Prompt -->
      <div class="mt-4">
        <div class="flex items-center justify-between">
          <button
            class="text-sm font-medium text-gray-700 mb-2 focus:outline-none"
            on:click={toggleCollapse}
          >
            {isCollapsed ? 'Show' : 'Hide'} Interpolated Prompt
          </button>
          <button
            class="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded"
            on:click={copyToClipboard}
          >
            Copy
          </button>
        </div>
        {#if !isCollapsed}
          <div class="mt-2">
            <textarea
              id="interpolated-prompt"
              name="interpolated-prompt"
              rows="10"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
              readonly
            >{interpolatedPrompt}</textarea>
          </div>
        {/if}
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
        on:input={handlePromptChange}
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
    </div>

    <!-- Controls -->
    <StepControls {workflow} {currentSection} {currentStep} />
  </div>
</div>
