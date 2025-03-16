import { Quizz } from '@/domain/quizz-system/entities/quizz.entity';

export class QuizzPresenter {
  static toHTTP(quizz: Quizz) {
    return {
      id: quizz.id.toString(),
      title: quizz.title,
      description: quizz.description,
      createdAt: quizz.createdAt,
      updatedAt: quizz.updatedAt,
    };
  }
}
