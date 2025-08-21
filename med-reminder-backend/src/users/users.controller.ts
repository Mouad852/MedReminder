/* eslint-disable */
/* prettier-ignore */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: { userId: string; email: string };
}

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      this.logger.log(`Creating user with email: ${dto.email}`);
      return await this.usersService.create(dto);
    } catch (error: any) {
      this.logger.error('Failed to create user', error.stack);
      if (error.message?.includes('Email already in use')) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all users');
      return await this.usersService.findAll();
    } catch (error: any) {
      this.logger.error('Failed to fetch users', error.stack);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching user with id: ${id}`);
      return await this.usersService.findOne(id);
    } catch (error: any) {
      this.logger.error(`Failed to fetch user ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      this.logger.log(`Updating user with id: ${id}`);
      if (req.user.userId !== id) {
        throw new UnauthorizedException('You cannot update this user');
      }
      return await this.usersService.update(id, dto);
    } catch (error: any) {
      this.logger.error(`Failed to update user ${id}`, error.stack);
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    try {
      this.logger.log(`Deleting user with id: ${id}`);
      if (req.user.userId !== id) {
        throw new UnauthorizedException('You cannot delete this user');
      }
      return await this.usersService.remove(id);
    } catch (error: any) {
      this.logger.error(`Failed to delete user ${id}`, error.stack);
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
