/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { NotificationsGateway } from './notifications.gateway';
import { timeStamp } from 'console';

@Injectable()
export class NotificationsService {
  private transporter;
  constructor(
    private prisma: PrismaService,
    @InjectQueue('notifications') private notificationQueue: Queue,
    private configService: ConfigService,
    private gateway: NotificationsGateway,
  ) {
    // Setup nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: Number(this.configService.get('SMTP_PORT')),
      secure: false, // true if using port 465
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async scheduleNotification(
    userId: string,
    type: string,
    message: string,
    sendAt: Date,
  ) {
    // Save notification in DB
    const notification = await this.prisma.notification.create({
      data: { userId, type, message, sendAt },
    });

    this.gateway.sendNotification(userId, notification);

    // Schedule job in Bull
    await this.notificationQueue.add(
      'send-notification',
      { notificationId: notification.id },
      { delay: Math.max(sendAt.getTime() - Date.now(), 0) },
    );

    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: `"MedReminder" <${this.configService.get('SMTP_USER')}>`,
        to,
        subject,
        text,
      });
    } catch (err) {
      console.error('Failed to send email', err);
    }
  }
}
