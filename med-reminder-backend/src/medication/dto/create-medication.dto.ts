/* eslint-disable */ /* prettier-ignore */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsArray,
  IsDateString,
  IsBoolean,
  Matches,
  ArrayMaxSize,
  ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  MedicationForm,
  MedicationStatus,
  MedicationInstruction,
} from '@prisma/client';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  dosage: number;

  @IsString()
  @IsOptional()
  dosageUnit?: string;

  @IsEnum(MedicationForm)
  @IsOptional()
  form?: MedicationForm;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  timesPerDay: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(24) // optional max limit
  @IsString({ each: true })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    each: true,
    message: 'Times must be in HH:mm format',
  })
  times: string[];

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  reminderMethod?: string; // "app", "sms", "email"

  @IsOptional()
  @IsBoolean()
  enableReminders?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(MedicationStatus)
  status?: MedicationStatus;

  @IsOptional()
  @IsEnum(MedicationInstruction)
  instruction?: MedicationInstruction;
}
