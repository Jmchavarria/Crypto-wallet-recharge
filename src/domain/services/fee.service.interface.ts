import { Injectable } from '@nestjs/common';
import { IFeeService } from '../repositories/recharge.repository.interface';
import { TransactionType } from '../../domain/enums/transaction-type.enum';
import { TRANSACTION_FEES } from 'src/infrastructure/config/transaction-fees.config';

@Injectable()
export class FeeServiceImpl implements IFeeService {
  calculateFee(amountCrypto: number, transactionType: TransactionType): number {
    const feePercentage = this.getFeePercentage(transactionType);
    return (amountCrypto * feePercentage) / 100;
  }

  getFeePercentage(transactionType: TransactionType): number {
    const fee = TRANSACTION_FEES.find((f) => f.type === transactionType);

    if (!fee) {
      throw new Error(`No fee configuration found for ${transactionType}`);
    }

    return fee.percentage;
  }
}