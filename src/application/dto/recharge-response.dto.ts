import { FiatCurrency } from '../../domain/enums/fiat-currency.enum';
import { WalletType } from '../../domain/enums/wallet-type.enum';
import { TransactionType } from '../../domain/enums/transaction-type.enum';
import { Recharge } from '../../domain/entities/recharge.entity';

export class RechargeResponseDto {
  id: string;
  userId: string;
  walletType: WalletType;
  amountFiat: number;
  fiatCurrency: FiatCurrency;
  amountCrypto: number;
  transactionType: TransactionType;
  transactionCost: number;
  finalAmount: number;
  createdAt: Date;

  static fromEntity(recharge: Recharge): RechargeResponseDto {
    return {
      id: recharge.id,
      userId: recharge.userId,
      walletType: recharge.walletType,
      amountFiat: recharge.amountFiat,
      fiatCurrency: recharge.fiatCurrency,
      amountCrypto: recharge.amountCrypto,
      transactionType: recharge.transactionType,
      transactionCost: recharge.transactionCost,
      finalAmount: recharge.calculateFinalAmount(),
      createdAt: recharge.createdAt,
    };
  }

  static fromEntities(recharges: Recharge[]): RechargeResponseDto[] {
    return recharges.map((recharge) => this.fromEntity(recharge));
  }
}