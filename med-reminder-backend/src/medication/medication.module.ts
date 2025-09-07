/* eslint-disable */

import { Module } from '@nestjs/common';
import { MedicationsService } from './medication.service';
import { MedicationsController } from './medication.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MedicationScheduler } from './medication-scheduler.service';

@Module({
  imports: [NotificationsModule, PrismaModule],
  controllers: [MedicationsController],
  providers: [MedicationsService, PrismaService, MedicationScheduler],
  exports: [MedicationsService],
})
export class MedicationsModule {}
