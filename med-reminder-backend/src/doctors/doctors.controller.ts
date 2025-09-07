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
  Req,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

interface RequestWithUser extends Request {
  user: { userId: string; email: string };
}

@Controller('doctors')
export class DoctorsController {
  private readonly logger = new Logger(DoctorsController.name);

  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateDoctorDto, @Req() req: RequestWithUser) {
    try {
      return await this.doctorsService.create(dto, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Create doctor failed', error.stack);
      else this.logger.error('Create doctor failed', String(error));
      throw new InternalServerErrorException('Failed to create doctor');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDoctorDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      return await this.doctorsService.update(id, dto, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Update doctor failed', error.stack);
      else this.logger.error('Update doctor failed', String(error));
      throw new InternalServerErrorException('Failed to update doctor');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    try {
      return await this.doctorsService.remove(id, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Delete doctor failed', error.stack);
      else this.logger.error('Delete doctor failed', String(error));
      throw new InternalServerErrorException('Failed to delete doctor');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('availability')
  async addAvailability(@Body() dto: CreateAvailabilityDto) {
    return this.doctorsService.addAvailability(dto);
  }

  @Get(':id/availabilities')
  async getAvailabilities(@Param('id') doctorId: string) {
    return this.doctorsService.getDoctorAvailabilities(doctorId);
  }

  @Get()
  async findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.doctorsService.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch doctor failed', error.stack);
      else this.logger.error('Fetch doctor failed', String(error));
      throw error; // Let NotFoundException bubble up
    }
  }
}
