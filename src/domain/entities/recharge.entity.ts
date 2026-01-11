// src/domain/entities/recharge.entity.ts
import { WalletType } from '../enums/wallet-type.enum';
import { FiatCurrency } from '../enums/fiat-currency.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export class Recharge {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly walletType: WalletType,
    public readonly amountFiat: number,
    public readonly fiatCurrency: FiatCurrency,
    public readonly amountCrypto: number,
    public readonly transactionType: TransactionType,
    public readonly transactionCost: number,
    public readonly createdAt: Date,
  ) {}
}
