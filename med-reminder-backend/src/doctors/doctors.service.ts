/* eslint-disable */
/* prettier-ignore */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {
    console.log('Prisma properties:', Object.keys(prisma));
  }

  async create(dto: CreateDoctorDto, adminId: string) {
    const admin = await this.prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Only admins can create doctor profiles');
    }

    // Ensure user exists and has role DOCTOR
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) throw new Error('User not found');

    return this.prisma.doctor.create({
      data: {
        userId: dto.userId, // <- must explicitly set userId
        specialty: dto.specialty,
        location: dto.location,
        phone: dto.phone,
        bio: dto.bio,
        experience: dto.experience,
      },
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.doctor.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true, appointments: true },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: string, dto: UpdateDoctorDto, adminId: string) {
    const admin = await this.prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Only admins can update doctor profiles');
    }

    return this.prisma.doctor.update({
      where: { id },
      data: dto,
      include: { user: true },
    });
  }

  async remove(id: string, adminId: string) {
    const admin = await this.prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Only admins can remove doctors');
    }

    return this.prisma.doctor.delete({ where: { id } });
  }
}
