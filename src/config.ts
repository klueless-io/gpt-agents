// config.ts

import type { Provider } from './types';

export const providers: Provider[] = [
  {
    name: "OpenAI",
    models: [
      { name: "GPT-4o", apiCode: "gpt-4o" },
      { name: "GPT-4", apiCode: "gpt-4" },
      { name: "GPT-4 Turbo", apiCode: "gpt-4-turbo" },
      { name: "GPT-3.5", apiCode: "gpt-3.5" },
      { name: "Codex", apiCode: "codex" }
    ]
  },
  {
    name: "Google DeepMind",
    models: [
      { name: "Gemini 1.5 Pro", apiCode: "gemini-1.5-pro" },
      { name: "Gemini 1.5 Flash", apiCode: "gemini-1.5-flash" },
      { name: "PaLM 2", apiCode: "palm-2" },
      { name: "BERT", apiCode: "bert" },
      { name: "LaMDA", apiCode: "lamda" }
    ]
  },
  {
    name: "Anthropic",
    models: [
      { name: "Claude 3.5 Sonnet", apiCode: "claude-3.5-sonnet" },
      { name: "Claude 3 Opus", apiCode: "claude-3-opus" },
      { name: "Claude 3 Haiku", apiCode: "claude-3-haiku" },
      { name: "Claude 2", apiCode: "claude-2" },
      { name: "Claude", apiCode: "claude" }
    ]
  },
  {
    name: "Meta (Facebook AI Research)",
    models: [
      { name: "LLaMA 3", apiCode: "llama-3" },
      { name: "LLaMA 2", apiCode: "llama-2" },
      { name: "Code LLaMA", apiCode: "code-llama" },
      { name: "BlenderBot", apiCode: "blenderbot" },
      { name: "RoBERTa", apiCode: "roberta" }
    ]
  },
  {
    name: "Grok",
    models: [
      { name: "Grok 2.0", apiCode: "grok-2.0" },
      { name: "Grok 1.5", apiCode: "grok-1.5" },
      { name: "Grok Ultra", apiCode: "grok-ultra" },
      { name: "Grok Pro", apiCode: "grok-pro" },
      { name: "Grok Lite", apiCode: "grok-lite" }
    ]
  },
  {
    name: "Future Models":,
    models: [
      { name: "CriticAI", apiCode: "critic-ai" },
      { name: "Perplixity", apiCode: "perplixity" },
      { name: "PyschicAI", apiCode: "psychic-ai" },
    ]
  }
];
