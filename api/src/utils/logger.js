/* Tiny console logger. Swap for pino/winston later if needed. */

const fmt = (level, args) => {
  const ts = new Date().toISOString();
  return [`[${ts}]`, `[${level}]`, ...args];
};

class Logger {
  info(...args) { console.log(...fmt('INFO', args)); }
  warn(...args) { console.warn(...fmt('WARN', args)); }
  error(...args) { console.error(...fmt('ERROR', args)); }
  debug(...args) {
    if (process.env.NODE_ENV !== 'production') console.log(...fmt('DEBUG', args));
  }
}

export const logger = new Logger();
