import { writable } from 'svelte/store';
import type { Section, Step } from '../types';

/**
 * Manages the current application state including the active section, step, and attributes
 * This store handles temporary/runtime state that changes as users navigate through the workflow
 */
interface State {
  currentSection: Section | null;  // Currently active section
  currentStep: Step | null;        // Currently active step
  attributes: Record<string, any>; // Dynamic attributes for the current state
}

const initialState: State = {
  currentSection: null,
  currentStep: null,
  attributes: {}
};

function createStateStore() {
  const { subscribe, set, update } = writable<State>(initialState);

  return {
    subscribe,
    set,
    update,
    setStep: (step: Step) => {
      update(state => ({
        ...state,
        currentStep: step,
        attributes: {
          ...state.attributes
        }
      }));
    }
  };
}

export const stateStore = createStateStore();
