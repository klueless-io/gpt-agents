// currentComponent:  = 'Attributes'; // ['Attributes', 'Prompts', 'Settings']
// activeMenuItem: = 'Attributers';


import { writable } from 'svelte/store';
import type { AppState } from './types';

const initialState: AppState = {
  currentMenuItem: 'Workflow',
  currentComponent: 'Workflow',
  currentSection: null,
  currentStep: null,
};

export const stateStore = writable(initialState);

