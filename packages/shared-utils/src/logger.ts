type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function write(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const payload = meta ? ` ${JSON.stringify(meta)}` : '';
  const line = `[${level.toUpperCase()}] ${message}${payload}`;

  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  if (level === 'debug') {
    console.debug(line);
    return;
  }

  console.log(line);
}

export const logger = {
  info(message: string, meta?: Record<string, unknown>) {
    write('info', message, meta);
  },
  warn(message: string, meta?: Record<string, unknown>) {
    write('warn', message, meta);
  },
  error(message: string, meta?: Record<string, unknown>) {
    write('error', message, meta);
  },
  debug(message: string, meta?: Record<string, unknown>) {
    write('debug', message, meta);
  }
};
