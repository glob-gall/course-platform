import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Section } from '@/domain/course-platform/entities/section.entity';
import { Section as PrismaSection } from '@prisma/client';
import { AttributeNotNullable } from '../errors/attribute-not-nullable.error';

export class PrismaSectionMapper {
  static toPrisma(section: Section): PrismaSection {
    if (!section.course) throw new AttributeNotNullable('course');
    return {
      description: section.description,
      title: section.title,
      id: section.id.toString(),
      courseId: section.course.id.toString(),
      createdAt: section.createdAt,
      updatedAt: section.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaSection): Section {
    const section = Section.create(
      {
        description: raw.description,
        title: raw.title,
        items: [],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return section;
  }
}
