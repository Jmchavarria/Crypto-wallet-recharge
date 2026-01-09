// src/domain/entities/recharge.entity.ts
import { FiatCurrency } from '../enums/fiat-currency.enum';
import { WalletType } from '../enums/wallet-type.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export class Recharge {
  id: string;
  userId: string;
  walletType: WalletType;
  amountFiat: number;
  fiatCurrency: FiatCurrency;
  amountCrypto: number;
  transactionType: TransactionType;
  transactionCost: number;
  createdAt: Date;

  constructor(partial: Partial<Recharge>) {
    Object.assign(this, partial);
  }

  calculateFinalAmount(): number {
    return this.amountCrypto - this.transactionCost;
  }

  getTransactionCostPercentage(): number {
    if (this.amountCrypto === 0) return 0;
    return (this.transactionCost / this.amountCrypto) * 100;
  }
}