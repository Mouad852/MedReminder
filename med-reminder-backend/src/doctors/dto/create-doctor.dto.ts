/* eslint-disable */
/* prettier-ignore */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsInt,
  Min,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  experience?: number;
}
