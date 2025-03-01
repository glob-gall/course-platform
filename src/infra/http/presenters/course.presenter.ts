import { Course } from '@/domain/course-platform/entities/course.entity';

export class CoursePresenter {
  static toHTTP(course: Course) {
    return {
      id: course.id.toString(),
      title: course.title,
      description: course.description,
      slug: course.slug.value,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  }
}
