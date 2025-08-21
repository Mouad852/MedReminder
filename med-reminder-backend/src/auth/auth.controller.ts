/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      this.logger.log(`Attempting registration for email: ${dto.email}`);
      return await this.authService.register(dto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Registration failed', error.stack);
      } else {
        this.logger.error('Registration failed', String(error));
      }

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      this.logger.log(`Login attempt for email: ${dto.email}`);
      return await this.authService.login(dto.email, dto.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Login failed', error.stack);
      } else {
        this.logger.error('Login failed', String(error));
      }

      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Login failed');
    }
  }
}
