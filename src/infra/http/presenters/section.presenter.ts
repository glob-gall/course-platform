import { Section } from '@/domain/course-platform/entities/section.entity';

export class SectionPresenter {
  static toHTTP(section: Section) {
    return {
      id: section.id.toString(),
      title: section.title,
      description: section.description,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }
}
