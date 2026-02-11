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

  constructor(options: GenAIObservabilityOptions = {}) {
    this.options = {
      storage: 'sqlite',
      sqliteFilePath: './genai-observability.db', // Default path for SQLite database
      ...options,
    };
    this.logger = new Logger('GenAIObservability', this.options.debug);

    this.logger.debug('GenAIObservability initialized. We are live!!', this.options);
    this.initializeStorage();
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
   * Access the cost monitoring module
   * Because cloud bills are scary
   */
  public get cost() {
    return {
      track: (event: LLMEvent) => {
        return this.trackEvent(event);
      },
    };
  }

  /**
   * Access the drift detection module
   * Keeping your model from going off the rails
   */
  public get drift() {
    return {
      detect: () => {
        this.logger.debug('Drift detection requested (implementation pending)');
      },
    };
  }
}
