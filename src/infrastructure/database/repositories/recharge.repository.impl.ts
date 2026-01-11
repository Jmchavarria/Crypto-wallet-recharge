import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IRechargeRepository } from '../../../domain/repositories/recharge.repository.interface';
import { Recharge } from '../../../domain/entities/recharge.entity';

@Injectable()
export class RechargeRepositoryImpl implements IRechargeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recharge: Recharge): Promise<Recharge> {
    const row = await this.prisma.recharge.create({
      data: {
        id: recharge.id,
        userId: recharge.userId,
        walletType: recharge.walletType,           // string
        amountFiat: recharge.amountFiat,
        fiatCurrency: recharge.fiatCurrency,       // string
        amountCrypto: recharge.amountCrypto,
        transactionType: recharge.transactionType, // string
        transactionCost: recharge.transactionCost,
        createdAt: recharge.createdAt,
      },
    });

    return new Recharge(
      row.id,
      row.userId,
      row.walletType as any,
      Number(row.amountFiat),
      row.fiatCurrency as any,
      Number(row.amountCrypto),
      row.transactionType as any,
      Number(row.transactionCost),
      row.createdAt,
    );
  }

  async findAll(): Promise<Recharge[]> {
    const rows = await this.prisma.recharge.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return rows.map(
      (r) =>
        new Recharge(
          r.id,
          r.userId,
          r.walletType as any,
          Number(r.amountFiat),
          r.fiatCurrency as any,
          Number(r.amountCrypto),
          r.transactionType as any,
          Number(r.transactionCost),
          r.createdAt,
        ),
    );
  }

  async findById(id: string): Promise<Recharge | null> {
    const r = await this.prisma.recharge.findUnique({ where: { id } });

    if (!r) return null;

    return new Recharge(
      r.id,
      r.userId,
      r.walletType as any,
      Number(r.amountFiat),
      r.fiatCurrency as any,
      Number(r.amountCrypto),
      r.transactionType as any,
      Number(r.transactionCost),
      r.createdAt,
    );
  }

  async findByUserId(userId: string): Promise<Recharge[]> {
    const rows = await this.prisma.recharge.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return rows.map(
      (r) =>
        new Recharge(
          r.id,
          r.userId,
          r.walletType as any,
          Number(r.amountFiat),
          r.fiatCurrency as any,
          Number(r.amountCrypto),
          r.transactionType as any,
          Number(r.transactionCost),
          r.createdAt,
        ),
    );
  }
}
