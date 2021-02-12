import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';

@Module({
  exports: [AppLogger],
  providers: [AppLogger],
})
export class LogsModule {}
