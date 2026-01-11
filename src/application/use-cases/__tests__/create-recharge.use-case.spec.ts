import { CreateRechargeUseCase } from '../create-recharge.use-case';

import type { IRechargeRepository } from '../../../domain/repositories/recharge.repository.interface';
import type { IConversionService } from '../../../domain/services/conversion.service.interface';
import type { IFeeService } from '../../../domain/services/fee.service.interface';

import { WalletType } from '../../../domain/enums/wallet-type.enum';
import { FiatCurrency } from '../../../domain/enums/fiat-currency.enum';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';

describe('CreateRechargeUseCase', () => {
  let repo: jest.Mocked<IRechargeRepository>;
  let conversion: jest.Mocked<IConversionService>;
  let fees: jest.Mocked<IFeeService>;
  let useCase: CreateRechargeUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
    } as any;

    conversion = {
      convert: jest.fn(),
    };

    fees = {
      feeFor: jest.fn(),
    };

    useCase = new CreateRechargeUseCase(repo, conversion as any, fees as any);
  });

  it('should create a recharge with converted crypto + fee and persist it', async () => {
    // Arrange
    const dto = {
      userId: 'user-1',
      walletType: WalletType.USDC,
      amountFiat: 100,
      fiatCurrency: FiatCurrency.USD,
      transactionType: TransactionType.BANK_TRANSFER,
    };

    conversion.convert.mockReturnValue(123.456);
    fees.feeFor.mockReturnValue(2);

    // repo.create retorna lo mismo que le llega (simulando persistencia)
    repo.create.mockImplementation(async (r: any) => r);

    // Act
    const result = await useCase.execute(dto as any);

    // Assert
    expect(conversion.convert).toHaveBeenCalledWith(
      dto.amountFiat,
      dto.fiatCurrency,
      dto.walletType,
    );

    expect(fees.feeFor).toHaveBeenCalledWith(dto.transactionType);

    expect(repo.create).toHaveBeenCalledTimes(1);

    // Verificar que se construyó la entidad con los valores esperados
    expect(result.userId).toBe(dto.userId);
    expect(result.walletType).toBe(dto.walletType);
    expect(result.amountFiat).toBe(dto.amountFiat);
    expect(result.fiatCurrency).toBe(dto.fiatCurrency);
    expect(result.amountCrypto).toBe(123.456);
    expect(result.transactionType).toBe(dto.transactionType);
    expect(result.transactionCost).toBe(2);

    // createdAt existe
    expect(result.createdAt).toBeInstanceOf(Date);

    // id existe (uuid)
    expect(typeof result.id).toBe('string');
    expect(result.id.length).toBeGreaterThan(10);
  });

  it('should still persist even if conversion returns 0 (edge case)', async () => {
    const dto = {
      userId: 'user-1',
      walletType: WalletType.USDC,
      amountFiat: 0.01,
      fiatCurrency: FiatCurrency.USD,
      transactionType: TransactionType.ATM_NATIONAL,
    };

    conversion.convert.mockReturnValue(0);
    fees.feeFor.mockReturnValue(2);

    repo.create.mockImplementation(async (r: any) => r);

    const result = await useCase.execute(dto as any);

    expect(result.amountCrypto).toBe(0);
    expect(result.transactionCost).toBe(2);
    expect(repo.create).toHaveBeenCalledTimes(1);
  });
});
