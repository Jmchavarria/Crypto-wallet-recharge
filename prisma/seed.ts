import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const adminId = 'user-admin-001';
  const readOnlyId = 'user-readonly-001';

  await prisma.user.upsert({
    where: { id: adminId },
    update: {
      email: 'admin@demo.local',
      name: 'Admin Demo',
      role: 'admin',
    },
    create: {
      id: adminId,
      email: 'admin@demo.local',
      name: 'Admin Demo',
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { id: readOnlyId },
    update: {
      email: 'reader@demo.local',
      name: 'Reader Demo',
      role: 'read-only',
    },
    create: {
      id: readOnlyId,
      email: 'reader@demo.local',
      name: 'Reader Demo',
      role: 'read-only',
    },
  });

  const existingRecharge = await prisma.recharge.findFirst({
    where: { userId: adminId },
  });

  if (!existingRecharge) {
    await prisma.recharge.createMany({
      data: [
        {
          id: randomUUID(),
          userId: adminId,
          walletType: 'USDC',
          amountFiat: 120,
          fiatCurrency: 'USD',
          amountCrypto: 120,
          transactionType: 'BANK_TRANSFER',
          transactionCost: 2.5,
        },
        {
          id: randomUUID(),
          userId: adminId,
          walletType: 'COPW',
          amountFiat: 450000,
          fiatCurrency: 'COP',
          amountCrypto: 110,
          transactionType: 'ATM_NATIONAL',
          transactionCost: 3.75,
        },
      ],
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
