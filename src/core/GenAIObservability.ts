import { createHash } from 'node:crypto';
import { estimateCost } from '@/cost';
import type { GenAIProvider, LLMRequest, LLMResponse } from '@/providers/types';
import { SQLiteStorage } from '@/storage/SQLiteStorage';
import type { StorageInterface } from '@/storage/types';
import { Logger } from '@/utils/Logger';
import type { GenAIObservabilityOptions, LLMEvent } from './types';

/**
 * The core class for the GenAI Observability SDK
 * Manages configuration and logging
 */
export class GenAIObservability {
  private options: GenAIObservabilityOptions;
  private logger: Logger;
  private storage: StorageInterface | null = null;
  private readonly storageInitPromise: Promise<void>;

  constructor(options: GenAIObservabilityOptions = {}) {
    this.options = {
      storage: 'sqlite',
      sqliteFilePath: './genai-observability.db', // Default path for SQLite database
      ...options,
    };
    this.logger = new Logger('GenAIObservability', this.options.debug);

    this.logger.debug('GenAIObservability initialized. We are live!!', this.options);
    this.storageInitPromise = this.initializeStorage();
  }

  /**
   * Hash the prompt to create a unique identifier without storing the raw text
   */

  private hashPrompt(prompt: string): string {
    return createHash('sha256').update(prompt).digest('hex');
  }

  /**
   * Initialize the configured storage provider.
   */
  private async initializeStorage() {
    try {
      if (this.options.storage === 'sqlite') {
        this.storage = new SQLiteStorage(this.options.sqliteFilePath, this.options.debug);
        await this.storage.connect();
      }
    } catch (error) {
      this.logger.error('Failed to initialize storage', error as Error);
    }
  }

  /**
   * Track an LLM event. Save it for later analysis
   */
  public async trackEvent(event: LLMEvent): Promise<void> {
    await this.storageInitPromise;
    if (!this.storage) {
      this.logger.warn('Storage not initialized. Event not tracked.');
      return;
    }

    try {
      await this.storage.saveEvent(event);
      this.logger.debug(`Event tracked: ${event.id} (${event.provider}/${event.model})`);
    } catch (error) {
      this.logger.error(`Failed to track event ${event.id}`, error as Error);
    }
  }

  /**
   * Wrap a GenAIProvider to automatically capture latency and persist LLM events
   */
  public monitorProvider<T extends GenAIProvider>(provider: T): T {
    return new Proxy(provider, {
      get: (target, prop, receiver) => {
        const value = Reflect.get(target, prop, receiver) as unknown;

        // TODO: This is a bit hacky - we should have a more robust way to identify which methods to wrap
        if (prop === 'complete' || prop === 'chatComplete' || prop === 'embed') {
          if (typeof value !== 'function') {
            return value;
          }

          return async (request: LLMRequest): Promise<LLMResponse> => {
            const startTime = Date.now();
            const baseResponse = await (value as (req: LLMRequest) => Promise<LLMResponse>).call(
              target,
              request,
            );
            const latencyMs = Date.now() - startTime;
            const costEstimation = estimateCost({
              provider: target.name,
              model: baseResponse.model,
              promptTokens: baseResponse.usage.promptTokens,
              completionTokens: baseResponse.usage.completionTokens,
            });

            const response = costEstimation
              ? {
                  ...baseResponse,
                  usage: { ...baseResponse.usage, cost: costEstimation.costUsd },
                }
              : baseResponse;

            const event = target.createEvent(request, response, latencyMs);
            event.promptHash = this.hashPrompt(request.prompt);
            event.metadata = {
              ...(event.metadata ?? {}),
              requestType: prop,
              pricingId: costEstimation?.pricingId,
            };
            void this.trackEvent(event);
            return response;
          };
        }

        return value;
      },
    }) as T;
  }
}
