import { writable } from "svelte/store";
import type { Workflow } from "./types";

/**
 * Manages the overall workflow configuration and structure
 * This store contains the static/configuration data that defines the workflow itself
 */
interface Workflow {
  name: string;          // Workflow identifier
  title: string;         // Display title
  description: string;   // Workflow description
  settings: {};          // Workflow-specific settings
  sections: [];          // Available workflow sections
  attributes: {};        // Persistent workflow attributes
  prompts: {};           // Workflow-related prompts/messages
}

export const workflowStore = writable<Workflow>({
  name: "",
  title: "",
  description: "",
  settings: {},
  sections: [],
  attributes: {},
  prompts: {},
});
