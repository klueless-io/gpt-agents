// types.ts

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
  prompt: string;
  input_attributes: { name: string; isArray: boolean; isRequired: boolean }[];
  output_attributes: { name: string; isArray: boolean; isRequired: boolean }[];
}

// Section related interfaces
export interface Section {
  name: string;
  steps: Step[];
}

// Workflow related interfaces
export interface Workflow {
  sections: Section[];
  attributes: Record<string, Attribute>;
  prompts: Record<string, Prompt>;
}

