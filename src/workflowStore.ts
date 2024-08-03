import { writable } from 'svelte/store';
import type { Workflow } from './types';

export const workflowStore = writable<Workflow>({
  name: '',
  title: '',
  description: '',
  settings: {},
  sections: [],
  attributes: {},
  prompts: {},
});
