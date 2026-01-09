import { TransactionType } from '../../domain/enums/transaction-type.enum';

export interface TransactionFee {
  type: TransactionType;
  percentage: number;
}

/**
 * Costos de transacción por tipo
 * Formato: porcentaje del monto crypto a cobrar
 */
export const TRANSACTION_FEES: TransactionFee[] = [
  { type: TransactionType.BANK_TRANSFER, percentage: 1.5 },
  { type: TransactionType.ATM_NATIONAL, percentage: 2.0 },
  { type: TransactionType.ATM_INTERNATIONAL, percentage: 3.5 },
];