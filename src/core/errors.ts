/**
 * Base error class for GenAI Observability SDK
 */
export class GenAIObservabilityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GenAIObservabilityError';

    // Ensure prototype chain is correct for instanceof checks
    Object.setPrototypeOf(this, GenAIObservabilityError.prototype);
  }
}

/**
 * Error thrown when storage initialization fails
 */
export class StorageError extends GenAIObservabilityError {
  constructor(
    message: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'StorageError';

    Object.setPrototypeOf(this, StorageError.prototype);
  }
}

/**
 * Error thrown when configuration is invalid
 */
export class ConfigurationError extends GenAIObservabilityError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';

    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}

export class ProviderError extends GenAIObservabilityError {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly code?: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'ProviderError';

    Object.setPrototypeOf(this, ProviderError.prototype);
  }
}
