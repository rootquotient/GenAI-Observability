import type { LLMEvent } from '@/core/types';

/**
 * Interface for storage adapters
 * This is where we keep the data safe and sound.
 */
export interface StorageInterface {
  /**
   * Initialize the connection. Open the gates.
   */
  connect(): Promise<void>;

  /**
   * Close the connection. Shut it down.
   */
  disconnect(): Promise<void>;

  /**
   * Persist a single LLM event. Save it for posterity.
   */
  saveEvent(event: LLMEvent): Promise<void>;

  /**
   * Retrieve events. Get your data back.
   */
  getEvents(filter?: Record<string, unknown>): Promise<LLMEvent[]>;
}
