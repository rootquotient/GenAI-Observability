import type { LLMEvent } from '@/core/types';

/**
 * Interface for AI Provider adapters.
 * Translates specific provider jargon into our standard types.
 */
export interface ProviderAdapter {
  /**
   * The name of the provider (e.g. 'openai')
   */
  providerName: string;

  /**
   * Transform a raw provider response into a standardized LLMEvent
   * Make it make sense.
   * @param raw - The raw response object from the provider SDK
   * @param metadata - Additional context for the transformation
   */
  transform(raw: unknown, metadata?: Record<string, unknown>): LLMEvent;
}
