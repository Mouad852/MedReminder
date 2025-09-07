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
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(dto: CreateAppointmentDto, userId: string) {
    try {
      const appointmentDate = new Date(`${dto.date}T${dto.time}:00`);

      const appointment = await this.prisma.appointment.create({
        data: {
          doctorId: dto.doctorId || null,
          doctorName: dto.doctorName || null,
          location: dto.location || null,
          type: dto.type,
          status: dto.status,
          date: appointmentDate,
          time: dto.time,
          notes: dto.notes,
          userId,
        },
      });

      const doctorName = dto.doctorName || 'your doctor';
      const oneDayBefore = new Date(appointmentDate);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1); // go back 1 day
      oneDayBefore.setHours(10, 0, 0, 0);

      // Schedule notification 1 day before
      await this.notificationsService.scheduleNotification(
        userId,
        'APPOINTMENT',
        `Your appointment with ${doctorName} is tomorrow at ${dto.time}`,
        oneDayBefore,
      );

      // Schedule notification 2 hours before
      await this.notificationsService.scheduleNotification(
        userId,
        'APPOINTMENT',
        `Your appointment with ${doctorName} is in 2 hours at ${dto.time}`,
        new Date(appointmentDate.getTime() - 2 * 60 * 60 * 1000),
      );

      return appointment;
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

      // Fetch appointments
      const appointments = await this.prisma.appointment.findMany({
        where,
        include: { user: true, doctor: { include: { user: true } } },
      });

      const now = new Date();

      // Update past appointments
      const updatedAppointments = await Promise.all(
        appointments.map(async (appt) => {
          if (appt.status === 'BOOKED' && new Date(appt.date) < now) {
            return await this.prisma.appointment.update({
              where: { id: appt.id },
              data: { status: 'COMPLETED' },
              include: { user: true, doctor: { include: { user: true } } },
            });
          }
          return appt;
        }),
      );

      return updatedAppointments;
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
        include: { user: true, doctor: { include: { user: true } } },
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
