/* eslint-disable */
/* prettier-ignore */
import { Injectable, UnauthorizedException, Logger, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    try {
      this.logger.log(`Registering user with email: ${data.email}`);
      const existing = await this.usersService.findByEmail(data.email);
      if (existing) throw new ConflictException('Email already in use');

      const hashed = await bcrypt.hash(data.password, 10);

      const userData = {
        ...data,
        password: hashed,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        phone: data.phone,
      };

      await this.usersService.create(userData);

      this.logger.log(`Successfully registered user: ${data.email}`);
      return { message: 'User registered successfully' };
    } catch (error: any) {
      this.logger.error('Error registering user', error.stack);
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Could not register user');
    }
  }

  async login(email: string, password: string) {
    try {
      this.logger.log(`Login attempt for email: ${email}`);
      const user = await this.usersService.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        this.logger.warn(`Invalid login credentials for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      this.logger.log(`User logged in: ${email}`);
      return {
        accessToken: token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          city: user.city,
        },
      };
    } catch (error: any) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.error('Unexpected error during login', error.stack);
      throw new InternalServerErrorException('Could not generate token');
    }
  }
}
