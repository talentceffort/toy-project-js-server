import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      exitOnError: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((msg) => {
          return `[${msg.timestamp}][${msg.level}] - ${msg.message}`;
        }),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string) {
    this.logger.log({ level: 'info', message });
  }
  error(message: string) {
    this.logger.log({ level: 'error', message: 'Logger log - ' + message });
  }
  warn(message: string) {
    this.logger.log({ level: 'warn', message: 'Logger log - ' + message });
  }
  debug(message: string) {
    this.logger.log({ level: 'debug', message: 'Logger log - ' + message });
  }
  verbose(message: string) {
    this.logger.log({ level: 'verbose', message: 'Logger log - ' + message });
  }
}
