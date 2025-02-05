import { get } from 'svelte/store';
import { stateStore } from './stateStore';
import { workflowStore } from './workflowStore';

/**
 * Provides actions/operations that can be performed on workflow data
 * This store contains utility functions for importing/exporting workflow state
 */
export const workflowActions = {
  async saveToClipboard() {
    const state = get(stateStore);
    const workflowState = get(workflowStore);
    
    const exportData = {
      workflow: workflowState.name,
      section: state.currentSection?.name,
      step: state.currentStep?.name,
      attributes: {
        ...workflowState.attributes,
        ...(state.attributes || {}),
      },
      timestamp: new Date().toISOString()
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
      stateStore.update(state => ({
        ...state,
        toastMessage: 'Copied to clipboard!',
        toastVisible: true,
      }));
      setTimeout(() => {
        stateStore.update(state => ({
          ...state,
          toastVisible: false,
        }));
      }, 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  },

  async loadFromClipboard() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const importData = JSON.parse(clipboardText);
      
      if (!importData.attributes) {
        throw new Error('Invalid clipboard data: missing attributes');
      }

      workflowStore.update(workflow => ({
        ...workflow,
        attributes: {
          ...workflow.attributes,
          ...importData.attributes
        }
      }));

      stateStore.update(state => ({
        ...state,
        toastMessage: 'Data pasted successfully!',
        toastVisible: true,
      }));

      setTimeout(() => {
        stateStore.update(state => ({
          ...state,
          toastVisible: false,
        }));
      }, 3000);

    } catch (error) {
      console.error('Paste error:', error);
      stateStore.update(state => ({
        ...state,
        toastMessage: 'Error pasting data. Please check the clipboard content.',
        toastVisible: true,
      }));

      setTimeout(() => {
        stateStore.update(state => ({
          ...state,
          toastVisible: false,
        }));
      }, 3000);
    }
  },

  saveToFile() {
    const state = get(stateStore);
    const workflowState = get(workflowStore);
    
    const exportData = {
      workflow: workflowState.name,
      section: state.currentSection?.name,
      step: state.currentStep?.name,
      attributes: {
        ...workflowState.attributes,
        ...(state.attributes || {}),
      },
      timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workflow-export-${workflowState.name}-${state.currentSection?.name || 'export'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target?.result as string);
          
          if (!importData.attributes) {
            throw new Error('Invalid import file: missing attributes');
          }

          workflowStore.update(workflow => ({
            ...workflow,
            attributes: {
              ...workflow.attributes,
              ...importData.attributes
            }
          }));

          stateStore.update(state => ({
            ...state,
            toastMessage: 'Data imported successfully!',
            toastVisible: true,
          }));

          setTimeout(() => {
            stateStore.update(state => ({
              ...state,
              toastVisible: false,
            }));
          }, 3000);

        } catch (error) {
          console.error('Import error:', error);
          stateStore.update(state => ({
            ...state,
            toastMessage: 'Error importing data. Please check the file format.',
            toastVisible: true,
          }));

          setTimeout(() => {
            stateStore.update(state => ({
              ...state,
              toastVisible: false,
            }));
          }, 3000);
        }
      };

      reader.readAsText(file);
    };

    input.click();
  },

  saveDocToClipboard: () => {
    let currentWorkflow;
    
    console.log('Starting saveDocToClipboard');
    
    const unsubscribe = workflowStore.subscribe(value => {
      console.log('Workflow store value:', value);
      currentWorkflow = value;
    });
    unsubscribe();

    if (!currentWorkflow) {
      console.error('No workflow data available');
      return;
    }

    // Helper function to safely stringify values
    const formatValue = (value: any): string => {
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') {
        return value.value || value.content || JSON.stringify(value);
      }
      return String(value);
    };

    // Create markdown documentation
    let markdown = `# ${currentWorkflow.name || 'Untitled Workflow'}\n\n`;
    
    if (currentWorkflow.description) {
      markdown += `${formatValue(currentWorkflow.description)}\n\n`;
    }

    if (currentWorkflow.prompts && currentWorkflow.prompts.length > 0) {
      markdown += `## Prompts\n\n`;
      currentWorkflow.prompts.forEach(prompt => {
        markdown += `### ${prompt.name || 'Unnamed Prompt'}\n`;
        if (prompt.description) {
          markdown += `${prompt.description}\n\n`;
        }
        if (prompt.content) {
          markdown += `\`\`\`\n${prompt.content}\n\`\`\`\n\n`;
        }
      });
    }

    if (currentWorkflow.sections && currentWorkflow.sections.length > 0) {
      markdown += `## Sections\n\n`;
      currentWorkflow.sections.forEach(section => {
        markdown += `### ${formatValue(section.name)}\n`;
        if (section.description) {
          markdown += `${formatValue(section.description)}\n\n`;
        }
      });
    }

    if (currentWorkflow.attributes && Object.keys(currentWorkflow.attributes).length > 0) {
      markdown += `## Attributes\n\n`;
      Object.entries(currentWorkflow.attributes).forEach(([key, value]) => {
        markdown += `- **${key}**: ${formatValue(value)}\n`;
      });
      markdown += '\n';
    }

    if (currentWorkflow.settings) {
      markdown += `## Settings\n\n`;
      Object.entries(currentWorkflow.settings).forEach(([key, value]) => {
        markdown += `- **${key}**: ${formatValue(value)}\n`;
      });
    }

    console.log('Final markdown:', markdown);
    navigator.clipboard.writeText(markdown).then(() => {
      stateStore.update(state => ({
        ...state,
        toastMessage: 'Documentation copied to clipboard!',
        toastVisible: true,
      }));

      setTimeout(() => {
        stateStore.update(state => ({
          ...state,
          toastVisible: false,
        }));
      }, 3000);
    });
  }
}; 