import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateRechargeUseCase } from '../../application/use-cases/create-recharge.use-case';
import { ListRechargesUseCase } from '../../application/use-cases/list-recharges.use-case';
import { CreateRechargeDto } from '../../application/dtos/create-recharge.dto';

import { Roles } from '../../infrastructure/auth/roles.decorator';
import { UserRole } from '../../domain/enums/user-role.enum';

@Controller('recharges')
export class RechargeController {
  constructor(
    private readonly createRecharge: CreateRechargeUseCase,
    private readonly listRecharges: ListRechargesUseCase,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateRechargeDto) {
    return this.createRecharge.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.READ_ONLY)
  list() {
    return this.listRecharges.execute();
  }
}
