/**
 * Simple logger wrapper to handle debug modes
 * Because raw console.log is too mainstream
 */
export class Logger {
  private isDebug: boolean;

  constructor(debug = false) {
    this.isDebug = debug;
  }

  /**
   * Log informational messages
   */
  info(message: string, ...args: unknown[]) {
    // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
    console.log(`[GenAI-Obs] ℹ️ ${message}`, ...args);
  }

  /**
   * Log error messages
   */
  error(message: string, ...args: unknown[]) {
    // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
    console.error(`[GenAI-Obs] ❌ ${message}`, ...args);
  }

  /**
   * Log warning messages
   */
  warn(message: string, ...args: unknown[]) {
    // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
    console.warn(`[GenAI-Obs] ⚠️ ${message}`, ...args);
  }

  /**
   * Log debug messages. Only visible if you asked for them
   */
  debug(message: string, ...args: unknown[]) {
    if (this.isDebug) {
      // biome-ignore lint/suspicious/noConsole: Logger utility intentionally uses console
      console.debug(`[GenAI-Obs] 🐛 ${message}`, ...args);
    }
  }
}
