// src/domain/repositories/recharge.repository.interface.ts
import { Recharge } from '../entities/recharge.entity';

export interface IRechargeRepository {
  create(recharge: Recharge): Promise<Recharge>;
  findAll(): Promise<Recharge[]>;
  findById(id: string): Promise<Recharge | null>;
  findByUserId(userId: string): Promise<Recharge[]>;
}

export const RECHARGE_REPOSITORY = Symbol('IRechargeRepository');

// src/domain/services/conversion.service.interface.ts
import { FiatCurrency } from '../enums/fiat-currency.enum';
import { WalletType } from '../enums/wallet-type.enum';

export interface IConversionService {
  convert(
    amountFiat: number,
    fiatCurrency: FiatCurrency,
    walletType: WalletType,
  ): number;
  getRate(fiatCurrency: FiatCurrency, walletType: WalletType): number;
}

export const CONVERSION_SERVICE = Symbol('IConversionService');

// src/domain/services/fee.service.interface.ts
import { TransactionType } from '../enums/transaction-type.enum';

export interface IFeeService {
  calculateFee(amountCrypto: number, transactionType: TransactionType): number;
  getFeePercentage(transactionType: TransactionType): number;
}

export const FEE_SERVICE = Symbol('IFeeService');