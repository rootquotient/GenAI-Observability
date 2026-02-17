import { OpenAI } from 'openai';
import { ProviderError } from '@/core/errors';
import type { LLMEvent, LLMUsage } from '@/core/types';
import { Logger } from '@/utils/Logger';
import type { GenAIProvider, LLMRequest, LLMResponse, ProviderOptions } from './types';

/**
 * OpenAI-specific provider implementation
 */
export class OpenAIProvider implements GenAIProvider {
  public readonly name = 'openai';

  private client: OpenAI | null = null;
  private options: ProviderOptions | null = null;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('OpenAIProvider');
  }

  /**
   * Initialize the OpenAI client with API key and options
   */
  async initialize(options: ProviderOptions): Promise<void> {
    this.options = options;

    try {
      this.client = new OpenAI({
        ...this.options,
      });

      this.logger.info('OpenAI provider initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize OpenAI provider', error as Error);
      throw new ProviderError('Failed to initialize OpenAI provider', this.name, undefined, error);
    }
  }

  /**
   * Make a completion request using OpenAI's completion API
   */
  async complete(request: LLMRequest): Promise<LLMResponse> {
    if (!this.client) {
      throw new ProviderError(
        'OpenAI provider not initialized. Call initialize() first.',
        this.name,
        'NOT_INITIALIZED',
      );
    }

    try {
      const completion = await this.client.completions.create({
        model: request.model || this.options?.defaultModel || 'gpt-3.5-turbo-instruct',
        prompt: request.prompt,
        max_tokens: request.maxTokens,
        temperature: request.temperature,
      });

      const usage = this.extractUsage(completion);

      return {
        text: completion.choices[0]?.text || '',
        model: completion.model,
        usage,
        rawResponse: completion,
      };
    } catch (error) {
      this.logger.error('OpenAI completion request failed', error as Error);
      throw new ProviderError('OpenAI completion request failed', this.name, undefined, error);
    }
  }

  /**
   * Make a chat completion request using OpenAI's chat API
   */
  async chatComplete(request: LLMRequest): Promise<LLMResponse> {
    if (!this.client) {
      throw new ProviderError(
        'OpenAI provider not initialized. Call initialize() first.',
        this.name,
        'NOT_INITIALIZED',
      );
    }

    try {
      const chatCompletion = await this.client.chat.completions.create({
        model: request.model || this.options?.defaultModel || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: request.prompt }],
        max_tokens: request.maxTokens,
        temperature: request.temperature,
      });

      const usage = this.extractUsage(chatCompletion);
      const content = chatCompletion.choices[0]?.message?.content || '';

      return {
        text: content,
        model: chatCompletion.model,
        usage,
        rawResponse: chatCompletion,
      };
    } catch (error) {
      this.logger.error('OpenAI chat completion request failed', error as Error);
      throw new ProviderError('OpenAI chat completion request failed', this.name, undefined, error);
    }
  }

  /**
   * Extract usage metrics from OpenAI API response
   */
  extractUsage(rawResponse: unknown): LLMUsage {
    // biome-ignore lint/suspicious/noExplicitAny: OpenAI's response structure is complex, so we use 'any' here for simplicity
    const response = rawResponse as any;

    if (response.usage) {
      return {
        promptTokens: response.usage.prompt_tokens || 0,
        completionTokens: response.usage.completion_tokens || 0,
        totalTokens: response.usage.total_tokens || 0,
      };
    }

    // Fallback if usage data is not available
    return {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    };
  }

  /**
   * Create an LLMEvent from a completed request
   */
  createEvent(request: LLMRequest, response: LLMResponse, latencyMs: number): LLMEvent {
    return {
      id: this.generateEventId(),
      provider: this.name,
      model: response.model,
      timestamp: Date.now(),
      latencyMs,
      usage: response.usage,
      metadata: {
        requestType: 'completion',
        temperature: request.temperature,
        maxTokens: request.maxTokens,
      },
      input: request.prompt,
      output: response.text,
    };
  }

  /**
   * Generate a unique event ID
   */
  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate embeddings - TODO: not implemented yet for OpenAI
   */
  async embed(_request: LLMRequest): Promise<LLMResponse> {
    throw new ProviderError(
      'Embeddings not implemented for OpenAI provider yet',
      this.name,
      'NOT_IMPLEMENTED',
    );
  }
}
