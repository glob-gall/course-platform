import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { SectionQuizz } from '@/domain/course-platform/entities/section-quizz.entity';
import { SectionItem as PrismaSectionItem } from '@prisma/client';
import { AttributeNotNullable } from '../errors/attribute-not-nullable.error';

export class PrismaSectionQuizzMapper {
  static toPrisma(sectionquizz: SectionQuizz): PrismaSectionItem {
    return {
      id: sectionquizz.id.toString(),
      title: sectionquizz.title ?? null,
      description: sectionquizz.description ?? null,
      quizzId: sectionquizz.quizzId.toString(),
      sectionId: sectionquizz.sectionId.toString(),
      createdAt: sectionquizz.createdAt,
      updatedAt: sectionquizz.updatedAt ?? null,
      lectureId: null,
    };
  }

  static toDomain(raw: PrismaSectionItem): SectionQuizz {
    if (!raw.quizzId) throw new AttributeNotNullable('quizzId');

    const sectionquizz = SectionQuizz.create(
      {
        description: raw.description,
        title: raw.title,
        quizzId: new UniqueEntityID(raw.quizzId),
        sectionId: new UniqueEntityID(raw.sectionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return sectionquizz;
  }
}
