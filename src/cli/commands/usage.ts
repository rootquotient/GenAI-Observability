import chalk from 'chalk';
import Table from 'cli-table3';
import { SQLiteStorage } from '../../storage/SQLiteStorage';

interface UsageOptions {
  db: string;
  provider?: string;
  model?: string;
}

export async function usage(options: UsageOptions) {
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
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
      cost: number;
    }
  > = {};

  let totalCost = 0;
  let totalPromptTokens = 0;
  let totalCompletionTokens = 0;

  for (const event of events) {
    const key = `${event.provider} - ${event.model}`;
    if (!summary[key]) {
      summary[key] = {
        count: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
      };
    }

    summary[key].count += 1;
    summary[key].promptTokens += event.usage.promptTokens;
    summary[key].completionTokens += event.usage.completionTokens;
    summary[key].totalTokens += event.usage.totalTokens;
    summary[key].cost += event.usage.cost || 0;

    totalCost += event.usage.cost || 0;
    totalPromptTokens += event.usage.promptTokens;
    totalCompletionTokens += event.usage.completionTokens;
  }

  const table = new Table({
    head: [
      chalk.cyan('Provider - Model'),
      chalk.cyan('Requests'),
      chalk.cyan('Prompt Tokens'),
      chalk.cyan('Completion Tokens'),
      chalk.cyan('Total Tokens'),
      chalk.cyan('Estimated Cost ($)'),
    ],
  });

  for (const [key, data] of Object.entries(summary)) {
    table.push([
      key,
      data.count,
      data.promptTokens,
      data.completionTokens,
      data.totalTokens,
      data.cost.toFixed(6),
    ]);
  }

  console.log(chalk.bold('\n--- Usage and Cost Summary ---\n'));
  console.log(table.toString());
  console.log(`\n${chalk.bold('Total Requests:')} ${events.length}`);
  console.log(
    `${chalk.bold('Total Tokens:')} ${totalPromptTokens + totalCompletionTokens} (P: ${totalPromptTokens}, C: ${totalCompletionTokens})`,
  );
  console.log(`${chalk.bold('Total Estimated Cost:')} $${totalCost.toFixed(6)}\n`);
}
