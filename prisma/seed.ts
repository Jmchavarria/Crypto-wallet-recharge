import 'dotenv/config';
import { PrismaService } from '../src/infrastructure/database/prisma.service';

async function main() {
  const prisma = new PrismaService();

  await prisma.user.upsert({
    where: { id: 'admin-1' },
    update: {},
    create: {
      id: 'admin-1',
      email: 'admin@demo.com',
      name: 'Admin Demo',
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { id: 'readonly-1' },
    update: {},
    create: {
      id: 'readonly-1',
      email: 'readonly@demo.com',
      name: 'ReadOnly Demo',
      role: 'read-only',
    },
  });

  console.log('✅ Seed done: admin-1, readonly-1');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
