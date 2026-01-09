import { FiatCurrency } from '../../domain/enums/fiat-currency.enum';
import { WalletType } from '../../domain/enums/wallet-type.enum';

export interface ConversionRate {
  from: FiatCurrency;
  to: WalletType;
  rate: number;
}

/**
 * Tasas de conversión ficticias
 * Formato: 1 unidad de moneda Fiat = X unidades de Crypto
 */
export const CONVERSION_RATES: ConversionRate[] = [
  // Conversiones a USDC (stablecoin del dólar)
  { from: FiatCurrency.USD, to: WalletType.USDC, rate: 1.0 },
  { from: FiatCurrency.CHF, to: WalletType.USDC, rate: 1.12 },
  { from: FiatCurrency.COP, to: WalletType.USDC, rate: 0.00025 },

  // Conversiones a COPW (stablecoin del peso colombiano)
  { from: FiatCurrency.USD, to: WalletType.COPW, rate: 4000.0 },
  { from: FiatCurrency.CHF, to: WalletType.COPW, rate: 4480.0 },
  { from: FiatCurrency.COP, to: WalletType.COPW, rate: 1.0 },
];
