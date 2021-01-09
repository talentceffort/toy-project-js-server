import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId', // 다른 필드로 올 경우 cusmtom 해줘야함. 이거 안해줘서 몇시간 버린거야.
    });
  }

  async validate(userId: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ userId, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
