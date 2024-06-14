import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, WEBTOKEN_SECRET_KEY } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          // TODO: configService.get('WEBTOKEN_SECRET_KEY'),
          secret: WEBTOKEN_SECRET_KEY,
          //TODO: ...(configService.get('WEBTOKEN_EXPIRATION_TIME') ? ...
          signOptions: { expiresIn: 2400 },
        };
      },
      //TODO: inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
