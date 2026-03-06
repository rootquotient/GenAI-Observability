import chalk from 'chalk';
import Table from 'cli-table3';
import { SQLiteStorage } from '../../storage/SQLiteStorage';

interface LatencyOptions {
  db: string;
  provider?: string;
  model?: string;
}

export async function latency(options: LatencyOptions) {
  const storage = new SQLiteStorage(options.db);
  await storage.connect();

  const filter: Record<string, unknown> = {};
  if (options.provider) {
    filter.provider = options.provider;
  }
  if (options.model) {
    filter.model = options.model;
  }

  const events = await storage.getEvents(filter);
  await storage.disconnect();

  if (events.length === 0) {
    console.log(chalk.yellow('No events found in storage.'));
    return;
  }

  const summary: Record<
    string,
    {
      count: number;
      minLatency: number;
      maxLatency: number;
      avgLatency: number;
      totalLatency: number;
    }
  > = {};

  for (const event of events) {
    const key = `${event.provider} - ${event.model}`;
    if (!summary[key]) {
      summary[key] = {
        count: 0,
        minLatency: Infinity,
        maxLatency: -Infinity,
        avgLatency: 0,
        totalLatency: 0,
      };
    }

    summary[key].count += 1;
    summary[key].minLatency = Math.min(summary[key].minLatency, event.latencyMs);
    summary[key].maxLatency = Math.max(summary[key].maxLatency, event.latencyMs);
    summary[key].totalLatency += event.latencyMs;
    summary[key].avgLatency = summary[key].totalLatency / summary[key].count;
  }

  const table = new Table({
    head: [
      chalk.cyan('Provider - Model'),
      chalk.cyan('Requests'),
      chalk.cyan('Min Latency (ms)'),
      chalk.cyan('Max Latency (ms)'),
      chalk.cyan('Avg Latency (ms)'),
    ],
  });

  for (const [key, data] of Object.entries(summary)) {
    table.push([
      key,
      data.count,
      data.minLatency.toFixed(2),
      data.maxLatency.toFixed(2),
      data.avgLatency.toFixed(2),
    ]);
  }

  console.log(chalk.bold('\n--- Latency Statistics ---\n'));
  console.log(table.toString());
  console.log(`\n${chalk.bold('Total Requests analyzed:')} ${events.length}\n`);
}
