<script lang="ts">
  import type { Section } from '../../types';
  export let currentSection: Section;
</script>

<div class="flex justify-between items-center mb-4">
  <h2 class="text-2xl font-semibold text-white">{currentSection.title}</h2>
  <div class="flex gap-2">
    <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">
      Share
    </button>
    <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">
      Export
    </button>
  </div>
</div> 