// src/application/use-cases/create-recharge.use-case.ts
import { Inject, Injectable } from '@nestjs/common';

import type { IRechargeRepository } from '../../domain/repositories/recharge.repository.interface';
import { RECHARGE_REPOSITORY } from '../../domain/repositories/recharge.repository.interface';

import type { IConversionService } from '../../domain/services/conversion.service.interface';
import { CONVERSION_SERVICE } from '../../domain/services/conversion.service.interface';

import type { IFeeService } from '../../domain/services/fee.service.interface';
import { FEE_SERVICE } from '../../domain/services/fee.service.interface';

import { Recharge } from '../../domain/entities/recharge.entity';
import type { CreateRechargeDto } from '../dtos/create-recharge.dto';

@Injectable()
export class CreateRechargeUseCase {
  constructor(
    @Inject(RECHARGE_REPOSITORY) private readonly repo: IRechargeRepository,
    @Inject(CONVERSION_SERVICE) private readonly conversion: IConversionService,
    @Inject(FEE_SERVICE) private readonly fees: IFeeService,
  ) {}

  async execute(dto: CreateRechargeDto) {
    const amountCrypto = this.conversion.convert(
      dto.amountFiat,
      dto.fiatCurrency,
      dto.walletType,
    );

    const transactionCost = this.fees.feeFor(dto.transactionType);

    const recharge = new Recharge(
      crypto.randomUUID(),
      dto.userId,
      dto.walletType,
      dto.amountFiat,
      dto.fiatCurrency,
      amountCrypto,
      dto.transactionType,
      transactionCost,
      new Date(),
    );

    return this.repo.create(recharge);
  }
}
