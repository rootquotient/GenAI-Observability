import { GenAIObservability } from '@/core/GenAIObservability';
import type { GenAIObservabilityOptions } from '@/core/types';

export * from '@/core/errors';
export { GenAIObservability } from '@/core/GenAIObservability';
export type { GenAIObservabilityOptions } from '@/core/types';
export { OpenAIProvider } from '@/providers/OpenAIProvider';
export type { GenAIProvider, LLMRequest, LLMResponse, ProviderOptions } from '@/providers/types';

/**
 * Wraps a GenAI provider adapter to enable observability
 *
 * @example
 * const sdk = new GenAIObservability({ debug: true });
 * const provider = sdk.monitorProvider(new OpenAIProvider());
 *
 * await provider.initialize({ apiKey: process.env.OPENAI_API_KEY! });
 * const res = await provider.chatComplete?.({ prompt: 'hello' });
 */
export function createMonitor<T extends import('@/providers/types').GenAIProvider>(
  provider: T,
  options?: GenAIObservabilityOptions,
): T {
  const sdk = new GenAIObservability(options);
  return sdk.monitorProvider(provider);
}
