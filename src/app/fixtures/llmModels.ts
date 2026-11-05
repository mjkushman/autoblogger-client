// Keep in sync with autoblogger-server/src/utilities/llmModels.js
export type LlmModel = {
  model: string;
  label: string;
  provider: "openai" | "anthropic";
};

export const DEFAULT_MODEL = "gpt-5.4-mini";

// Agents saved before models were selectable stored a provider name instead.
const LEGACY_MODELS: Record<string, string> = {
  chatgpt: DEFAULT_MODEL,
  claude: "claude-sonnet-5-5",
};

export const resolveModel = (model: string) => LEGACY_MODELS[model] ?? model;

const models: LlmModel[] = [
  { model: "gpt-5.4-mini", label: "GPT-5.4 mini", provider: "openai" },
  { model: "gpt-5.4", label: "GPT-5.4", provider: "openai" },
  { model: "gpt-5.5", label: "GPT-5.5", provider: "openai" },
  { model: "claude-haiku-5-5", label: "Claude Haiku 5.5", provider: "anthropic" },
  { model: "claude-sonnet-5-5", label: "Claude Sonnet 5.5", provider: "anthropic" },
  { model: "claude-opus-5-5", label: "Claude Opus 5.5", provider: "anthropic" },
];

export const providerName = (model: string) =>
  models.find((m) => m.model === resolveModel(model))?.provider === "anthropic"
    ? "Anthropic"
    : "OpenAI";

export default models;
