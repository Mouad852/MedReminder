/* eslint-disable */
import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from './notifications.service';

@Processor('notifications')
export class NotificationsProcessor {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  @Process('send-notification')
  async handleNotification(job: Job<{ notificationId: string }>) {
    const { notificationId } = job.data;

    // Fetch notification from DB
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: true },
    });

    if (!notification) return;

    if (notification.user?.email) {
      await this.notificationsService.sendEmail(
        notification.user.email,
        `MedReminder - ${notification.type}`,
        notification.message,
      );
    }
  }
}
