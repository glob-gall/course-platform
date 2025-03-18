import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { Quizz } from '@/domain/quizz-system/entities/quizz.entity';
import { QuizzesRepository } from '@/domain/quizz-system/application/repositories/quizzes.repository';
import { PrismaQuizzMapper } from '../../mappers/prisma-quizz.mapper';

@Injectable()
export class PrismaQuizzesRepository implements QuizzesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Quizz[]> {
    const quizzs = await this.prisma.quizz.findMany();
    return quizzs.map(PrismaQuizzMapper.toDomain);
  }

  async create(quizz: Quizz): Promise<void> {
    const data = PrismaQuizzMapper.toPrisma(quizz);
    await this.prisma.quizz.create({
      data,
    });
  }

  async save(quizz: Quizz): Promise<void> {
    const data = PrismaQuizzMapper.toPrisma(quizz);
    await this.prisma.quizz.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async delete(quizz: Quizz): Promise<void> {
    await this.prisma.quizz.delete({
      where: {
        id: quizz.id.toString(),
      },
    });
  }

  async findById(id: string): Promise<Quizz | null> {
    const quizz = await this.prisma.quizz.findUnique({
      where: {
        id: id,
      },
    });
    if (!quizz) return null;

    return PrismaQuizzMapper.toDomain(quizz);
  }
}
