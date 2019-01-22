import path from 'path';
import winston from 'winston';

const { combine, printf, timestamp } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // - Write to all logs with level `info` and below to `debug.log`
    // - Write all logs error and below to `error.log`.
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      format: combine(
        timestamp(),
        printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join('logs', 'debug.log'),
      format: combine(
        timestamp(),
        printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
    }),
  ],
});

// Also log to console if not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'verbose',
    }),
  );
}
