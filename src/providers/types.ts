import type { LLMEvent, LLMUsage } from '@/core/types';

/**
 * Configuration options for a GenAI provider
 */
export interface ProviderOptions {
  /**
   * API key for the provider
   */
  apiKey: string;

  /**
   * Base URL for the API (optional, for custom endpoints)
   */
  baseURL?: string;

  /**
   * Default model to use if not specified in individual calls
   */
  defaultModel?: string;

  /**
   * Additional provider-specific options
   */
  [key: string]: unknown;
}

/**
 * Common request interface for all LLM providers
 */
export interface LLMRequest {
  /**
   * The prompt or input text
   */
  prompt: string;

  /**
   * Model to use for this request
   */
  model?: string;

  /**
   * Maximum tokens to generate
   */
  maxTokens?: number;

  /**
   * Temperature for sampling
   */
  temperature?: number;

  /**
   * Additional provider-specific parameters
   */
  [key: string]: unknown;
}

/**
 * Standardized response from any LLM provider
 */
export interface LLMResponse {
  /**
   * The generated text/completion
   */
  text: string;

  /**
   * The model that generated this response
   */
  model: string;

  /**
   * Usage information (tokens, cost)
   */
  usage: LLMUsage;

  /**
   * Raw response from the provider SDK
   */
  rawResponse: unknown;
}

/**
 * The main provider interface that all GenAI providers must implement
 */
export interface GenAIProvider {
  /**
   * Provider name ('openai', 'anthropic', 'gemini')
   */
  readonly name: string;

  /**
   * Initialize the provider with configuration
   */
  initialize(options: ProviderOptions): Promise<void>;

  /**
   * Make a completion request to the provider
   */
  complete(request: LLMRequest): Promise<LLMResponse>;

  /**
   * Create a chat completion (for conversational models)
   */
  chatComplete?(request: LLMRequest): Promise<LLMResponse>;

  /**
   * Generate embeddings from input text
   */
  embed?(request: LLMRequest): Promise<LLMResponse>;

  /**
   * Extract usage metrics from a raw provider response
   */
  extractUsage(rawResponse: unknown): LLMUsage;

  /**
   * Create an LLMEvent from a completed request
   */
  createEvent(request: LLMRequest, response: LLMResponse, latencyMs: number): LLMEvent;
}

export { ProviderError } from '@/core/errors';
