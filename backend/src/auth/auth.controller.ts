import { Controller, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService, ITokenReturnBody } from './auth.service';
import { LoginPayload, RegisterPayload } from './auth.payload';
import { UserService } from 'src/user/user.service';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<ITokenReturnBody> {
    const user = await this.service.validateUser(payload);
    return await this.service.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Registration Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<ITokenReturnBody> {
    const user = await this.userService.create(payload);
    return await this.service.createToken(user);
  }
}
