import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { FiatCurrency } from '../../domain/enums/fiat-currency.enum';
import { WalletType } from '../../domain/enums/wallet-type.enum';
import { TransactionType } from '../../domain/enums/transaction-type.enum';

export class CreateRechargeDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amountFiat: number;

  @IsNotEmpty()
  @IsEnum(FiatCurrency)
  fiatCurrency: FiatCurrency;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNotEmpty()
  @IsEnum(WalletType)
  walletType: WalletType;
}