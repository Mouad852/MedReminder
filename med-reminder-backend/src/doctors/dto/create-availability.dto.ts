/* eslint-disable */
/* prettier-ignore */
import { IsString, IsNotEmpty, IsDateString, IsBoolean } from 'class-validator';

export class CreateAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsDateString()
  date: string; // e.g. "2025-09-05"

  @IsString()
  startTime: string; // e.g. "09:00"

  @IsString()
  endTime: string; // e.g. "12:00"

  @IsBoolean()
  isBooked?: boolean = false;
}
