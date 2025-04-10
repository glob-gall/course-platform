import { SectionItem } from '@/domain/course-platform/entities/section-item.entity';
import { LecturePresenter } from './lecture.presenter';
import { QuizzPresenter } from './quizz.presenter';

export class SectionItemPresenter {
  static toHTTP(item: SectionItem) {
    return {
      id: item.id.toString(),
      lecture: item.lecture ? LecturePresenter.toHTTP(item.lecture) : null,
      quizz: item.quizz ? QuizzPresenter.toHTTP(item.quizz) : null,
      externalUrl: item.externalUrl ?? null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
