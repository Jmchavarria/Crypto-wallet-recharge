// src/domain/services/fee.service.interface.ts
import { TransactionType } from "../enums/transaction-type.enum";

export const FEE_SERVICE = 'FEE_SERVICE';

export interface IFeeService {
  feeFor(type: TransactionType): number;
}
