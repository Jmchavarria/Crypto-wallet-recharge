import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRechargeRepository } from '../../../domain/repositories/recharge.repository.interface';
import { Recharge } from '../../../domain/entities/recharge.entity';
import { RechargeOrmEntity } from '../entities/recharge.orm-entity';

@Injectable()
export class RechargeRepositoryImpl implements IRechargeRepository {
  constructor(
    @InjectRepository(RechargeOrmEntity)
    private readonly repository: Repository<RechargeOrmEntity>,
  ) {}

  async create(recharge: Recharge): Promise<Recharge> {
    const ormEntity = RechargeOrmEntity.fromDomain(recharge);
    const saved = await this.repository.save(ormEntity);
    return saved.toDomain();
  }

  async findAll(): Promise<Recharge[]> {
    const entities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map((e) => e.toDomain());
  }

  async findById(id: string): Promise<Recharge | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByUserId(userId: string): Promise<Recharge[]> {
    const entities = await this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return entities.map((e) => e.toDomain());
  }
}