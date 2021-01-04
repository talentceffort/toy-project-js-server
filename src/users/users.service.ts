import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  getAllUser(): Promise<User[]> {
    return this.users.find();
  }

  getUserById(userId: number): Promise<User> {
    return this.users.findOne(userId);
  }

  // deleteByUserId(userId: number) {
  // }

  createUser(userInfo: CreateUserDto) {
    try {
      const newUserInfo = { ...userInfo, createdAt: new Date() };
      const newUser = this.users.create(newUserInfo);
      return this.users.save(newUser);
    } catch (e) {
      console.error(e);
    }
  }
}
