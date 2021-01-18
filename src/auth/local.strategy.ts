import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginOutput } from 'src/users/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login_id', // 다른 필드로 올 경우 cusmtom 해줘야함. 이거 안해줘서 몇시간 버린거야.
    });
  }

  async validate(login_id: string, password: string): Promise<LoginOutput> {
    const user = await this.authService.validateUser({ login_id, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
