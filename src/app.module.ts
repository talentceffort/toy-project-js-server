import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [UsersController], // router 같은 존재
  providers: [UsersService],
})
export class AppModule {}
