import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Delete(':id')
  deleteByUserId(@Param('id') userId: string) {
    return this.usersService.deleteByUserId(userId);
  }

  @Post()
  createUser(@Body() userInfo) {
    console.log('userInfo :', userInfo);
    // JSON 형태로 return 해줌. 편하다!
    return this.usersService.createUser(userInfo);
  }
}
