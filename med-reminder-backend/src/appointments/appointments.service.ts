/* eslint-disable */
/* prettier-ignore */

/* eslint-disable */
/* prettier-ignore */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentDto } from './dto/get-appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto, userId: string) {
    return this.prisma.appointment.create({
      data: {
        ...dto,
        userId, // ensure ownership
      },
    });
  }

  async findAll(userId: string, query: GetAppointmentDto) {
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
  }

  async findOne(id: string, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { user: true, doctor: true },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.userId !== userId)
      throw new ForbiddenException(
        'You do not have access to this appointment',
      );
    return appointment;
  }

  async update(id: string, dto: UpdateAppointmentDto, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.userId !== userId)
      throw new ForbiddenException(
        'You do not have access to update this appointment',
      );

    return this.prisma.appointment.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.userId !== userId)
      throw new ForbiddenException(
        'You do not have access to delete this appointment',
      );

    return this.prisma.appointment.delete({ where: { id } });
  }
}
