import { writable } from 'svelte/store';
import type { AppState } from './types';

const initialState: AppState = {
  currentMenuItem: 'settings',
  currentComponent: 'Prompts',
  currentStep: {},
};

  // let currentComponent = 'prompts'; // ['attributes', 'prompts', 'settings']
  // let activeMenuItem = 'settings';

export const stateStore = writable(initialState);
