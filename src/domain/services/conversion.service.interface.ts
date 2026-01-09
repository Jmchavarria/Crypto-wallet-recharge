import { Injectable } from '@nestjs/common';
import { IConversionService } from '../repositories/recharge.repository.interface';
import { FiatCurrency } from '../../domain/enums/fiat-currency.enum';
import { WalletType } from '../../domain/enums/wallet-type.enum';
import { CONVERSION_RATES } from 'src/infrastructure/config/conversion-rates.config';

@Injectable()
export class ConversionServiceImpl implements IConversionService {
  convert(
    amountFiat: number,
    fiatCurrency: FiatCurrency,
    walletType: WalletType,
  ): number {
    const rate = this.getRate(fiatCurrency, walletType);
    return amountFiat * rate;
  }

  getRate(fiatCurrency: FiatCurrency, walletType: WalletType): number {
    const conversionRate = CONVERSION_RATES.find(
      (r) => r.from === fiatCurrency && r.to === walletType,
    );

    if (!conversionRate) {
      throw new Error(
        `No conversion rate found for ${fiatCurrency} to ${walletType}`,
      );
    }

    return conversionRate.rate;
  }
}