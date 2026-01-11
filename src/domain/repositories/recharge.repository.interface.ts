// src/domain/repositories/recharge.repository.interface.ts
import { Recharge } from '../entities/recharge.entity';

export const RECHARGE_REPOSITORY = 'RECHARGE_REPOSITORY';

export interface IRechargeRepository {
  create(recharge: Recharge): Promise<Recharge>;
  findAll(): Promise<Recharge[]>;
}
