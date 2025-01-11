import { writable } from 'svelte/store';
import type { Section, Step } from './types';

interface State {
  currentSection: Section | null;
  currentStep: Step | null;
  attributes: Record<string, any>;
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
