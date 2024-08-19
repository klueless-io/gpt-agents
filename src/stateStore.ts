// currentComponent:  = 'Attributes'; // ['Attributes', 'Prompts', 'Settings']
// activeMenuItem: = 'Attributers';

import { writable } from 'svelte/store';
import type { AppState } from './types';

const initialState: AppState = {
  currentMenuItem: "Overview",
  currentComponent: "Overview",
  currentSection: null,
  currentStep: null,
  providers: [],
  toastVisible: false,
  toastMessage: ''
};

export const stateStore = writable(initialState);
