/* eslint-disable */
import {
  Controller,
  Get,
  Patch,
  Param,
  Req,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  // All routes are protected
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserNotifications(@Req() req) {
    // req.user.userId comes from the JWT
    return this.service.getUserNotifications(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Req() req) {
    // Optional: verify the notification belongs to this user
    return this.service.markAsRead(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendNotification(
    @Body()
    body: {
      userId: string;
      type: string;
      message: string;
      sendAt: string;
    },
  ) {
    const { userId, type, message, sendAt } = body;

    // Convert sendAt string to Date object
    const sendDate = new Date(sendAt);

    return this.service.scheduleNotification(userId, type, message, sendDate);
  }
}
