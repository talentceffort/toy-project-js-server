import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOAuthDto, CreateUserDto } from './dto/user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>, // private readonly config: ConfigService, // config 를 사용하기 위해 module 에 import 해주기. 근데 글로벌이라서 안해줘도 됨.
  ) {}

  getAllUser(): Promise<User[]> {
    return this.users.find();
  }

  getUserById(id: number): Promise<User> {
    return this.users.findOne(id);
  }

  getUserBydUserId(login_id: string): Promise<User> {
    return this.users
      .createQueryBuilder('user')
      .select('user.id')
      .where('user.login_id = :login_id', { login_id })
      .getOne();
  }

  async createUser(
    userInfo: CreateUserDto | CreateOAuthDto,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const { login_id } = userInfo;
      const exsist = await this.users.findOne({ login_id });

      if (exsist) {
        return { ok: false, error: '이미 존재하는 id 입니다' };
      }
      await this.users.save(this.users.create(userInfo));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'id 생성 실패' };
    }
  }
}
