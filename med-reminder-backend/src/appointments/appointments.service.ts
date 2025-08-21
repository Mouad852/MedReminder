/* eslint-disable */
/* prettier-ignore */

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentDto } from './dto/get-appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto, userId: string) {
    try {
      return await this.prisma.appointment.create({
        data: { ...dto, userId },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Create failed', error.stack);
      else this.logger.error('Create failed', String(error));
      throw error;
    }
  }

  async findAll(userId: string, query: GetAppointmentDto) {
    try {
      const where: any = { userId };
      if (query.doctorId) where.doctorId = query.doctorId;
      if (query.status) {
        if (
          Object.values(AppointmentStatus).includes(
            query.status as AppointmentStatus,
          )
        ) {
          where.status = query.status as AppointmentStatus;
        } else throw new Error(`Invalid status value: ${query.status}`);
      }
      return this.prisma.appointment.findMany({
        where,
        include: { user: true, doctor: true },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch all failed', error.stack);
      else this.logger.error('Fetch all failed', String(error));
      throw error;
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id },
        include: { user: true, doctor: true },
      });
      if (!appointment) throw new NotFoundException('Appointment not found');
      if (appointment.userId !== userId)
        throw new ForbiddenException('No access to this appointment');
      return appointment;
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch one failed', error.stack);
      else this.logger.error('Fetch one failed', String(error));
      throw error;
    }
  }

  async update(id: string, dto: UpdateAppointmentDto, userId: string) {
    try {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id },
      });
      if (!appointment) throw new NotFoundException('Appointment not found');
      if (appointment.userId !== userId)
        throw new ForbiddenException('No access to update');
      return this.prisma.appointment.update({ where: { id }, data: dto });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Update failed', error.stack);
      else this.logger.error('Update failed', String(error));
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id },
      });
      if (!appointment) throw new NotFoundException('Appointment not found');
      if (appointment.userId !== userId)
        throw new ForbiddenException('No access to delete');
      return this.prisma.appointment.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Delete failed', error.stack);
      else this.logger.error('Delete failed', String(error));
      throw error;
    }
  }
}
