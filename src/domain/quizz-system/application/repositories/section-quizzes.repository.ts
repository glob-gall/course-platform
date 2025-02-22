import { SectionQuizz } from '../../entities/section-quizz.entity';

export abstract class SectionQuizzesRepository {
  abstract create(sectionQuizz: SectionQuizz): Promise<void>;
  abstract save(sectionQuizz: SectionQuizz): Promise<void>;
  abstract delete(sectionQuizz: SectionQuizz): Promise<void>;
  abstract findById(id: string): Promise<SectionQuizz | null>;
}
