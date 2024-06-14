import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  async find(@Param('email') email: string) {
    const user = await this.service.getByEmail(email);
    if (!user)
      throw new BadRequestException(
        'The user with that email could not be found.',
      );
    return user;
  }
}
