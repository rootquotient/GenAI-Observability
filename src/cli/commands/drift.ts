import chalk from 'chalk';
import Table from 'cli-table3';
import { SQLiteStorage } from '../../storage/SQLiteStorage';

interface DriftOptions {
  db: string;
}

export async function drift(options: DriftOptions) {
  const storage = new SQLiteStorage(options.db);
  await storage.connect();

  const events = await storage.getEvents();
  await storage.disconnect();

  if (events.length === 0) {
    console.log(chalk.yellow('No events found in storage.'));
    return;
  }

  const promptGroups: Record<
    string,
    {
      count: number;
      models: Set<string>;
      latencyAvg: number;
      totalLatency: number;
      costAvg: number;
      totalCost: number;
    }
  > = {};

  for (const event of events) {
    if (!event.promptHash) {
      continue;
    }

    const key = event.promptHash.substring(0, 8); // Short hash for display
    if (!promptGroups[key]) {
      promptGroups[key] = {
        count: 0,
        models: new Set(),
        latencyAvg: 0,
        totalLatency: 0,
        costAvg: 0,
        totalCost: 0,
      };
    }

    promptGroups[key].count += 1;
    promptGroups[key].models.add(event.model);
    promptGroups[key].totalLatency += event.latencyMs;
    promptGroups[key].latencyAvg = promptGroups[key].totalLatency / promptGroups[key].count;
    promptGroups[key].totalCost += event.usage.cost || 0;
    promptGroups[key].costAvg = promptGroups[key].totalCost / promptGroups[key].count;
  }

  const table = new Table({
    head: [
      chalk.cyan('Prompt Hash'),
      chalk.cyan('Frequency'),
      chalk.cyan('Models Used'),
      chalk.cyan('Avg Latency (ms)'),
      chalk.cyan('Avg Cost ($)'),
    ],
  });

  // Sort by frequency
  const sortedPrompts = Object.entries(promptGroups)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 10); // Top 10 prompts

  for (const [key, data] of sortedPrompts) {
    table.push([
      key,
      data.count,
      Array.from(data.models).join(', '),
      data.latencyAvg.toFixed(2),
      data.costAvg.toFixed(6),
    ]);
  }

  console.log(chalk.bold('\n--- Top 10 Prompts by Frequency ---\n'));
  console.log(table.toString());
  console.log(
    `\n${chalk.bold('Total unique prompts tracked:')} ${Object.keys(promptGroups).length}\n`,
  );
}
