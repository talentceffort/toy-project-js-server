import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: process.env.NODE_ENV === 'dev' && '.env.dev',
    }),
    AuthModule,
  ],
  controllers: [UsersController, AppController], // router 같은 존재
  providers: [UsersService],
})
export class AppModule {}
