import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    if (!row) return null;

    return new User(
      row.id,
      row.email,
      row.name,
      row.role as any, // 'admin' | 'read-only'
      row.createdAt,
      row.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    if (!row) return null;

    return new User(
      row.id,
      row.email,
      row.name,
      row.role as any,
      row.createdAt,
      row.updatedAt,
    );
  }

  async create(user: User): Promise<User> {
    const row = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role, // string
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return new User(
      row.id,
      row.email,
      row.name,
      row.role as any,
      row.createdAt,
      row.updatedAt,
    );
  }

  async update(user: User): Promise<User> {
    const row = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
        // si tu schema usa @updatedAt, no necesitas esto:
        updatedAt: new Date(),
      },
    });

    return new User(
      row.id,
      row.email,
      row.name,
      row.role as any,
      row.createdAt,
      row.updatedAt,
    );
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
