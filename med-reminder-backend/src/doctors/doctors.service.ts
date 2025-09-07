/* eslint-disable */
/* prettier-ignore */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class DoctorsService {
  private readonly logger = new Logger(DoctorsService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDoctorDto, adminId: string) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: { id: adminId },
      });
      if (!admin || admin.role !== 'ADMIN')
        throw new Error('Only admins can create doctor profiles');

      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!user) throw new Error('User not found');

      return await this.prisma.doctor.create({
        data: {
          userId: dto.userId,
          specialty: dto.specialty,
          location: dto.location,
          phone: dto.phone,
          bio: dto.bio,
          experience: dto.experience,
        },
        include: { user: true },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Create doctor failed', error.stack);
      else this.logger.error('Create doctor failed', String(error));
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.doctor.findMany({
        include: {
          user: true,
          availabilities: {
            orderBy: { date: 'asc' }, // optional: sort availabilities by date
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch all doctors failed', error.stack);
      else this.logger.error('Fetch all doctors failed', String(error));
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id },
        include: { user: true, appointments: true },
      });
      if (!doctor) throw new NotFoundException('Doctor not found');
      return doctor;
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Fetch doctor failed', error.stack);
      else this.logger.error('Fetch doctor failed', String(error));
      throw error;
    }
  }

  async update(id: string, dto: UpdateDoctorDto, adminId: string) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: { id: adminId },
      });
      if (!admin || admin.role !== 'ADMIN')
        throw new Error('Only admins can update doctor profiles');

      return await this.prisma.doctor.update({
        where: { id },
        data: dto,
        include: { user: true },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Update doctor failed', error.stack);
      else this.logger.error('Update doctor failed', String(error));
      throw error;
    }
  }

  async remove(id: string, adminId: string) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: { id: adminId },
      });
      if (!admin || admin.role !== 'ADMIN')
        throw new Error('Only admins can remove doctors');

      return await this.prisma.doctor.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.logger.error('Delete doctor failed', error.stack);
      else this.logger.error('Delete doctor failed', String(error));
      throw error;
    }
  }

  async addAvailability(dto: CreateAvailabilityDto) {
    return await this.prisma.availability.create({
      data: {
        doctorId: dto.doctorId,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        isBooked: dto.isBooked ?? false,
      },
    });
  }

  async getDoctorAvailabilities(doctorId: string) {
    return await this.prisma.availability.findMany({
      where: { doctorId },
      orderBy: { date: 'asc' },
    });
  }
}
