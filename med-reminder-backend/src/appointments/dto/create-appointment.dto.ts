/* eslint-disable */
/* prettier-ignore */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum
} from 'class-validator';
import { AppointmentStatus, AppointmentType } from '@prisma/client';

export class CreateAppointmentDto {
  @IsOptional()
  @IsString()
  doctorId?: string;

  @IsNotEmpty()
  @IsEnum(AppointmentType)
  type: AppointmentType;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
