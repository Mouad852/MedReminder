/* eslint-disable */ /* prettier-ignore */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentDto } from './dto/get-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Logger } from '@nestjs/common';

@Controller('appointments')
export class AppointmentsController {
  private readonly logger = new Logger(AppointmentsController.name);

  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateAppointmentDto, @Req() req) {
    try {
      return await this.appointmentsService.create(dto, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Create appointment failed', error.stack);
      else this.logger.error('Create appointment failed', String(error));
      throw new InternalServerErrorException('Failed to create appointment');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetAppointmentDto, @Req() req) {
    try {
      return await this.appointmentsService.findAll(req.user.userId, query);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch appointments failed', error.stack);
      else this.logger.error('Fetch appointments failed', String(error));
      throw new InternalServerErrorException('Failed to fetch appointments');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      return await this.appointmentsService.findOne(id, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch appointment failed', error.stack);
      else this.logger.error('Fetch appointment failed', String(error));
      throw error; // Let NotFoundException / ForbiddenException bubble up
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentDto,
    @Req() req,
  ) {
    try {
      return await this.appointmentsService.update(id, dto, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Update appointment failed', error.stack);
      else this.logger.error('Update appointment failed', String(error));
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    try {
      return await this.appointmentsService.remove(id, req.user.userId);
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Delete appointment failed', error.stack);
      else this.logger.error('Delete appointment failed', String(error));
      throw error;
    }
  }
}
