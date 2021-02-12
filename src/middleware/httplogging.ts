import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { AppLogger } from 'src/logs/logger.service';
import os from 'os';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new AppLogger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${statusCode} ${originalUrl} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
