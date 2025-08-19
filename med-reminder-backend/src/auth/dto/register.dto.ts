/* eslint-disable */
/* prettier-ignore */

/* eslint-disable prettier/prettier */

import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @IsString() @IsNotEmpty() firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
