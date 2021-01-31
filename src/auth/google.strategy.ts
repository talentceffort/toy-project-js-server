import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { googleLoginInput } from 'src/users/dto/user.dto';
import { StrategyOptionsWithRequest, VerifyCallback } from 'passport-oauth2';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super(<StrategyOptionsWithRequest>{
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:8080/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
      // proxy: true,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;

    const googleUser: googleLoginInput = {
      login_id: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
    };

    const user = this.authService.findUserFromGoogle(googleUser);

    if (user === undefined) {
      done(new UnauthorizedException());
    }

    return done(null, user);
    // return user;
  }
}
