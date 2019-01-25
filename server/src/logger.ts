import path from 'path';
import winston from 'winston';

const { format } = winston;

const maxLevel = process.env.NODE_ENV == 'production' ? 'info' : 'debug';

function logFormat() {
  const formatMessage = info => `${info.level}: ${info.message}`;
  const formatError = info => info.stack;
  return format.printf(info =>
    info instanceof Error ? formatError(info) : formatMessage(info),
  );
}

export const logger = winston.createLogger({
  level: maxLevel,
  exitOnError: false,
  transports: [new winston.transports.Console({ stderrLevels: ['error'] })],
  format: logFormat(),
});
