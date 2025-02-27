import { Slug } from '@/core/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Course } from '@/domain/course-platform/entities/course.entity';
import { Course as PrismaCourse } from '@prisma/client';

export class PrismaCourseMapper {
  static toPrisma(course: Course): PrismaCourse {
    return {
      id: course.id.toString(),
      description: course.description,
      title: course.title,
      slug: course.slug.value,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaCourse): Course {
    const course = Course.create(
      {
        description: raw.description,
        title: raw.title,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return course;
  }
}
