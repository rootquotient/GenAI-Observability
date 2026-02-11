/**
 * Simple logger wrapper to handle debug modes
 * Because raw console.log is too mainstream
 */
export class Logger {
  private isDebug: boolean;
  private prefix: string;

  constructor(prefix: string, debug = false) {
    this.prefix = prefix;
    this.isDebug = debug;
  }

  /**
   * Log informational messages
   */
  info(message: string, ...args: unknown[]) {
    // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
    console.log(`[GenAI-Obs][${this.prefix}] ℹ️ ${message}`, ...args);
  }

  /**
   * Log error messages
   */
  error(message: string, ...args: unknown[]) {
    // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
    console.error(`[GenAI-Obs][${this.prefix}] ❌ ${message}`, ...args);
  }

  /**
   * Log warning messages
   */
  warn(message: string, ...args: unknown[]) {
    // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
    console.warn(`[GenAI-Obs][${this.prefix}] ⚠️ ${message}`, ...args);
  }

  /**
   * Log debug messages. Only visible if you asked for them
   */
  debug(message: string, ...args: unknown[]) {
    if (this.isDebug) {
      // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
      console.debug(`[GenAI-Obs][${this.prefix}] 🐛 ${message}`, ...args);
    }
  }
}
