// src/infrastructure/services/conversion.service.impl.ts
import { Injectable } from '@nestjs/common';
import { IConversionService } from '../../domain/services/conversion.service.interface';

import { FiatCurrency } from 'src/domain/enums/fiat-currency.enum';
import { WalletType } from 'src/domain/enums/wallet-type.enum';
@Injectable()
export class ConversionServiceImpl implements IConversionService {
  convert(amount: number, fiat: FiatCurrency, wallet: WalletType): number {
    return amount * 1; // mock simple
  }
}
