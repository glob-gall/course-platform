import { Section } from '@/domain/course-platform/entities/section.entity';
import { SectionItemPresenter } from './section-item.presenter';

export class SectionDetailsPresenter {
  static toHTTP(section: Section) {
    return {
      id: section.id.toString(),
      title: section.title,
      items: section.items.map(SectionItemPresenter.toHTTP),
      description: section.description,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }
}
