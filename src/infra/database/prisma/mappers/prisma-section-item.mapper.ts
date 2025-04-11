import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { SectionItem } from '@/domain/course-platform/entities/section-item.entity';
import { Prisma, SectionItem as PrismaSectionItem } from '@prisma/client';
import { PrismaLectureMapper } from './prisma-lecture.mapper';
import { PrismaQuizzMapper } from './prisma-quizz.mapper';
import { AttributeNotNullable } from '../errors/attribute-not-nullable.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sectionItemWithRelations =
  Prisma.validator<Prisma.SectionItemDefaultArgs>()({
    include: {
      lecture: true,
      quizz: true,
    },
  });

type SectionItemWithRelations = Prisma.SectionItemGetPayload<
  typeof sectionItemWithRelations
>;

export class PrismaSectionItemMapper {
  static toPrisma(item: SectionItem): PrismaSectionItem {
    if (!item.section) throw new AttributeNotNullable('course');

    return {
      id: item.id.toString(),
      sectionId: item.section?.id.toString(),
      lectureId: item.lecture?.id.toString() ?? null,
      quizzId: item.quizz?.id.toString() ?? null,
      externalUrl: item.externalUrl ?? null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt ?? null,
    };
  }

  static toDomain(raw: SectionItemWithRelations): SectionItem {
    const section = SectionItem.create(
      {
        externalUrl: raw.externalUrl,
        lecture: raw.lecture ? PrismaLectureMapper.toDomain(raw.lecture) : null,
        quizz: raw.quizz ? PrismaQuizzMapper.toDomain(raw.quizz) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return section;
  }
}
