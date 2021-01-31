import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id') userId: number) {
    // console.log(typeof userId);
    return this.usersService.getUserById(userId);
  }

  @Post()
  createUser(@Body() userInfo: CreateUserDto) {
    return this.usersService.createUser(userInfo);
  }
}
