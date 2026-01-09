import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Recharge } from '../../domain/entities/recharge.entity';
import type {
    IRechargeRepository,
} from '../../domain/repositories/recharge.repository.interface';
import { RECHARGE_REPOSITORY } from '../../domain/repositories/recharge.repository.interface';

import type { IConversionService, } from '../../domain/repositories/recharge.repository.interface';
import { CONVERSION_SERVICE } from '../../domain/repositories/recharge.repository.interface';
import type { IFeeService, } from '../../domain/repositories/recharge.repository.interface';
import { FEE_SERVICE } from '../../domain/repositories/recharge.repository.interface';
import { CreateRechargeDto } from '../dto/create-recharge.dto';

@Injectable()
export class CreateRechargeUseCase {
    constructor(
        @Inject(RECHARGE_REPOSITORY)
        private readonly rechargeRepository: IRechargeRepository,
        @Inject(CONVERSION_SERVICE)
        private readonly conversionService: IConversionService,
        @Inject(FEE_SERVICE)
        private readonly feeService: IFeeService,
    ) { }

    async execute(dto: CreateRechargeDto): Promise<Recharge> {
        // 1. Convertir monto Fiat a Crypto
        const amountCrypto = this.conversionService.convert(
            dto.amountFiat,
            dto.fiatCurrency,
            dto.walletType,
        );

        // 2. Calcular costo de transacción
        const transactionCost = this.feeService.calculateFee(
            amountCrypto,
            dto.transactionType,
        );

        // 3. Crear entidad de recarga
        const recharge = new Recharge({
            id: uuidv4(),
            userId: dto.userId,
            walletType: dto.walletType,
            amountFiat: dto.amountFiat,
            fiatCurrency: dto.fiatCurrency,
            amountCrypto,
            transactionType: dto.transactionType,
            transactionCost,
            createdAt: new Date(),
        });

        // 4. Guardar en repositorio
        return await this.rechargeRepository.create(recharge);
    }
}