import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRechargeDto } from 'src/application/dto/create-recharge.dto';
import { RechargeResponseDto } from '../../application/dto/recharge-response.dto';
import { CreateRechargeUseCase } from '../../application/use-cases/create-recharge.use-case';
import { ListRechargesUseCase } from '../../application/use-cases/list-recharges.use-case';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../../domain/enums/user-role.enum';

@Controller('api/recharges')
@UseGuards(RolesGuard)
export class RechargeController {
  constructor(
    private readonly createRechargeUseCase: CreateRechargeUseCase,
    private readonly listRechargesUseCase: ListRechargesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  async createRecharge(
    @Body() dto: CreateRechargeDto,
  ): Promise<RechargeResponseDto> {
    const recharge = await this.createRechargeUseCase.execute(dto);
    return RechargeResponseDto.fromEntity(recharge);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.READ_ONLY)
  async listRecharges(
    @Query('userId') userId?: string,
  ): Promise<RechargeResponseDto[]> {
    const recharges = await this.listRechargesUseCase.execute(userId);
    return RechargeResponseDto.fromEntities(recharges);
  }
}