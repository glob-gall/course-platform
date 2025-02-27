import { UsersRepository } from '@/domain/course-platform/application/repositories/users.repository';
import { User } from '@/domain/course-platform/entities/user.entity';
import { PrismaService } from '../../prisma.service';
import { PrismaUserMapper } from '../../mappers/prisma-user.mapper';

export class PrismaUserRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data,
    });
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data,
    });
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id.toString() },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }
}
