/* eslint-disable */
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { MedicationStatus } from '@prisma/client';

export class GetMedicationDto {
  @IsOptional()
  @IsEnum(MedicationStatus)
  status?: MedicationStatus;

  @IsOptional()
  @IsString()
  name?: string; // for searching medications by name
}
