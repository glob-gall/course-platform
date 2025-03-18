import { SectionQuizz } from '@/domain/course-platform/entities/section-quizz.entity';

export class SectionQuizzPresenter {
  static toHTTP(sectionQuizz: SectionQuizz) {
    return {
      id: sectionQuizz.id.toString(),
      title: sectionQuizz.title,
      description: sectionQuizz.description,
      createdAt: sectionQuizz.createdAt,
      updatedAt: sectionQuizz.updatedAt,
      quizztitle: sectionQuizz.quizzId,

      quizzId: sectionQuizz.quizz?.id,
      quizzDescription: sectionQuizz.quizz?.description,
      quizzTitle: sectionQuizz.quizz?.title,
    };
  }
}
