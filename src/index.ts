import { GenAIObservability } from '@/core/GenAIObservability';
import type { GenAIObservabilityOptions } from '@/core/types';

export { GenAIObservability } from '@/core/GenAIObservability';
export type { GenAIObservabilityOptions } from '@/core/types';

/**
 * Wraps an AI client (OpenAI, Anthropic, etc) to enable observability.
 * It's like a fitness tracker for your LLM calls.
 *
 * @example
 * const openai = new OpenAI();
 * const monitoredOpenAI = createMonitor(openai, { debug: true });
 */
export function createMonitor<T extends object>(client: T, options?: GenAIObservabilityOptions): T {
  // Initialize the SDK in the background
  const _sdk = new GenAIObservability(options);

  // TODO: Implement Proxy logic to intercept method calls
  // For now, returns the client as-is. It's a placebo
  return client;
}
