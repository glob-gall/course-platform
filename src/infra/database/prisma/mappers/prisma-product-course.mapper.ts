import { Course } from '@/domain/course-platform/entities/course.entity';
import { Prisma } from '@prisma/client';
import { PrismaSectionDetailsMapper } from './prisma-section-details.mapper';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Slug } from '@/core/entities/value-objects/slug';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const courseWithRelations = Prisma.validator<Prisma.CourseDefaultArgs>()({
  include: {
    sections: {
      include: {
        sectionItems: {
          include: {
            lecture: true,
            quizz: true,
          },
        },
      },
    },
  },
});

type CourseWithRelations = Prisma.CourseGetPayload<typeof courseWithRelations>;

export class PrismaProductCourseMapper {
  static toDomain(raw: CourseWithRelations): Course {
    const course = Course.create(
      {
        title: raw.title,
        description: raw.description,
        slug: Slug.create(raw.slug),
        sections: raw.sections.map(PrismaSectionDetailsMapper.toDomain),

        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
    return course;
    // return {
    // sections: raw.sections.map((s) => ({
    //   id: s.id,
    //   title: s.title,
    //   items: s.sectionItems.map((item) => ({
    //     title: item.title,
    //     lectureTitle: item.lecture?.title,
    //     QuizzTitle: item.quizz?.title,
    //     externalUrl: item.externalUrl,
    //   })),
    // })),

    // totalSections,
    // totalLectures,
    // totalQuizz,
  }
}
