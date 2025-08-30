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
} from 'class-validator';
import {
  MedicationForm,
  MedicationStatus,
  MedicationInstruction,
} from '@prisma/client';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsEnum(MedicationForm)
  @IsOptional()
  form?: MedicationForm;

  @IsInt()
  @Min(1)
  timesPerDay: number;

  @IsOptional()
  @IsArray()
  times?: string[];

  @IsDateString()
  startDate: string;

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
