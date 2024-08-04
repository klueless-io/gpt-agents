// types.ts

// State management related interfaces

export interface AppState {
  currentMenuItem: string;
  currentComponent: string;
  currentStep: Record<string, number>; // Mapping section name to step index
}

// Combined interface for props
export interface AppStateProps {
  workflow: Workflow;
  state: AppState;
}



// Setting related interfaces
export interface Setting {
  name: string;
  value: {
    title: string;
    name: string;
    value: string;
  };
}

export interface SettingsProps {
  settings: Setting[];
}

// Attribute related interfaces
export interface Attribute {
  name: string;
  type: string;
  is_array: boolean;
}

export interface AttributeProps {
  attributes: Record<string, Attribute>;
}

// Prompt related interfaces
export interface Prompt {
  name: string;
  content: string;
}

export interface PromptProps {
  prompts: Record<string, Prompt>;
}

// Step related interfaces
export interface Step {
  name: string;
  title: string;
  order: number;
  description: string | null;
  prompt: string;
  input_attributes: Attribute[];
  output_attributes: Attribute[];
}

export interface StepProps {
  steps: Step[];
}

// Section related interfaces
export interface Section {
  name: string;
  title: string;
  order: number;
  description: string | null;
  steps: Step[];
}

export interface SectionProps {
  sections: Section[];
}

// Workflow related interfaces
export interface Workflow {
  name: string;
  title: string;
  description: string;
  settings: Record<string, Setting>;
  sections: Section[];
  attributes: Record<string, Attribute>;
  prompts: Record<string, Prompt>;
}

export interface WorkflowProps {
  workflow: Workflow;
}
