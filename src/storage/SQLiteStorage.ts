import Database from 'better-sqlite3';
import { StorageError } from '@/core/errors';
import type { LLMEvent } from '@/core/types';
import { Logger } from '@/utils/Logger';
import type { StorageInterface } from './types';

/**
 * SQLite storage adapter using better-sqlite3
 */
export class SQLiteStorage implements StorageInterface {
  private db: Database.Database | null = null;
  private readonly filePath: string;
  private readonly logger: Logger;

  constructor(filePath = './genai-observability.db', debug = false) {
    this.filePath = filePath;
    this.logger = new Logger('SQLiteStorage', debug);
  }

  /**
   * Connect to the database and ensure the schema exists
   */
  async connect(): Promise<void> {
    if (this.db) {
      return;
    }

    try {
      this.db = new Database(this.filePath);
      this.db.pragma('journal_mode = WAL'); // Performance boost!
      this.createSchema();
      this.logger.info(`Connected to SQLite database at ${this.filePath}`);
    } catch (error) {
      throw new StorageError(
        `Failed to connect to SQLite database: ${(error as Error).message}`,
        error,
      );
    }
  }

  /**
   * Close the database connection.
   */
  async disconnect(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.logger.info('Disconnected from SQLite database');
    }
  }

  /**
   * Save an LLM event to the database.
   */
  async saveEvent(event: LLMEvent): Promise<void> {
    if (!this.db) {
      throw new StorageError('Database not connected. Did you forget to call connect()?');
    }

    try {
      const stmt = this.db.prepare(`
        INSERT INTO events (
          id, provider, model, timestamp, latency_ms,
          prompt_tokens, completion_tokens, total_tokens, cost,
          metadata, input, output
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        event.id,
        event.provider,
        event.model,
        event.timestamp,
        event.latencyMs,
        event.usage.promptTokens,
        event.usage.completionTokens,
        event.usage.totalTokens,
        event.usage.cost ?? null,
        JSON.stringify(event.metadata ?? {}),
        JSON.stringify(event.input ?? null),
        JSON.stringify(event.output ?? null),
      );
    } catch (error) {
      this.logger.error('Failed to save event', error as Error);
      throw new StorageError(`Failed to save event to SQLite: ${(error as Error).message}`, error);
    }
  }

  /**
   * Retrieve events from the database.
   */
  async getEvents(filter?: Record<string, unknown>): Promise<LLMEvent[]> {
    if (!this.db) {
      throw new StorageError('Database not connected');
    }

    try {
      let query = 'SELECT * FROM events';
      const params: unknown[] = [];

      if (filter && Object.keys(filter).length > 0) {
        const conditions = Object.entries(filter).map(([key, value]) => {
          params.push(value);
          return `${key} = ?`;
        });
        query += ` WHERE ${conditions.join(' AND ')}`;
      }

      query += ' ORDER BY timestamp DESC';

      const rows = this.db.prepare(query).all(...params) as {
        id: string;
        provider: string;
        model: string;
        timestamp: number;
        latency_ms: number;
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
        cost: number | null;
        metadata: string;
        input: string;
        output: string;
      }[];

      return rows.map((row) => ({
        id: row.id,
        provider: row.provider,
        model: row.model,
        timestamp: row.timestamp,
        latencyMs: row.latency_ms,
        usage: {
          promptTokens: row.prompt_tokens,
          completionTokens: row.completion_tokens,
          totalTokens: row.total_tokens,
          cost: row.cost ?? undefined,
        },
        metadata: JSON.parse(row.metadata),
        input: JSON.parse(row.input),
        output: JSON.parse(row.output),
      }));
    } catch (error) {
      this.logger.error('Failed to retrieve events', error as Error);
      throw new StorageError(
        `Failed to retrieve events from SQLite: ${(error as Error).message}`,
        error,
      );
    }
  }

  /**
   * Initialize the database schema if it doesn't exist.
   */
  private createSchema(): void {
    if (!this.db) {
      return;
    }

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        model TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        latency_ms INTEGER NOT NULL,
        prompt_tokens INTEGER NOT NULL,
        completion_tokens INTEGER NOT NULL,
        total_tokens INTEGER NOT NULL,
        cost REAL,
        metadata TEXT,
        input TEXT,
        output TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
      CREATE INDEX IF NOT EXISTS idx_events_provider ON events(provider);
      CREATE INDEX IF NOT EXISTS idx_events_model ON events(model);
    `);
  }
}
