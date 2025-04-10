import { Course } from '@/domain/course-platform/entities/course.entity';
import { SectionDetailsPresenter } from './section-details.presenter';

export class CourseDetailsPresenter {
  static toHTTP(course: Course) {
    return {
      id: course.id.toString(),
      title: course.title,
      description: course.description,
      sections: course.sections.map(SectionDetailsPresenter.toHTTP),
      slug: course.slug.value,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  }
}
