import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  googleLoginInput,
  LoginInput,
  LoginOutput,
} from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { SignUpType } from 'src/users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    login_id,
    password,
  }: LoginInput): Promise<LoginOutput | null> {
    console.log(login_id, password);
    const user = await this.usersService.getUserBydUserId(login_id);
    console.log('validateUser!!!!');
    console.log(user);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async localLogin(user: LoginOutput) {
    console.log('lcaoLogin', user);
    return {
      access_token: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  async findUserFromGoogle(googleUser: googleLoginInput) {
    const { login_id } = googleUser;
    const existUser = await this.usersService.getUserBydUserId(login_id);

    if (existUser) {
      return {
        access_token: this.jwtService.sign({ id: existUser.id }),
        user: existUser,
      };
    }
    await this.usersService.createUser({
      signup_type: SignUpType['Google'],
      ...googleUser,
    });
    const newUser = await this.usersService.getUserBydUserId(login_id);
    return {
      access_token: this.jwtService.sign({ id: newUser.id }),
      user: newUser,
    };
  }
}
