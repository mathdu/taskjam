import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';

import { LoginPayload } from './auth.payload';

export interface ITokenReturnBody {
  expires: string;
  expiresPrettyPrint: string;
  token: string;
}

@Injectable()
export class AuthService {
  private readonly expiration: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    // TODO: this.configService.get('WEBTOKEN_EXPIRATION_TIME');
    this.expiration = '36000';
  }

  async createToken({
    _id,
    email,
  }: IUser): Promise<ITokenReturnBody> {
    return {
      expires: this.expiration,
      expiresPrettyPrint: AuthService.prettyPrintSeconds(this.expiration),
      token: this.jwtService.sign({ _id, email }),
    };
  }

  private static prettyPrintSeconds(time: string): string {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} ${
      minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''
    } ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
  }

  async validateUser(payload: LoginPayload): Promise<IUser> {
    const user = await this.userService.getByEmailAndPass(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Could not authenticate. Please try again.',
      );
    }
    return user;
  }
}
