/* eslint-disable */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MedicationScheduler implements OnModuleInit {
  private lastRun: Date = new Date();

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async onModuleInit() {
    // Start the daily check on service initialization
    this.startDailyScheduler();
  }

  private startDailyScheduler() {
    // Check every minute if we've crossed into a new day
    setInterval(async () => {
      const now = new Date();

      // Check if we've crossed midnight since last run
      if (
        now.getDate() !== this.lastRun.getDate() ||
        now.getMonth() !== this.lastRun.getMonth() ||
        now.getFullYear() !== this.lastRun.getFullYear()
      ) {
        await this.scheduleDailyMedicationNotifications();
        this.lastRun = now;
      }
    }, 60000); // Check every minute

    // Also run immediately on startup
    this.scheduleDailyMedicationNotifications();
  }

  async scheduleDailyMedicationNotifications() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      // Find all active medications that are valid for today
      const medications = await this.prisma.medication.findMany({
        where: {
          status: 'ACTIVE',
          enableReminders: true,
          startDate: { lte: today },
          OR: [{ endDate: null }, { endDate: { gte: today } }],
        },
      });

      for (const medication of medications) {
        const times = medication.times || [];

        for (const timeStr of times) {
          const [hours, minutes] = timeStr.split(':').map(Number);
          const notifDate = new Date(today);
          notifDate.setHours(hours, minutes, 0, 0);

          // Only schedule future notifications for today
          if (notifDate > new Date()) {
            await this.notificationsService.scheduleNotification(
              medication.userId,
              'MEDICATION',
              `Time to take your medication: ${medication.name}`,
              notifDate,
            );
          }
        }
      }
    } catch (error) {
      console.error('Error scheduling daily notifications:', error);
    }
  }
}
