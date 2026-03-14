import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'debug',
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log', maxsize: 1000000, maxFiles: 5 }),
  ],
});
