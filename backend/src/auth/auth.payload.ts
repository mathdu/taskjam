import { ApiProperty } from '@nestjs/swagger';
// TODO
// import {
//   IsAlphanumeric,
//   IsEmail,
//   IsNotEmpty,
//   Matches,
//   MinLength,
// } from 'class-validator';

export class LoginPayload {
  @ApiProperty({ required: true })
  // TODO
  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  // TODO
  // @IsNotEmpty()
  // @MinLength(8)
  password: string;
}
export class RegisterPayload {
  @ApiProperty({ required: true })
  // TODO
  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  // TODO
  // @Matches(/^[a-zA-Z ]+$/)
  // @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  // TODO
  // @IsNotEmpty()
  // @MinLength(8)
  password: string;
}
