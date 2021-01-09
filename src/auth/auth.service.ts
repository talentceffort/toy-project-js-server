import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ userId, password }: LoginInput): Promise<any> {
    const user = await this.usersService.getUserBydUserId(userId);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleUser() {}
}
