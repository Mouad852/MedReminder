/* eslint-disable */

import { Module } from '@nestjs/common';
import { MedicationsService } from './medication.service';
import { MedicationsController } from './medication.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService, PrismaService],
})
export class MedicationsModule {}
