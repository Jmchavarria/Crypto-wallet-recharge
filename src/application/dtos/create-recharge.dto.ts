import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { FiatCurrency } from '../../domain/enums/fiat-currency.enum';
import { WalletType } from '../../domain/enums/wallet-type.enum';
import { TransactionType } from '../../domain/enums/transaction-type.enum';

export class CreateRechargeDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(WalletType)
  walletType: WalletType;

  @IsNumber()
  @IsPositive()
  amountFiat: number;

  @IsEnum(FiatCurrency)
  fiatCurrency: FiatCurrency;

  @IsEnum(TransactionType)
  transactionType: TransactionType;
}
