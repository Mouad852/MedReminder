/* eslint-disable */
/* prettier-ignore */
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      this.logger.log(`Creating user with email: ${dto.email}`);
      const existingUser = await this.findByEmail(dto.email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          role: dto.role ?? 'PATIENT',
        },
      });
      this.logger.log(`User created successfully: ${dto.email}`);
      return user;
    } catch (error: any) {
      this.logger.error(`Failed to create user: ${dto.email}`, error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching all users');
      return await this.prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error: any) {
      this.logger.error('Failed to fetch users', error.stack);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Fetching user with id: ${id}`);
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error: any) {
      this.logger.error(`Failed to fetch user ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async findByEmail(email: string) {
    try {
      this.logger.log(`Looking up user by email: ${email}`);
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error: any) {
      this.logger.error(`Failed to fetch user by email: ${email}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch user by email');
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      this.logger.log(`Updating user with id: ${id}`);
      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
      }
      const user = await this.prisma.user.update({
        where: { id },
        data: dto,
      });
      this.logger.log(`User updated successfully: ${id}`);
      return user;
    } catch (error: any) {
      this.logger.error(`Failed to update user ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`Hard deleting user with id: ${id}`);
      const user = await this.prisma.user.delete({
        where: { id },
      });
      this.logger.log(`User hard-deleted successfully: ${id}`);
      return user;
    } catch (error: any) {
      this.logger.error(`Failed to delete user ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async validateUser(email: string, password: string) {
    try {
      this.logger.log(`Validating user credentials for email: ${email}`);
      const user = await this.findByEmail(email);
      if (!user) return null;

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return null;

      const { password: _, ...result } = user;
      return result;
    } catch (error: any) {
      this.logger.error(`Failed to validate user: ${email}`, error.stack);
      throw new InternalServerErrorException('Failed to validate user');
    }
  }
}
