// src/domain/services/conversion.service.interface.ts

import { FiatCurrency } from '../enums/fiat-currency.enum';
import { WalletType } from '../enums/wallet-type.enum';

export const CONVERSION_SERVICE = 'CONVERSION_SERVICE';

export interface IConversionService {
  convert(amount: number, fiat: FiatCurrency, wallet: WalletType): number;
}
