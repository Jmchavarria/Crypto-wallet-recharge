import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RechargeOrmEntity } from './infrastructure/database/entities/recharge.orm-entity';
import { UserOrmEntity } from './infrastructure/database/entities/user.orm-entity';
import { RechargeRepositoryImpl } from './infrastructure/database/repositories/recharge.repository.impl';
import { UserRepositoryImpl } from './infrastructure/database/repositories/user.repository.impl';

import { ConversionServiceImpl } from './infrastructure/services/conversion.service.impl';
import { FeeServiceImpl } from './infrastructure/services/fee.service.impl';
import { CreateRechargeUseCase } from './application/use-cases/create-recharge.use-case';
import { ListRechargesUseCase } from './application/use-cases/list-recharges.use-case';
import { RechargeController } from './presentation/controllers/recharge.controller';
import {
  RECHARGE_REPOSITORY,
} from './domain/repositories/recharge.repository.interface';
import { CONVERSION_SERVICE } from './domain/repositories/recharge.repository.interface';
import { FEE_SERVICE } from './domain/repositories/recharge.repository.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'crypto_cartera',
      entities: [RechargeOrmEntity],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([RechargeOrmEntity]),
  ],
  controllers: [RechargeController],
  providers: [
    // Use Cases
    CreateRechargeUseCase,
    ListRechargesUseCase,
    
    // Services
    {
      provide: CONVERSION_SERVICE,
      useClass: ConversionServiceImpl,
    },
    {
      provide: FEE_SERVICE,
      useClass: FeeServiceImpl,
    },
    
    // Repositories
    {
      provide: RECHARGE_REPOSITORY,
      useClass: RechargeRepositoryImpl,
    },
  ],
})
export class AppModule {}