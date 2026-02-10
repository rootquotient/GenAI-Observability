import { Logger } from '@/utils/Logger';
import type { GenAIObservabilityOptions } from './types';

/**
 * The core class for the GenAI Observability SDK
 * Manages configuration and logging
 */
export class GenAIObservability {
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: Reserved for future greatness
  private options: GenAIObservabilityOptions;
  private logger: Logger;

  constructor(options: GenAIObservabilityOptions = {}) {
    this.options = options;
    this.logger = new Logger(options.debug);

    this.logger.debug('GenAIObservability initialized. We are live.', options);
  }

  /**
   * Access the cost monitoring module
   * Because cloud bills are scary
   */
  public get cost() {
    return {
      track: () => {
        this.logger.debug('Cost tracking requested (implementation pending)');
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
