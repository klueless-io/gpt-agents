<script lang="ts">
  export let label: string;
  export let value: number | string;
</script>

<div class="overflow-hidden rounded-lg bg-primary-light px-4 py-5 shadow sm:p-6">
  <dt class="truncate text-sm font-medium text-white">{label}</dt>
  <dd class="mt-1 text-3xl font-semibold tracking-tight text-primary-dark">{value}</dd>
</div>
