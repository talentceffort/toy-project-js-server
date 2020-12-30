import { Injectable } from '@nestjs/common';
import { User } from './entity/users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUser(): User[] {
    return this.users;
  }

  getUserById(userId: string): User {
    return this.users.find((user) => user.id === parseInt(userId, 10));
  }

  deleteByUserId(userId: string): boolean {
    this.users = this.users.filter((user) => user.id !== parseInt(userId, 10));
    return true;
  }

  createUser(userInfo) {
    const newUser = {
      id: this.users.length + 1,
      ...userInfo,
    };
    this.users = [...this.users, newUser];
    return '새로운 유저 생성!';
  }
}
