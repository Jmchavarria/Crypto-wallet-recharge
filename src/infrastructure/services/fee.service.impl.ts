// src/infrastructure/services/fee.service.impl.ts
import { Injectable } from '@nestjs/common';
import { IFeeService } from '../../domain/services/fee.service.interface';
import { TransactionType } from 'src/domain/enums/transaction-type.enum';

@Injectable()
export class FeeServiceImpl implements IFeeService {
  feeFor(type: TransactionType): number {
    return 2;
  }
}
