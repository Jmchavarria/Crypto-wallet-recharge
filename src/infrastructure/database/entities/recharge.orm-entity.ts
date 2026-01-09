import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { FiatCurrency } from '../../../domain/enums/fiat-currency.enum';
import { WalletType } from '../../../domain/enums/wallet-type.enum';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { Recharge } from '../../../domain/entities/recharge.entity';

@Entity('recharges')
export class RechargeOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: WalletType,
    name: 'wallet_type',
  })
  walletType: WalletType;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'amount_fiat' })
  amountFiat: number;

  @Column({
    type: 'enum',
    enum: FiatCurrency,
    name: 'fiat_currency',
  })
  fiatCurrency: FiatCurrency;

  @Column({ type: 'decimal', precision: 15, scale: 8, name: 'amount_crypto' })
  amountCrypto: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    name: 'transaction_type',
  })
  transactionType: TransactionType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'transaction_cost',
  })
  transactionCost: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  toDomain(): Recharge {
    return new Recharge({
      id: this.id,
      userId: this.userId,
      walletType: this.walletType,
      amountFiat: Number(this.amountFiat),
      fiatCurrency: this.fiatCurrency,
      amountCrypto: Number(this.amountCrypto),
      transactionType: this.transactionType,
      transactionCost: Number(this.transactionCost),
      createdAt: this.createdAt,
    });
  }

  static fromDomain(recharge: Recharge): RechargeOrmEntity {
    const ormEntity = new RechargeOrmEntity();
    ormEntity.id = recharge.id;
    ormEntity.userId = recharge.userId;
    ormEntity.walletType = recharge.walletType;
    ormEntity.amountFiat = recharge.amountFiat;
    ormEntity.fiatCurrency = recharge.fiatCurrency;
    ormEntity.amountCrypto = recharge.amountCrypto;
    ormEntity.transactionType = recharge.transactionType;
    ormEntity.transactionCost = recharge.transactionCost;
    ormEntity.createdAt = recharge.createdAt;
    return ormEntity;
  }
}
