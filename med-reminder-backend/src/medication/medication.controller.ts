/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MedicationsService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { GetMedicationDto } from './dto/get-medication.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('medications')
export class MedicationsController {
  private readonly logger = new Logger(MedicationsController.name);

  constructor(private readonly medicationsService: MedicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateMedicationDto, @Req() req) {
    try {
      return await this.medicationsService.create(dto, req.user.userId);
    } catch (error) {
      this.logger.error(
        'Create medication failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Failed to create medication');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetMedicationDto, @Req() req) {
    try {
      return await this.medicationsService.findAll(req.user.userId, query);
    } catch (error) {
      this.logger.error(
        'Fetch medications failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Failed to fetch medications');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      return await this.medicationsService.findOne(id, req.user.userId);
    } catch (error) {
      this.logger.error(
        'Fetch medication failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMedicationDto,
    @Req() req,
  ) {
    try {
      return await this.medicationsService.update(id, dto, req.user.userId);
    } catch (error) {
      this.logger.error(
        'Update medication failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    try {
      return await this.medicationsService.remove(id, req.user.userId);
    } catch (error) {
      this.logger.error(
        'Delete medication failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}
