import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { SectionLecture } from '@/domain/course-platform/entities/section-lecture.entity';
import { SectionItem as PrismaSectionItem } from '@prisma/client';
import { AttributeNotNullable } from '../errors/attribute-not-nullable.error';

export class PrismaSectionLectureMapper {
  static toPrisma(sectionlecture: SectionLecture): PrismaSectionItem {
    return {
      id: sectionlecture.id.toString(),
      title: sectionlecture.title ?? null,
      description: sectionlecture.description ?? null,
      lectureId: sectionlecture.lectureId.toString(),
      sectionId: sectionlecture.sectionId.toString(),
      createdAt: sectionlecture.createdAt,
      updatedAt: sectionlecture.updatedAt ?? null,
      quizzId: null,
    };
  }

  static toDomain(raw: PrismaSectionItem): SectionLecture {
    if (!raw.lectureId) throw new AttributeNotNullable('lectureId');

    const sectionlecture = SectionLecture.create(
      {
        description: raw.description,
        title: raw.title,
        lectureId: new UniqueEntityID(raw.lectureId),
        sectionId: new UniqueEntityID(raw.sectionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return sectionlecture;
  }
}
