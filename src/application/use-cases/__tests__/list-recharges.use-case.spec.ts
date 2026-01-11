import { ListRechargesUseCase } from '../list-recharges.use-case';

import type { IRechargeRepository } from '../../../domain/repositories/recharge.repository.interface';
import { Recharge } from '../../../domain/entities/recharge.entity';
import { WalletType } from '../../../domain/enums/wallet-type.enum';
import { FiatCurrency } from '../../../domain/enums/fiat-currency.enum';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';

describe('ListRechargesUseCase', () => {
  let repo: jest.Mocked<IRechargeRepository>;
  let useCase: ListRechargesUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
    } as any;

    useCase = new ListRechargesUseCase(repo as any);
  });

  it('should return all recharges from repository', async () => {
    const mock = [
      new Recharge(
        'id-1',
        'user-1',
        WalletType.USDC,
        100,
        FiatCurrency.USD,
        100,
        TransactionType.BANK_TRANSFER,
        2,
        new Date('2026-01-01T00:00:00.000Z'),
      ),
    ];

    repo.findAll.mockResolvedValue(mock);

    const result = await useCase.execute();

    expect(repo.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mock);
    expect(result[0].id).toBe('id-1');
  });
});
