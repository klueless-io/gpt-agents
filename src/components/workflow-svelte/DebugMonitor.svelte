<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { stateStore } from '../../stateStore';

  const dispatch = createEventDispatcher();

  export let visible: boolean = false;

  let currentStep = null;

  const unsubscribe = stateStore.subscribe(state => {
    currentStep = state.currentStep;
  });

  onDestroy(() => {
    unsubscribe();
  });

  function closeDialog() {
    dispatch('close');
  }
</script>

<style>
  .slide-up {
    transition: transform 0.3s ease-in-out;
  }
</style>

<div class={`fixed inset-x-0 bottom-0 bg-black bg-opacity-50 flex justify-center z-50 ${visible ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
  <div class="bg-white shadow-lg rounded-t-lg w-full max-w-5xl h-auto max-h-screen overflow-auto p-6 slide-up">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Debug Monitor</h3>
      <button on:click={closeDialog} class="text-gray-500 hover:text-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    {#if currentStep}
      <div class="text-sm text-gray-700">
        <p><strong>Name:</strong> {currentStep.name}</p>
        <p><strong>Title:</strong> {currentStep.title}</p>
        <p><strong>Order:</strong> {currentStep.order}</p>
        <p><strong>Description:</strong> {currentStep.description || 'None'}</p>
        <p><strong>Prompt:</strong> {currentStep.prompt}</p>
        <p class="mt-4"><strong>Language Models:</strong> {Array.isArray(currentStep.language_models) ? currentStep.language_models.join(', ') : 'None'}</p>
        
        <p><strong>Input Attributes:</strong></p>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-gray-200">Name</th>
              <th class="py-2 px-4 border-b border-gray-200">Type</th>
              <th class="py-2 px-4 border-b border-gray-200">Is Array</th>
              <th class="py-2 px-4 border-b border-gray-200">Description</th>
              <th class="py-2 px-4 border-b border-gray-200">Title</th>
            </tr>
          </thead>
          <tbody>
            {#each currentStep.input_attributes as attr}
              <tr>
                <td class="py-2 px-4 border-b border-gray-200">{attr.name}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.type}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.is_array ? 'True' : 'False'}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.description || 'None'}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.title}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        
        <p class="mt-4"><strong>Output Attributes:</strong></p>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-gray-200">Name</th>
              <th class="py-2 px-4 border-b border-gray-200">Type</th>
              <th class="py-2 px-4 border-b border-gray-200">Is Array</th>
              <th class="py-2 px-4 border-b border-gray-200">Description</th>
              <th class="py-2 px-4 border-b border-gray-200">Title</th>
            </tr>
          </thead>
          <tbody>
            {#each currentStep.output_attributes as attr}
              <tr>
                <td class="py-2 px-4 border-b border-gray-200">{attr.name}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.type}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.is_array ? 'True' : 'False'}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.description || 'None'}</td>
                <td class="py-2 px-4 border-b border-gray-200">{attr.title}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-sm text-gray-700">No current step selected.</p>
    {/if}
  </div>
</div>
