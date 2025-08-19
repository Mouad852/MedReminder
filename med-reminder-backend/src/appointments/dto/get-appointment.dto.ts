/* eslint-disable */
/* prettier-ignore */

import { IsOptional, IsString } from 'class-validator';

export class GetAppointmentDto {
  @IsOptional()
  @IsString()
  doctorId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
