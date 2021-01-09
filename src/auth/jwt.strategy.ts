import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('PRIVATE_KEY'),
    });
  }

  // For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
  // It then invokes our validate() method passing the decoded JSON as its single parameter

  async validate({ userId }: { userId: number }) {
    // business logic into the process.
    // For example, we could do a database lookup in our validate() method to extract more information about the user,
    // resulting in a more enriched user object being available in our Request
    return { userId };
  }
}
