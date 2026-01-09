import { Inject, Injectable } from '@nestjs/common';
import { Recharge } from '../../domain/entities/recharge.entity';
import type {
    IRechargeRepository,
} from '../../domain/repositories/recharge.repository.interface';
import { RECHARGE_REPOSITORY } from '../../domain/repositories/recharge.repository.interface';

@Injectable()
export class ListRechargesUseCase {
    constructor(
        @Inject(RECHARGE_REPOSITORY)
        private readonly rechargeRepository: IRechargeRepository,
    ) { }

    async execute(userId?: string): Promise<Recharge[]> {
        if (userId) {
            return await this.rechargeRepository.findByUserId(userId);
        }
        return await this.rechargeRepository.findAll();
    }
}