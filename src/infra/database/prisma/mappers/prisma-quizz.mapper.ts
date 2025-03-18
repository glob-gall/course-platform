import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Quizz } from '@/domain/quizz-system/entities/quizz.entity';
import { Quizz as PrismaQuizz } from '@prisma/client';

export class PrismaQuizzMapper {
  static toPrisma(quizz: Quizz): PrismaQuizz {
    return {
      id: quizz.id.toString(),
      description: quizz.description,
      title: quizz.title,
      createdAt: quizz.createdAt,
      updatedAt: quizz.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaQuizz): Quizz {
    const quizz = Quizz.create(
      {
        description: raw.description ?? '',
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return quizz;
  }
}
