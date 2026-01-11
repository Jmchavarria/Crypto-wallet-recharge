import { Inject, Injectable } from '@nestjs/common';

import type { IRechargeRepository } from '../../domain/repositories/recharge.repository.interface';
import { RECHARGE_REPOSITORY } from '../../domain/repositories/recharge.repository.interface';

import { Recharge } from '../../domain/entities/recharge.entity';

@Injectable()
export class ListRechargesUseCase {
  constructor(
    @Inject(RECHARGE_REPOSITORY)
    private readonly rechargeRepository: IRechargeRepository,
  ) {}

  async execute(): Promise<Recharge[]> {
    return this.rechargeRepository.findAll();
  }
}
