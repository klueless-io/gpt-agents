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



// import { writable } from 'svelte/store';
// import type { Workflow } from './types';

// const initialState: Workflow = {
//   name: '',
//   title: '',
//   description: '',
//   settings: {},
//   sections: [],
//   attributes: {},
//   prompts: {},
// };

// export const stateStore = writable(initialState);