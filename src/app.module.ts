import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaService } from './infrastructure/prisma/prisma.service';

import { userHeaderMiddleware } from './infrastructure/auth/user-header.middleware';
import { RolesGuard } from './infrastructure/auth/roles.guard';

// Controllers
import { RechargeController } from './presentation/controllers/recharge.controller';

// Use cases
import { CreateRechargeUseCase } from './application/use-cases/create-recharge.use-case';
import { ListRechargesUseCase } from './application/use-cases/list-recharges.use-case';

// Tokens
import { RECHARGE_REPOSITORY } from './domain/repositories/recharge.repository.interface';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { CONVERSION_SERVICE } from './domain/services/conversion.service.interface';
import { FEE_SERVICE } from './domain/services/fee.service.interface';

// Implementations
import { RechargeRepositoryImpl } from './infrastructure/prisma/repositories/recharge.repository.impl';
import { UserRepositoryImpl } from './infrastructure/prisma/repositories/user.repository.impl';
import { ConversionServiceImpl } from './infrastructure/services/conversion.service.impl';
import { FeeServiceImpl } from './infrastructure/services/fee.service.impl';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RechargeController],
  providers: [
    CreateRechargeUseCase,
    ListRechargesUseCase,

    { provide: CONVERSION_SERVICE, useClass: ConversionServiceImpl },
    { provide: FEE_SERVICE, useClass: FeeServiceImpl },

    { provide: RECHARGE_REPOSITORY, useClass: RechargeRepositoryImpl },
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },

    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly prisma: PrismaService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userHeaderMiddleware(this.prisma)).forRoutes('*');
  }
}
