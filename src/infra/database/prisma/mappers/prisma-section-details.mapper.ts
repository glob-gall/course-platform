import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Section } from '@/domain/course-platform/entities/section.entity';
import { Prisma } from '@prisma/client';
import { PrismaSectionItemMapper } from './prisma-section-item.mapper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sectionWithRelations = Prisma.validator<Prisma.SectionDefaultArgs>()({
  include: {
    sectionItems: {
      include: {
        lecture: true,
        quizz: true,
      },
    },
  },
});

type SectionWithRelations = Prisma.SectionGetPayload<
  typeof sectionWithRelations
>;

export class PrismaSectionDetailsMapper {
  static toDomain(raw: SectionWithRelations): Section {
    const section = Section.create(
      {
        description: raw.description,
        title: raw.title,
        items: raw.sectionItems.map(PrismaSectionItemMapper.toDomain),
        courseId: new UniqueEntityID(raw.courseId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return section;
  }
}
