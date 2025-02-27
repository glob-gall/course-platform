import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Section } from '@/domain/course-platform/entities/section.entity';
import { Section as PrismaSection } from '@prisma/client';

export class PrismaSectionMapper {
  static toPrisma(section: Section): PrismaSection {
    return {
      description: section.description,
      title: section.title,
      id: section.id.toString(),
      courseId: section.courseId.toString(),
      createdAt: section.createdAt,
      updatedAt: section.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaSection): Section {
    const section = Section.create(
      {
        description: raw.description,
        title: raw.title,
        courseId: new UniqueEntityID(raw.courseId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return section;
  }
}
