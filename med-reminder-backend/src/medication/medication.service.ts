/* eslint-disable */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { GetMedicationDto } from './dto/get-medication.dto';

@Injectable()
export class MedicationsService {
  private readonly logger = new Logger(MedicationsService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMedicationDto, userId: string) {
    try {
      return await this.prisma.medication.create({
        data: {
          ...dto,
          userId,
          startDate: new Date(dto.startDate),
        },
      });
    } catch (error) {
      this.logger.error(
        'Create medication failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async findAll(userId: string, query: GetMedicationDto) {
    try {
      const where: any = { userId };
      if (query.status) where.status = query.status;
      if (query.name)
        where.name = { contains: query.name, mode: 'insensitive' };

      return this.prisma.medication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(
        'Fetch medications failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async findOne(id: string, userId: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });
    if (!medication) throw new NotFoundException('Medication not found');
    if (medication.userId !== userId)
      throw new ForbiddenException('No access to this medication');
    return medication;
  }

  async update(id: string, dto: UpdateMedicationDto, userId: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });
    if (!medication) throw new NotFoundException('Medication not found');
    if (medication.userId !== userId)
      throw new ForbiddenException('No access to update');

    return this.prisma.medication.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      },
    });
  }

  async remove(id: string, userId: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });
    if (!medication) throw new NotFoundException('Medication not found');
    if (medication.userId !== userId)
      throw new ForbiddenException('No access to delete');
    return this.prisma.medication.delete({ where: { id } });
  }
}
