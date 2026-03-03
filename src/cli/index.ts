#!/usr/bin/env node
import { Command } from 'commander';
import { drift } from './commands/drift';
import { latency } from './commands/latency';
import { usage } from './commands/usage';

const program = new Command();

program
  .name('genai-obs')
  .description('CLI for GenAI usage analysis and reporting')
  .version('0.0.1');

program
  .command('usage')
  .description('Display usage and cost summaries')
  .option('-d, --db <path>', 'Path to SQLite database', './genai-observability.db')
  .option('-p, --provider <name>', 'Filter by provider')
  .option('-m, --model <name>', 'Filter by model')
  .action(usage);

program
  .command('latency')
  .description('Display latency statistics')
  .option('-d, --db <path>', 'Path to SQLite database', './genai-observability.db')
  .option('-p, --provider <name>', 'Filter by provider')
  .option('-m, --model <name>', 'Filter by model')
  .action(latency);

program
  .command('drift')
  .description('Display prompt drift indicators')
  .option('-d, --db <path>', 'Path to SQLite database', './genai-observability.db')
  .action(drift);

program.parse();
