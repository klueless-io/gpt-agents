export interface Setting {
  name: string;
  value: string;
}

export interface SettingsProps {
  settings: Setting[];
}

export interface Prompt {
  name: string;
  content: string;
}

export interface PromptProps {
  prompts: Record<string, Prompt>;
}

// types.ts

export interface Attribute {
  name: string;
  type: string;
  is_array: boolean;
}

export interface AttributeProps {
  attributes: Record<string, Attribute>;
}
