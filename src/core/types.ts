export interface GenAIObservabilityOptions {
  /**
   * The storage provider to use.
   * Defaults to 'sqlite' (simple and effective)
   */
  storage?: 'sqlite'; // Future-proofing for more options later (e.g. 'postgres', 'mongodb', 'memory')

  /**
   * The file path for SQLite storage. Ignored for other storage types.
   * Defaults to './genai-observability.db' (right in your project folder)
   */
  sqliteFilePath?: string;

  /**
   * Enable debug mode. Use this if you like reading logs.
   */
  debug?: boolean;
}

/**
 * Standardized usage metrics. Counting the beans (tokens).
 */
export interface LLMUsage {
  /** Number of tokens in the prompt/input */
  promptTokens: number;

  /** Number of tokens in the completion/output */
  completionTokens: number;

  /** Total tokens consumed */
  totalTokens: number;

  /** Calculated cost in USD (optional) */
  cost?: number;
}

/**
 * A standardized event representing an LLM interaction.
 * Provider-agnostic, so it works with everyone.
 */
export interface LLMEvent {
  /** Unique identifier for the event. Don't lose it. */
  id: string;

  /** The AI provider used (e.g. 'openai', 'anthropic') */
  provider: string;

  /** The specific model used (e.g. 'gpt-4') */
  model: string;

  /** Unix timestamp of the event */
  timestamp: number;

  /** Duration of the call in milliseconds */
  latencyMs: number;

  /** Token usage and cost details */
  usage: LLMUsage;

  /** Additional metadata. Anything else you want to tag. */
  metadata?: Record<string, unknown>;

  /** The input prompt (optional) */
  input?: unknown;

  /** The model output (optional) */
  output?: unknown;
}
