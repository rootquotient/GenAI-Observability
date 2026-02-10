export interface MonitorConfig {
  storage?: string; // TODO: sqllite db path
}

export class GenAIMonitor {
  constructor(config: MonitorConfig = {}) {
    console.log('Initializing GenAI Monitor with config:', config);
  }
}

export function createMonitor(config: MonitorConfig = {}) {
  return new GenAIMonitor(config);
}
