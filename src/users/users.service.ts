import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUser(): User[] {
    return this.users;
  }

  getUserById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  deleteByUserId(userId: number): boolean {
    this.users = this.users.filter((user) => user.id !== userId);
    return true;
  }

  createUser(userInfo: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...userInfo,
    };
    this.users = [...this.users, newUser];
    return '새로운 유저 생성!';
  }
}
