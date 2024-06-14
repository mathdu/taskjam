import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, JwtPayload, Strategy } from 'passport-jwt';

import { UserService } from 'src/user/user.service';


// TODO: replace w/ .env WEBTOKEN_SECRET_KEY
export const WEBTOKEN_SECRET_KEY = 'uAsBw6WxqD';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO: configService.get('WEBTOKEN_SECRET_KEY'),
      secretOrKey: WEBTOKEN_SECRET_KEY,
    });
  }

  async validate({ iat, exp, _id }: JwtPayload, done): Promise<boolean> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.get(_id);
    if (!user) {
      throw new UnauthorizedException();
    }

    done(null, user);
    return true;
  }
}
