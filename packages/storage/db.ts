import { Pool } from 'pg';
import 'dotenv/config';

export const db = new Pool({
   host: process.env.POSTGRES_HOST || 'localhost',
   port: parseInt(process.env.POSTGRES_PORT || '5432'),
   user: process.env.POSTGRES_USER || 'postgres',
   password: process.env.POSTGRES_PASSWORD || 'postgres',
   database: process.env.POSTGRES_DB || 'genai_monitor',
});

export async function initDB() {
   const schema = `
   CREATE TABLE IF NOT EXISTS genai_calls (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       provider VARCHAR(50) NOT NULL,
       model VARCHAR(100) NOT NULL,
       prompt_hash CHAR(64) NOT NULL,
       input_tokens INTEGER,
       output_tokens INTEGER,
       latency_ms INTEGER NOT NULL,
       cost_usd DECIMAL(10, 7),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX IF NOT EXISTS idx_genai_calls_created_at ON genai_calls(created_at);
   CREATE INDEX IF NOT EXISTS idx_genai_calls_prompt_hash ON genai_calls(prompt_hash);
   `;
   await db.query(schema);
   console.log('Database initialized successfully');
}

export async function saveGenAICall(data: {
   provider: string;
   model: string;
   promptHash: string;
   inputTokens?: number;
   outputTokens?: number;
   latencyMs: number;
   costUsd?: number;
}) {
   const query = `
      INSERT INTO genai_calls (provider, model, prompt_hash, input_tokens, output_tokens, latency_ms, cost_usd)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
   `;
   const values = [data.provider, data.model, data.promptHash, data.inputTokens ?? 0, data.outputTokens ?? 0, data.latencyMs, data.costUsd ?? 0];

   const result = await db.query(query, values);
   return result.rows[0].id;
}

